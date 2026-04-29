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
          userMsg: "Draft a Q4 2026 headcount plan I can share with leadership.",
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
          userMsg: "Export current headcount and attrition by department as a CSV.",
          aiLead: "Pulled 28 rows. First few shown — open to see the full file:",
        }}
      >
        <ArtifactCSV />
      </PatternShowcase>

      <PatternShowcase
        title="ArtifactCode"
        description="Preview card for generated code, shown as a dark block with a syntax-highlight feel."
        previewContext={{
          userMsg: "Generate the PTO accrual function we use for US salaried employees.",
          aiLead: "Here it is — open to copy or edit:",
        }}
      >
        <ArtifactCode />
      </PatternShowcase>

      <PatternShowcase
        title="ArtifactHTML"
        description="Preview card for an HTML artifact that's meant to be rendered (a mini page, an email template, etc.)."
        previewContext={{
          userMsg: "Build a 2027 benefits summary page employees can read during open enrollment.",
          aiLead: "Drafted — open to see the rendered version:",
        }}
      >
        <ArtifactHTML />
      </PatternShowcase>
    </>
  );
}
