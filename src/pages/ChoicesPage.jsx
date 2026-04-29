import {
  MultipleChoice,
  MultipleChoiceChips,
  SingleChoice,
  SingleChoiceSegmented,
  TodoList,
  DoneConfirm,
  DoneConfirmMinimal,
  DoneConfirmDetail,
} from '../patterns/choices.jsx';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function ChoicesPage() {
  return (
    <>
      <PageHeader
        icon={faSquareCheck}
        title="Choices & Todos"
        lede={`Single and multi-select patterns, segmented controls, todo lists, and the various flavors of "done" confirmation.`}
      />

      <PatternShowcase
        title="MultipleChoice"
        description="Checkbox-style cards with hint text for picking several options where each choice deserves a short explanation."
        previewContext={{
          userMsg: "I want to open a Senior Backend Engineer req.",
          aiLead: "Got it. Pick any of these to bake into the posting — each one nudges the draft in a real way:",
        }}
      >
        <MultipleChoice />
      </PatternShowcase>

      <PatternShowcase
        title="MultipleChoiceChips"
        description="Pill-button toggles for picking several short, tag-like options at once."
        previewContext={{
          userMsg: "Build me a People report for the leadership readout.",
          aiLead: "Happy to. Which topics should it cover?",
        }}
      >
        <MultipleChoiceChips />
      </PatternShowcase>

      <PatternShowcase
        title="SingleChoice"
        description="Radio list with optional hint text per row, for picking exactly one option from a small set."
        previewContext={{
          userMsg: "Run me an attrition report.",
          aiLead: "Pulling that now — what time frame?",
        }}
      >
        <SingleChoice />
      </PatternShowcase>

      <PatternShowcase
        title="SingleChoiceSegmented"
        description="Segmented control for picking one of a few mutually exclusive options inline (Weekly / Monthly / Quarterly)."
        previewContext={{
          userMsg: "Set up a recurring headcount report for the leadership team.",
          aiLead: "Sure — how often should I send this?",
        }}
      >
        <SingleChoiceSegmented />
      </PatternShowcase>

      <PatternShowcase
        title="TodoList"
        description="Live-updating checklist that ticks items off as work happens, so the user can watch progress at a glance."
        previewContext={{
          userMsg: "Post the Senior Backend Engineer req and kick off sourcing.",
          aiLead: "On it — here's the plan I'm working through:",
          aiTrail: "I'll tick items off as each one finishes.",
        }}
      >
        <TodoList />
      </PatternShowcase>

      <PatternShowcase
        title="DoneConfirm"
        description="Success card that closes the loop with a checkmark, headline, and a small summary of what was done."
        previewContext={{
          userMsg: "Submit a time-off request for next Friday.",
          aiLead: "Done — Dana will get an email shortly:",
        }}
      >
        <DoneConfirm />
      </PatternShowcase>

      <PatternShowcase
        title="DoneConfirmMinimal"
        description="A single-line success acknowledgement for trivial actions where a full card would be overkill."
        previewContext={{
          userMsg: "Pull Jamie out of this month's bonus run and cut him a paper check instead.",
          aiLead: "",
        }}
      >
        <DoneConfirmMinimal />
      </PatternShowcase>

      <PatternShowcase
        title="DoneConfirmDetail"
        description="Expanded success card with a metadata grid — use when the user needs to verify details (dates, counts, recipients) before moving on."
        previewContext={{
          userMsg: "Send the offer to Priya for the Senior Backend role.",
          aiLead: "Sent. Double-check the details before I notify the team:",
        }}
      >
        <DoneConfirmDetail />
      </PatternShowcase>
    </>
  );
}
