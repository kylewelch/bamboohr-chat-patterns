#!/usr/bin/env node
// Generate SKILL.md + a zipped Claude Code skill bundle from page metadata.
// Output: public/SKILL.md and public/bamboohr-chat-patterns.zip

import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT, 'src', 'pages');
const PATTERNS_DIR = path.join(ROOT, 'src', 'patterns');
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BUNDLE_NAME = 'bamboohr-chat-patterns';

// ---- Page → category mapping ----
const PAGE_CATEGORIES = {
  ChoicesPage: { title: 'Choices & Todos', source: 'patterns/choices.jsx' },
  ArtifactsPage: { title: 'Artifacts', source: 'patterns/artifacts.jsx' },
  CotPage: { title: 'Chain of Thought', source: 'patterns/cot.jsx' },
  FilterDropdownPage: { title: 'Filter & Scope', source: 'patterns/filter-dropdown.jsx' },
  InlineChatPage: { title: 'Inline Chat', source: 'patterns/inline-chat.jsx' },
  MiscPage: { title: 'Sources, Loading & Context', source: 'patterns/misc.jsx' },
  ShiftsPage: { title: 'Shifts', source: 'patterns/shifts.jsx' },
  SystemObjectsPage: { title: 'System Objects', source: 'patterns/system-objects.jsx' },
  VizPage: { title: 'Data Viz', source: 'patterns/viz.jsx' },
};

// ---- Helpers ----
function unescapeJsString(s) {
  // The JSX strings we extract are literals like "Send the offer letter to Priya."
  // We just need to handle escaped quotes and basic escapes.
  return s
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

function extractStringValue(source, startIdx) {
  // Returns { value, endIdx } for a string literal starting at startIdx.
  // Handles ", ', and ` (template strings without expressions).
  const quote = source[startIdx];
  if (quote !== '"' && quote !== "'" && quote !== '`') return null;
  let i = startIdx + 1;
  while (i < source.length) {
    const ch = source[i];
    if (ch === '\\') { i += 2; continue; }
    if (ch === quote) {
      return { value: source.slice(startIdx + 1, i), endIdx: i + 1 };
    }
    i++;
  }
  return null;
}

function findPropString(propsBlob, propName) {
  // Find `propName="..."` or `propName={"..."}` or `propName={\`...\`}` in a props blob.
  const re = new RegExp(`${propName}\\s*=\\s*`);
  const m = propsBlob.match(re);
  if (!m) return null;
  let i = m.index + m[0].length;
  // Skip optional `{`
  if (propsBlob[i] === '{') i++;
  // Skip whitespace
  while (i < propsBlob.length && /\s/.test(propsBlob[i])) i++;
  const lit = extractStringValue(propsBlob, i);
  if (!lit) return null;
  return unescapeJsString(lit.value).trim();
}

function findUserMsg(propsBlob) {
  // previewContext={{ userMsg: "...", aiLead: "..." }}
  const ctxIdx = propsBlob.search(/previewContext\s*=\s*\{\{/);
  if (ctxIdx === -1) return null;
  // Slice the inner object literal
  const start = propsBlob.indexOf('{{', ctxIdx) + 2;
  let depth = 1;
  let i = start;
  while (i < propsBlob.length && depth > 0) {
    if (propsBlob[i] === '{') depth++;
    else if (propsBlob[i] === '}') depth--;
    if (depth === 0) break;
    i++;
  }
  if (depth !== 0) return null;
  const inner = propsBlob.slice(start, i);
  // Find userMsg: "..."
  const um = inner.match(/userMsg\s*:\s*/);
  if (!um) return null;
  const litStart = um.index + um[0].length;
  const lit = extractStringValue(inner, litStart);
  if (!lit) return null;
  const v = unescapeJsString(lit.value).trim();
  return v.length > 0 ? v : null;
}

function findOpenTag(source, startIdx, tagName) {
  // Returns { tagStart, propsBlob, tagEnd } for the next <tagName ...> after startIdx.
  // Skips self-closing detection — caller checks the props blob ending.
  const open = source.indexOf(`<${tagName}`, startIdx);
  if (open === -1) return null;
  // Walk forward to the closing `>`, tracking nested braces (JSX attribute expressions).
  let i = open + 1 + tagName.length;
  let depth = 0;
  while (i < source.length) {
    const ch = source[i];
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
    else if (ch === '"' || ch === "'" || ch === '`') {
      const lit = extractStringValue(source, i);
      if (!lit) break;
      i = lit.endIdx;
      continue;
    } else if (ch === '>' && depth === 0) {
      return { tagStart: open, propsBlob: source.slice(open + 1 + tagName.length, i), tagEnd: i };
    }
    i++;
  }
  return null;
}

function extractPatternsFromPage(source) {
  const patterns = [];
  let cursor = 0;
  while (true) {
    const tag = findOpenTag(source, cursor, 'PatternShowcase');
    if (!tag) break;
    cursor = tag.tagEnd + 1;

    const title = findPropString(tag.propsBlob, 'title');
    const description = findPropString(tag.propsBlob, 'description');
    const userMsg = findUserMsg(tag.propsBlob);

    if (title) {
      patterns.push({ title, description: description || '', userMsg });
    }
  }
  return patterns;
}

async function readPageFiles() {
  const out = [];
  for (const [pageBaseName, meta] of Object.entries(PAGE_CATEGORIES)) {
    const fp = path.join(PAGES_DIR, `${pageBaseName}.jsx`);
    if (!existsSync(fp)) continue;
    const src = await readFile(fp, 'utf8');
    const patterns = extractPatternsFromPage(src);
    if (patterns.length === 0) continue;
    out.push({ ...meta, page: pageBaseName, patterns });
  }
  return out;
}

// ---- SKILL.md emitter ----
function emitSkillMd(categories) {
  const totalPatterns = categories.reduce((n, c) => n + c.patterns.length, 0);

  const front = [
    '---',
    'name: bamboohr-chat-patterns',
    'description: BambooHR-style AI chat UI patterns for React prototypes — choices, todos, artifacts, chain-of-thought, charts, system objects, shifts, inline chat, sources, loading states, file uploads, and context pills. Use when building Claude/ChatGPT-style chat interfaces, AI assistants for HR products, or any prototype that mixes a chat thread with structured AI artifacts.',
    '---',
    '',
  ].join('\n');

  const intro = [
    '# BambooHR AI Chat Patterns',
    '',
    `This skill catalogs ${totalPatterns} chat-UI patterns used across BambooHR's AI surfaces, organized by category. Each entry below includes a short description, a representative "use when" prompt, and a pointer to the JSX source bundled in this skill.`,
    '',
    'When the user asks for a chat surface, AI assistant, todo/checklist, choice picker, artifact card, KPI tile, etc., look up the closest pattern below and reuse the bundled component as a starting point. Source files in `patterns/` and `components/` are the canonical implementations — copy them into the user\'s prototype and adapt names/copy as needed.',
    '',
    '## Conventions',
    '',
    '- All patterns are React 19 + plain JSX (no TypeScript). They use BambooHR Fabric Encore design tokens via CSS custom properties (`var(--gray-9)`, `var(--primary-500)`, etc.). When dropping into a non-BambooHR codebase, either bring those tokens in or replace them with concrete colors.',
    '- The `AskWindowShell` component (in `components/`) hosts any pattern inside a full Ask BambooHR chat window — header, scrolling thread, and composer. Use it when the user wants the pattern shown "inside a chat", not just as a standalone artifact.',
    '- `MsgUser` / `MsgAI` (in `patterns/primitives.jsx`) wrap user and AI message bubbles in the standard layout. Reach for them whenever you need a chat thread structure.',
    '',
    '## Index',
    '',
  ].join('\n');

  const sections = categories.map(cat => {
    const lines = [`## ${cat.title}`, ''];
    for (const p of cat.patterns) {
      lines.push(`### ${p.title}`);
      if (p.description) lines.push(p.description);
      const useWhen = p.userMsg || p.description;
      if (useWhen) lines.push('', `**Use when:** "${useWhen}"`);
      lines.push('', `**Source:** \`${cat.source}\` → \`${p.title}\``, '');
    }
    return lines.join('\n');
  }).join('\n');

  const footer = [
    '## Working with this skill',
    '',
    '1. When the user describes a chat or AI-assistant UI need, scan the index above and pick the pattern whose **Use when** line is the closest match.',
    '2. Open the corresponding source file (e.g. `patterns/choices.jsx`) and read the named export. Copy the component into the user\'s codebase as a starting point.',
    '3. If the user wants the pattern shown in a chat surface, wrap it with `AskWindowShell` from `components/AskWindowShell.jsx` and pass `slot={<YourPattern />}` plus a `userMsg` and `aiLead` that fit the user\'s scenario.',
    '4. Adapt copy, data, and styling to the user\'s product — the patterns are starting points, not finished features.',
    '',
  ].join('\n');

  return front + intro + sections + '\n' + footer;
}

// ---- README for the bundle ----
function emitReadme() {
  return [
    '# BambooHR AI Chat Patterns — Claude Code Skill',
    '',
    'A bundled set of ~50 BambooHR-style AI chat UI patterns for React prototypes, plus a `SKILL.md` index Claude reads to decide which pattern fits the user\'s ask.',
    '',
    '## Install',
    '',
    '1. Unzip this archive.',
    '2. Move the `bamboohr-chat-patterns/` folder into `~/.claude/skills/`. The final path should be `~/.claude/skills/bamboohr-chat-patterns/SKILL.md`.',
    '3. Open Claude Code in your prototype project. The next time you describe a chat or AI-assistant UI need, Claude will load this skill automatically.',
    '',
    '## Use',
    '',
    'Ask Claude things like:',
    '',
    '- "Build me a multiple-choice picker like BambooHR\'s pattern."',
    '- "Show progress as the AI works through a multi-step task."',
    '- "I need a chat artifact card for a generated CSV."',
    '',
    'Claude will pick the right pattern from the index in `SKILL.md`, copy the JSX from `patterns/` or `components/`, and adapt it to your prototype.',
    '',
    '## What\'s included',
    '',
    '- `SKILL.md` — the index Claude reads to decide which pattern fits.',
    '- `patterns/` — JSX source for every pattern (choices, artifacts, CoT, viz, etc.).',
    '- `components/AskWindowShell.jsx` — the reusable Ask BambooHR chat window shell.',
    '',
    '## Notes',
    '',
    'Patterns reference Fabric Encore design tokens via CSS custom properties (`var(--gray-9)`, `var(--primary-500)`, etc.). In a non-BambooHR codebase, either bring those tokens in or substitute concrete colors.',
    '',
  ].join('\n');
}

// ---- Main ----
async function main() {
  const categories = await readPageFiles();
  const skillMd = emitSkillMd(categories);
  const readme = emitReadme();

  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(path.join(PUBLIC_DIR, 'SKILL.md'), skillMd, 'utf8');

  // Also write into src/generated so Vite can statically import the markdown
  // via `?raw` (no fetch race conditions, no SPA-rewrite confusion).
  const GENERATED_DIR = path.join(ROOT, 'src', 'generated');
  await mkdir(GENERATED_DIR, { recursive: true });
  await writeFile(path.join(GENERATED_DIR, 'SKILL.generated.md'), skillMd, 'utf8');

  // Stage bundle in a temp directory and zip it.
  const tmpRoot = await mkdir(path.join(os.tmpdir(), `skill-build-${Date.now()}`), { recursive: true });
  const stage = path.join(tmpRoot, BUNDLE_NAME);
  await mkdir(path.join(stage, 'components'), { recursive: true });
  await mkdir(path.join(stage, 'patterns'), { recursive: true });

  await writeFile(path.join(stage, 'SKILL.md'), skillMd, 'utf8');
  await writeFile(path.join(stage, 'README.md'), readme, 'utf8');

  await cp(
    path.join(COMPONENTS_DIR, 'AskWindowShell.jsx'),
    path.join(stage, 'components', 'AskWindowShell.jsx'),
  );

  for (const file of await readdir(PATTERNS_DIR)) {
    if (!file.endsWith('.jsx')) continue;
    await cp(path.join(PATTERNS_DIR, file), path.join(stage, 'patterns', file));
  }

  const zipPath = path.join(PUBLIC_DIR, `${BUNDLE_NAME}.zip`);
  // Remove any stale zip so `zip` doesn't append to it.
  if (existsSync(zipPath)) await rm(zipPath);

  // `zip -r <dest> <folder>` from the temp root produces an archive whose
  // top-level entry is `bamboohr-chat-patterns/`.
  execFileSync('zip', ['-rq', zipPath, BUNDLE_NAME], { cwd: tmpRoot });

  // Best-effort cleanup.
  await rm(tmpRoot, { recursive: true, force: true });

  const totalPatterns = categories.reduce((n, c) => n + c.patterns.length, 0);
  console.log(`✓ Wrote public/SKILL.md (${skillMd.length.toLocaleString()} chars, ${totalPatterns} patterns across ${categories.length} categories)`);
  console.log(`✓ Wrote public/${BUNDLE_NAME}.zip`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
