import {
  ArtifactMarkdown,
  ArtifactImage,
  ArtifactCSV,
  ArtifactCode,
  ArtifactHTML,
} from '../patterns/artifacts.jsx';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function ArtifactsPage() {
  return (
    <>
      <PageHeader
        icon={faFileLines}
        title="Artifacts"
        lede="Cards for content the AI produced — documents, images, tabular data, code, and rendered HTML. Use these when the output is large enough to warrant its own preview surface."
      />

      <PatternShowcase
        title="ArtifactMarkdown"
        description="Preview card for a generated markdown document, with a fade-out gradient hinting at more content below."
        previewContext={{
          userMsg: "Draft a remote-work policy for the company handbook.",
          aiLead: "Here's a first pass — open it to read the full thing:",
        }}
      >
        <ArtifactMarkdown />
      </PatternShowcase>

      <PatternShowcase
        title="ArtifactImage"
        description="Preview card for a generated image, diagram, or chart asset."
        previewContext={{
          userMsg: "Make me an org-chart graphic for the Engineering team.",
          aiLead: "Generated — click to open the full image:",
        }}
      >
        <ArtifactImage />
      </PatternShowcase>

      <PatternShowcase
        title="ArtifactCSV"
        description="Preview card for tabular data the AI produced or extracted, with a small table showing the first few rows."
        previewContext={{
          userMsg: "Export every employee with a review due in Q4.",
          aiLead: "Pulled 142 rows. First few shown — open to see all:",
        }}
      >
        <ArtifactCSV />
      </PatternShowcase>

      <PatternShowcase
        title="ArtifactCode"
        description="Preview card for generated code, shown as a dark block with a syntax-highlight feel."
        previewContext={{
          userMsg: "Write me a webhook handler that pings Slack when someone is hired.",
          aiLead: "Here's a working snippet — open it to copy or edit:",
        }}
      >
        <ArtifactCode />
      </PatternShowcase>

      <PatternShowcase
        title="ArtifactHTML"
        description="Preview card for an HTML artifact that's meant to be rendered (a mini page, an email template, etc.)."
        previewContext={{
          userMsg: "Build a welcome email template for new hires.",
          aiLead: "Drafted — open to see the rendered version:",
        }}
      >
        <ArtifactHTML />
      </PatternShowcase>
    </>
  );
}
