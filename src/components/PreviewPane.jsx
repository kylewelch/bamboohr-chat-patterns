import { usePreviewPane } from './PreviewPaneContext.jsx';
import AskWindowShell from './AskWindowShell.jsx';

export default function PreviewPane() {
  const ctx = usePreviewPane();
  if (!ctx) return null;
  const { entries, activeId } = ctx;
  if (entries.length === 0) return null;

  const active = entries.find(e => e.id === activeId) ?? entries[0];
  if (!active) return null;

  const previewContext = active.previewContext ?? {};
  const slot = active.previewNode ?? null;

  return (
    <aside className="docs-preview" aria-label="Pattern preview in chat context">
      <div className="docs-preview-frame">
        <div className="docs-preview-header">
          <code className="docs-preview-name">{active.title}</code>
        </div>
        <div className="docs-preview-stage">
          <AskWindowShell slot={slot} {...previewContext} />
        </div>
      </div>
    </aside>
  );
}
