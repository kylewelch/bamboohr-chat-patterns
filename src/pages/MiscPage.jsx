import {
  SourcesRow,
  SourcesInline,
  LoadTyping,
  LoadShimmer,
  LoadStatus,
  LoadSkeletonCards,
  LoadProgress,
  FilterScope,
  FilterRefine,
  ContextComposer,
  ContextComposerReadOnly,
  ContextOnMessage,
  ContextPill,
  FileUploadComposer,
  FileUploadSubmitted,
  FileUploadDropzone,
  LoadFormLiveFill,
} from '../patterns/misc.jsx';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function MiscPage() {
  return (
    <>
      <PageHeader
        icon={faMagnifyingGlass}
        title="Sources, Loading & Context"
        lede="Smaller building blocks that show up across many AI surfaces: citations, loading states, scope filters, context pills, and file uploads."
      />

      <PatternShowcase
        title="SourcesRow"
        description="A row of citation pills below an answer that names what the AI drew on, so users can verify or click through."
        previewContext={{
          userMsg: "How much PTO does Maria have left this year?",
          aiLead: "She has 12.5 days remaining. Drawn from:",
        }}
      >
        <SourcesRow />
      </PatternShowcase>

      <PatternShowcase
        title="SourcesInline"
        description="Numbered superscript citations woven into body text — for dense answers where source attribution belongs at the claim level."
        previewContext={{
          userMsg: "How much PTO does Maria have left, and when does she next accrue?",
          aiLead: "",
        }}
      >
        <SourcesInline />
      </PatternShowcase>

      <PatternShowcase
        title="LoadTyping"
        description="A rotating phrase next to bouncing dots — gentlest loader, for short waits where you just want to show the AI is alive."
        previewContext={{
          userMsg: "How many people are on PTO this week?",
          aiLead: "",
        }}
      >
        <LoadTyping />
      </PatternShowcase>

      <PatternShowcase
        title="LoadShimmer"
        description="Shimmer-animated skeleton lines that match the eventual answer's shape — best for replacing a paragraph or card while it loads."
        previewContext={{
          userMsg: "Summarize the 360 review feedback for Sam.",
          aiLead: "",
        }}
      >
        <LoadShimmer />
      </PatternShowcase>

      <PatternShowcase
        title="LoadStatus"
        description="Spinner with a 'Searching X of Y' counter — use when you can show concrete progress against a known total."
        previewContext={{
          userMsg: "Find every employee record missing an I-9 form.",
          aiLead: "",
        }}
      >
        <LoadStatus />
      </PatternShowcase>

      <PatternShowcase
        title="LoadSkeletonCards"
        description="Skeleton avatar + text cards that stand in for a list of results before they arrive."
        previewContext={{
          userMsg: "Find me five candidates for the open Product Manager role.",
          aiLead: "",
        }}
      >
        <LoadSkeletonCards />
      </PatternShowcase>

      <PatternShowcase
        title="LoadFormLiveFill"
        description="An agent live-fills a structured form: shimmer skeletons resolve into AI-extracted values in a top-to-bottom wave, while any fields the agent leaves blank stay highlighted, prompting the user to complete them."
        bare
        previewContext={{
          userMsg: "Configure a new Minnesota Paid Family Leave tax from these sources.",
          aiLead: "On it — pre-filling what I can extract now:",
        }}
      >
        <LoadFormLiveFill />
      </PatternShowcase>

      <PatternShowcase
        title="LoadProgress"
        description="Progress bar with a percentage counter — for long, deterministic operations like exports or batch jobs."
        previewContext={{
          userMsg: "Generate Q4 comp review packets for the team.",
          aiLead: "On it — this'll take a moment:",
        }}
      >
        <LoadProgress />
      </PatternShowcase>

      <PatternShowcase
        title="FilterScope"
        description="A composer with a persistent scope-pill row above the input, so the same scope sticks across multiple sends."
        bare
        previewContext={{ userMsg: "", aiLead: "" }}
      >
        <FilterScope />
      </PatternShowcase>

      <PatternShowcase
        title="FilterRefine"
        description="Search input + role toggle above a result list, for narrowing what the AI returned without a new chat turn."
        bare
        previewContext={{
          userMsg: "Find me the senior engineers we hired this year.",
          aiLead: "5 matches. Use the bar above to narrow further:",
        }}
      >
        <FilterRefine />
      </PatternShowcase>

      <PatternShowcase
        title="ContextPill"
        description="Reusable chip representing one attached reference (file, person, team, report); pass `onRemove` to make it dismissible."
        previewContext={{
          userMsg: "Use these as context for my next few questions.",
          aiLead: "Attached. Each one will stick to the conversation until you remove it:",
        }}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ContextPill type="file" label="Q3 Roadmap.pdf" onRemove={() => {}} />
          <ContextPill type="ref" label="Team: Engineering" />
        </div>
      </PatternShowcase>

      <PatternShowcase
        title="ContextComposer"
        description="Textarea with a row of attached context pills above it and a + Add button that opens a picker — the standard composer for context-heavy tasks."
        bare
        previewContext={{ userMsg: "", aiLead: "" }}
      >
        <ContextComposer />
      </PatternShowcase>

      <PatternShowcase
        title="ContextComposerReadOnly"
        description="Read-only variant of ContextComposer for showing what context was attached to a past message, with pills and Add disabled."
        bare
        previewContext={{ userMsg: "", aiLead: "" }}
      >
        <ContextComposerReadOnly />
      </PatternShowcase>

      <PatternShowcase
        title="ContextOnMessage"
        description="Renders the context pills inline on a past user message, so the conversation log shows what the AI was given."
        previewContext={{ userMsg: "", aiLead: "" }}
      >
        <ContextOnMessage />
      </PatternShowcase>

      <PatternShowcase
        title="FileUploadComposer"
        description="Composer with file thumbnails stacked above the input — for the moment between picking files and sending them."
        bare
        previewContext={{ userMsg: "", aiLead: "" }}
      >
        <FileUploadComposer />
      </PatternShowcase>

      <PatternShowcase
        title="FileUploadSubmitted"
        description="A sent user message with file tiles plus the AI's first acknowledgement — closes the loop on a successful upload."
        bare
        previewContext={{ userMsg: "", aiLead: "" }}
      >
        <FileUploadSubmitted />
      </PatternShowcase>

      <PatternShowcase
        title="FileUploadDropzone"
        description="Dashed-border drop target for empty-state file pickers when the surface is dedicated to upload."
        bare
        previewContext={{
          userMsg: "I have a batch of offer letters to look at.",
          aiLead: "Drop the files here and I'll start parsing:",
        }}
      >
        <FileUploadDropzone />
      </PatternShowcase>

    </>
  );
}
