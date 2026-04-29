import { CoTCompact, CoTStreaming, CoTStepList } from '../patterns/cot.jsx';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function CotPage() {
  return (
    <>
      <PageHeader
        icon={faBrain}
        title="Chain of Thought"
        lede="Patterns for surfacing the model's reasoning before (or alongside) the answer. Each variant trades off transparency, screen real estate, and perceived latency differently."
      />

      <PatternShowcase
        title="CoTStreaming"
        description="Reveals reasoning steps live as the model produces them — use to make latency feel like progress on tasks that take more than a beat or two."
        previewContext={{
          userMsg: "How much PTO does Maria have left this year?",
          aiLead: "Looking that up now…",
        }}
      >
        <CoTStreaming />
      </PatternShowcase>

      <PatternShowcase
        title="CoTCompact"
        description="A collapsed 'Thought for Ns' pill that expands on click — use when the answer matters more than the work, but you still want to disclose it."
        previewContext={{
          userMsg: "What's my PTO balance?",
          aiLead: "",
          aiTrail: "You have 12.5 days remaining for 2026. Next accrual posts Dec 1.",
        }}
      >
        <CoTCompact />
      </PatternShowcase>

      <PatternShowcase
        title="CoTStepList"
        description="A numbered step list shown post-hoc inside a collapsible card — use when the steps themselves are the value (audits, debugging, plans)."
        previewContext={{
          userMsg: "How did you find the 3 managers still pending Q3 reviews?",
          aiLead: "Here's the exact path I took:",
        }}
      >
        <CoTStepList />
      </PatternShowcase>
    </>
  );
}
