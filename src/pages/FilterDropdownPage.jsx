import {
  FilterDropdownFirst,
  FilterFacetsOnResult,
  FilterSegmentedAnswer,
  FilterSlotFill,
} from '../patterns/filter-dropdown.jsx';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

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
        previewContext={{
          userMsg: "Show me PTO usage.",
          aiLead: "PTO usage swings a lot by region — pick one and I'll pull the numbers:",
        }}
      >
        <FilterDropdownFirst />
      </PatternShowcase>

      <PatternShowcase
        title="FilterFacetsOnResult"
        description="A facet bar attached to the result message that refines the same answer in place, without a new chat turn."
        previewContext={{
          userMsg: "Who's up for review this quarter?",
          aiLead: "37 employees. Use the facets to slice it:",
        }}
      >
        <FilterFacetsOnResult />
      </PatternShowcase>

      <PatternShowcase
        title="FilterSegmentedAnswer"
        description="View-switcher tabs inside a single AI reply (Summary / By Team / By Month) so the user can pivot the same data without re-asking."
        previewContext={{
          userMsg: "How are we tracking on hiring this year?",
          aiLead: "27 of 34 planned hires made. Switch views to slice the same data:",
        }}
      >
        <FilterSegmentedAnswer />
      </PatternShowcase>

      <PatternShowcase
        title="FilterSlotFill"
        description="Conversational slot-filling where the AI asks for one missing dimension at a time using chip-pickers — for ambiguous requests with multiple required parameters."
        bare
        previewContext={{
          userMsg: "Run a comp report.",
          aiLead: "Happy to. Two quick things first — which team, and over what window?",
        }}
      >
        <FilterSlotFill />
      </PatternShowcase>
    </>
  );
}
