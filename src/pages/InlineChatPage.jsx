import {
  InlineComposerPin,
  InlineSelectionMenu,
  InlineElementHover,
  InlineFormFieldAI,
} from '../patterns/inline-chat.jsx';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function InlineChatPage() {
  return (
    <>
      <PageHeader
        icon={faAt}
        title="Inline Chat"
        lede="Patterns for anchoring a question, edit, or comment to a specific element of the AI's output — a cell, a sentence, a chart bar, or a form field — without losing context."
      />

      <PatternShowcase
        title="InlineComposerPin"
        description="A Figma-style pin on a highlighted span opens a small composer with a context chip and suggestions — quietest way to ask about a specific phrase."
        bare
        previewContext={{
          userMsg: "Why is the variable-pay assumption so high in this comp model?",
          aiLead: "Pin a question right on the spreadsheet and I'll answer in context:",
        }}
      >
        <InlineComposerPin />
      </PatternShowcase>

      <PatternShowcase
        title="InlineSelectionMenu"
        description="Selecting any text floats a dark action bar with Ask AI / Explain / Copy — for ad-hoc selections that don't have a permanent anchor."
        bare
        previewContext={{
          userMsg: "I'm reading the new parental leave policy and something doesn't add up.",
          aiLead: "Highlight the part you want me to explain:",
        }}
      >
        <InlineSelectionMenu />
      </PatternShowcase>

      <PatternShowcase
        title="InlineElementHover"
        description="Hovering a row or card surfaces an action row (Ask, Explain, Drill in) — use on structured outputs (rows, cells, list items)."
        bare
        previewContext={{
          userMsg: "Why did Sales turnover spike in October?",
          aiLead: "Hover any row to ask, explain, or drill in:",
        }}
      >
        <InlineElementHover />
      </PatternShowcase>

      <PatternShowcase
        title="InlineFormFieldAI"
        description="Form fields gain dual 'Fill' and 'Ask' affordances so the AI can populate values or explain the field without leaving the form."
        bare
        previewContext={{
          userMsg: "Help me finish this new-hire form.",
          aiLead: "Tap Fill on any field and I'll populate it from what's already on file:",
        }}
      >
        <InlineFormFieldAI />
      </PatternShowcase>
    </>
  );
}
