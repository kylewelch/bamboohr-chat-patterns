import { useState } from 'react';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../components/PageHeader.jsx';
import skillText from '../generated/SKILL.generated.md?raw';

const ZIP_URL = '/bamboohr-chat-patterns.zip';

export default function SkillPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!skillText) return;
    try {
      await navigator.clipboard.writeText(skillText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore — older browsers without clipboard API
    }
  };

  return (
    <>
      <PageHeader
        icon={faPuzzlePiece}
        title="Claude Code Skill"
        lede="Drop these patterns into Claude Code so it can scaffold prototypes that look like the gallery — pattern names, when-to-use guidance, and the canonical JSX source, packaged as a Claude Code skill."
      />

      <section className="skill-intro">
        <p>
          A <strong>Claude Code skill</strong> is a folder Claude reads when its description matches the task you're asking for. Download this one, drop it into <code>~/.claude/skills/</code>, and Claude will know every pattern in this catalog by name — including which one is the right pick for the prototype you're building.
        </p>
      </section>

      <section className="skill-actions">
        <a
          className="skill-btn skill-btn-primary"
          href={ZIP_URL}
          download="bamboohr-chat-patterns.zip"
        >
          Download skill bundle (.zip)
        </a>
        <button
          type="button"
          className="skill-btn skill-btn-secondary"
          onClick={handleCopy}
          disabled={!skillText}
        >
          {copied ? 'Copied!' : 'Copy SKILL.md'}
        </button>
      </section>

      <section className="skill-install">
        <h2 className="skill-section-title">Install</h2>
        <ol className="skill-steps">
          <li>Download the bundle and unzip it.</li>
          <li>
            Move the <code>bamboohr-chat-patterns/</code> folder into <code>~/.claude/skills/</code>. The final path should be <code>~/.claude/skills/bamboohr-chat-patterns/SKILL.md</code>.
          </li>
          <li>
            Open Claude Code in your prototype project and ask for any pattern by name — for example, <em>"Build me a multiple-choice picker like BambooHR's pattern."</em>
          </li>
        </ol>
      </section>

      <section className="skill-preview">
        <div className="skill-preview-header">
          <code className="skill-preview-name">SKILL.md</code>
        </div>
        <pre className="skill-preview-body">
          <code>{skillText}</code>
        </pre>
      </section>
    </>
  );
}
