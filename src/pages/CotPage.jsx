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
          userMsg: "Find me three internal candidates for the Director of Finance opening.",
          aiLead: "Looking through the org now…",
        }}
      >
        <CoTStreaming />
      </PatternShowcase>

      <PatternShowcase
        title="CoTCompact"
        description="A collapsed 'Thought for Ns' pill that expands on click — use when the answer matters more than the work, but you still want to disclose it."
        previewContext={{
          userMsg: "Who's eligible for the Q4 retention bonus?",
          aiLead: "",
          aiTrail: "12 employees qualify based on tenure, performance rating, and Q3 attendance.",
        }}
      >
        <CoTCompact />
      </PatternShowcase>

      <PatternShowcase
        title="CoTStepList"
        description="A numbered step list shown post-hoc inside a collapsible card — use when the steps themselves are the value (audits, debugging, plans)."
        previewContext={{
          userMsg: "Walk me through how you calculated the 18% turnover number.",
          aiLead: "Here's the exact path I took:",
        }}
      >
        <CoTStepList />
      </PatternShowcase>
    </>
  );
}
