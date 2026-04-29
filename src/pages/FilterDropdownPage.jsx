import {
  FilterDropdownFirst,
  FilterSegmentedAnswer,
  FilterSlotFill,
} from '../patterns/filter-dropdown.jsx';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

// These four patterns each render their own user/AI messages inside the
// component, so we set userMsg and aiLead to empty strings on the previewContext
// to keep the AskWindowShell from layering a duplicate exchange on top.
export default function FilterDropdownPage() {
  return (
    <>
      <PageHeader
        icon={faFilter}
        title="Filter & Scope"
        lede="Patterns for narrowing the question or its result without leaving the chat. Each takes a different stance on when filtering happens — before the answer, on the answer, or as a back-and-forth."
      />

      <PatternShowcase
        title="FilterDropdownFirst"
        description="The AI's first message is itself a required scope picker — use when the answer is meaningless without a key dimension (country, period, team)."
        bare
        previewContext={{ userMsg: "", aiLead: "" }}
      >
        <FilterDropdownFirst />
      </PatternShowcase>

      <PatternShowcase
        title="FilterSegmentedAnswer"
        description="View-switcher tabs inside a single AI reply (Summary / By Team / By Month) so the user can pivot the same data without re-asking."
        previewContext={{ userMsg: "", aiLead: "" }}
      >
        <FilterSegmentedAnswer />
      </PatternShowcase>

      <PatternShowcase
        title="FilterSlotFill"
        description="Conversational slot-filling where the AI asks for one missing dimension at a time using chip-pickers — for ambiguous requests with multiple required parameters."
        bare
        previewContext={{ userMsg: "", aiLead: "" }}
      >
        <FilterSlotFill />
      </PatternShowcase>
    </>
  );
}
