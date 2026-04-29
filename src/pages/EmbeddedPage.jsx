import { InsightCard, InputBar, TaskCard } from '../patterns/embedded.jsx';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import PatternShowcase from '../components/PatternShowcase.jsx';
import PageHeader from '../components/PageHeader.jsx';

// Patterns on this page live OUTSIDE the chat thread — they're embedded
// directly in the product UI. preview={false} on every showcase so the
// right-side preview pane stays hidden for the whole route.
export default function EmbeddedPage() {
  return (
    <>
      <PageHeader
        icon={faLayerGroup}
        title="Embedded"
        lede="Patterns that live outside of the chat window — embedded directly in the product UI. Dashboard tiles, action queues, and global composers that bring AI into the workflow without making the user open a chat surface."
      />

      <PatternShowcase
        title="InsightCard"
        description="A row of categorical insight cards (Watch, Declining, Improving, etc.) with a tag, serif headline, supporting prose, and a chevron to drill in. Use at the top of a dashboard to surface the things the AI thinks the user should look at."
        bare
        preview={false}
      >
        <InsightCard />
      </PatternShowcase>

      <PatternShowcase
        title="InputBar"
        description="A wide pill-shaped composer with a sparkles glyph, placeholder, and inline suggested actions. Use as the global AI surface inside a product view — embedded in the page header or above the main content, not floating in a chat panel."
        bare
        preview={false}
      >
        <InputBar />
      </PatternShowcase>

      <PatternShowcase
        title="TaskCard"
        description="A 'Needs Your Attention' carousel of cards that group related actions (PTO requests, expense approvals, missing forms). Embed on the dashboard or homepage as a queue of AI-summarized work the user can step through."
        bare
        preview={false}
      >
        <TaskCard />
      </PatternShowcase>
    </>
  );
}
