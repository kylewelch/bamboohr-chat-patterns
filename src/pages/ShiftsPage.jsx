import {
  ShiftEdit,
  ShiftFillOpen,
  ShiftWeekDraft,
  ShiftPublish,
} from '../patterns/shifts.jsx';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function ShiftsPage() {
  return (
    <>
      <PageHeader
        icon={faCalendarDays}
        title="Shifts"
        lede="End-to-end examples of using AI chat to edit, fill, draft, and publish shift schedules."
      />

      <PatternShowcase
        title="ShiftEdit"
        description="The AI restates a single shift edit (who, when, role) so the manager can confirm or adjust before it's applied."
        previewContext={{
          userMsg: "Move Maria's Tuesday shift to 10–6.",
          aiLead: "",
        }}
      >
        <ShiftEdit />
      </PatternShowcase>

      <PatternShowcase
        title="ShiftFillOpen"
        description="The AI proposes ranked candidates for one or more open shifts and lets the manager multi-select to assign in one move."
        previewContext={{
          userMsg: "I have 3 open shifts next week — find me people to cover them.",
          aiLead: "",
        }}
      >
        <ShiftFillOpen />
      </PatternShowcase>

      <PatternShowcase
        title="ShiftWeekDraft"
        description="The AI drafts a full week of shifts as a reviewable grid — for bulk schedule generation, before any publish step."
        bare
        previewContext={{
          userMsg: "Draft next week's schedule using last week as the baseline.",
          aiLead: "Here's a first pass. Tweak any cell before we publish:",
          slotScrollX: true,
        }}
      >
        <ShiftWeekDraft />
      </PatternShowcase>

      <PatternShowcase
        title="ShiftPublish"
        description="Final confirmation step that shows a change summary and notify options before the schedule actually goes live."
        previewContext={{
          userMsg: "Publish next week's schedule.",
          aiLead: "",
        }}
      >
        <ShiftPublish />
      </PatternShowcase>
    </>
  );
}
