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
          userMsg: "How did Q3 turnover land in Engineering?",
          aiLead: "Pin a question on any phrase in the answer and I'll respond in context:",
        }}
      >
        <InlineComposerPin />
      </PatternShowcase>

      <PatternShowcase
        title="InlineSelectionMenu"
        description="Selecting any text floats a dark action bar with Ask AI / Explain / Copy — for ad-hoc selections that don't have a permanent anchor."
        bare
        previewContext={{
          userMsg: "Give me the Q3 hiring summary.",
          aiLead: "Highlight any phrase below to ask about it:",
        }}
      >
        <InlineSelectionMenu />
      </PatternShowcase>

      <PatternShowcase
        title="InlineElementHover"
        description="Hovering a row or card surfaces an action row (Ask, Explain, Drill in) — use on structured outputs (rows, cells, list items)."
        bare
        previewContext={{
          userMsg: "Show me headcount by department.",
          aiLead: "Hover any row to ask about it, explain it, or drill in:",
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
