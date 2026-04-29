import {
  MultipleChoice,
  MultipleChoiceChips,
  SingleChoice,
  SingleChoiceSegmented,
  TodoList,
  TodoListInAskWindow,
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
          userMsg: "Filter the candidate pool to the ones I care about.",
          aiLead: "Tap any that apply — I'll narrow the pool as you pick:",
        }}
      >
        <MultipleChoiceChips />
      </PatternShowcase>

      <PatternShowcase
        title="SingleChoice"
        description="Radio list with optional hint text per row, for picking exactly one option from a small set."
        previewContext={{
          userMsg: "How should I handle Priya's PTO request that overlaps the release week?",
          aiLead: "A few clean options — pick one and I'll take it from there:",
        }}
      >
        <SingleChoice />
      </PatternShowcase>

      <PatternShowcase
        title="SingleChoiceSegmented"
        description="Segmented control for picking one of a few mutually exclusive options inline (Weekly / Monthly / Quarterly)."
        previewContext={{
          userMsg: "Show me turnover for Sales.",
          aiLead: "Sure — at what cadence?",
          aiTrail: "Tap one and I'll pull the chart.",
        }}
      >
        <SingleChoiceSegmented />
      </PatternShowcase>

      <PatternShowcase
        title="TodoList"
        description="Live-updating checklist that ticks items off as work happens, so the user can watch progress at a glance."
        previewContext={{
          userMsg: "Onboard our new hire Jordan starting Monday.",
          aiLead: "On it — here's the plan I'm working through:",
          aiTrail: "I'll tick items off as each one finishes.",
        }}
      >
        <TodoList />
      </PatternShowcase>

      <PatternShowcase title="TodoListInAskWindow" description="Full chat surface with a pinned todo header — use when the work itself is multi-step and the todo is the artifact." bare>
        <TodoListInAskWindow />
      </PatternShowcase>

      <PatternShowcase
        title="DoneConfirm"
        description="Success card that closes the loop with a checkmark, headline, and a small summary of what was done."
        previewContext={{
          userMsg: "Send the offer letter to Priya.",
          aiLead: "Done — sealed and sent:",
        }}
      >
        <DoneConfirm />
      </PatternShowcase>

      <PatternShowcase
        title="DoneConfirmMinimal"
        description="A single-line success acknowledgement for trivial actions where a full card would be overkill."
        previewContext={{
          userMsg: "Mark Sam's review as complete.",
          aiLead: "",
        }}
      >
        <DoneConfirmMinimal />
      </PatternShowcase>

      <PatternShowcase
        title="DoneConfirmDetail"
        description="Expanded success card with a metadata grid — use when the user needs to verify details (dates, counts, recipients) before moving on."
        previewContext={{
          userMsg: "Schedule the onboarding kickoff for Jordan.",
          aiLead: "Booked. Double-check the details before I notify everyone:",
        }}
      >
        <DoneConfirmDetail />
      </PatternShowcase>
    </>
  );
}
