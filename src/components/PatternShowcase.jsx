import { useEffect, useId, useRef } from 'react';
import { usePreviewPane } from './PreviewPaneContext.jsx';

export default function PatternShowcase({
  title,
  description,
  children,
  bare,
  preview,
  previewContext,
}) {
  const reactId = useId();
  const sectionRef = useRef(null);
  const ctx = usePreviewPane();
  const optedOut = preview === false;
  const previewNode = optedOut ? null : (preview ?? children);

  const isActive = ctx && !optedOut && ctx.activeId === reactId;

  useEffect(() => {
    if (!ctx || optedOut) return;
    const unregister = ctx.register(reactId, {
      title,
      ref: sectionRef,
      previewNode,
      previewContext,
    });
    return unregister;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactId, optedOut, title]);

  return (
    <section
      ref={sectionRef}
      className={`showcase${isActive ? ' is-active' : ''}`}
    >
      <header className="showcase-header">
        <h2 className="showcase-title">{title}</h2>
        {description && <p className="showcase-desc">{description}</p>}
      </header>
      <div className="showcase-stage">
        {bare ? (
          children
        ) : (
          <div className="msg msg-ai">
            <div className="msg-body">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
