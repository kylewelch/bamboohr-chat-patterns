// Embedded surfaces — patterns that live in the product UI, not in a chat
// thread. They sit on a dashboard, in a header bar, or alongside other
// product content. Each one wraps itself in its own backdrop so it reads
// as "this is what it looks like in the product" rather than as a floating
// artifact on a blank white stage.
import React from 'react';
import { Ico, Monogram } from './primitives';

const EMBED_BG = '#F6F6F4';      // neutral "embedded surface" backdrop
const BRAND_GREEN = '#2E7918';   // BambooHR primary green

// ---------- InsightCard ----------
// A row of categorical insight cards an AI surfaced for a manager. Each card
// has a tag (Watch / Declining / Improving / etc), a serif headline, and
// supporting prose. Designed for the top of a dashboard.
function InsightCard() {
  const items = [
    {
      tag: 'Watch',
      tone: 'orange',
      title: 'Engineering is struggling to close candidates',
      body: '3 of 5 recent offers declined — well below the company average.',
    },
    {
      tag: 'Watch',
      tone: 'orange',
      title: 'Time-to-fill is up 18% this quarter',
      body: 'Open roles are taking an average of 34 days to fill.',
    },
    {
      tag: 'Declining',
      tone: 'red',
      title: 'Final-round drop-off is unusually high',
      body: '22% of candidates are withdrawing after the final interview.',
    },
  ];

  const tagStyles = {
    orange: { bg: '#FBE7DA', fg: '#C24A0F' },
    red:    { bg: '#FBDFDF', fg: '#A8221F' },
    green:  { bg: '#DDEBD3', fg: '#2E7918' },
  };

  return (
    <div style={{
      background: EMBED_BG,
      borderRadius: 14,
      padding: '24px 26px 28px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
      }}>
        <span style={{ color: BRAND_GREEN, display: 'inline-flex', fontSize: 22, lineHeight: 1 }}>★</span>
        <h3 style={{
          margin: 0, fontFamily: 'var(--font-serif)',
          fontSize: 26, fontWeight: 700, color: BRAND_GREEN,
          letterSpacing: '-0.01em', lineHeight: 1.1,
        }}>Insights</h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 16,
      }}>
        {items.map((it, i) => {
          const tag = tagStyles[it.tone] ?? tagStyles.orange;
          return (
            <div key={i} className="clickable" style={{
              background: '#fff',
              border: '1px solid var(--gray-2)',
              borderRadius: 14,
              padding: '20px 22px 22px',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <span style={{
                alignSelf: 'flex-start',
                background: tag.bg, color: tag.fg,
                fontSize: 13, fontWeight: 600,
                padding: '4px 14px', borderRadius: 999,
              }}>{it.tag}</span>

              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                justifyContent: 'space-between',
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 19, fontWeight: 700,
                  color: 'var(--gray-9)',
                  lineHeight: 1.3,
                  flex: 1, minWidth: 0,
                }}>{it.title}</div>
                <Ico.chevR style={{
                  color: 'var(--gray-7)', flexShrink: 0, marginTop: 8,
                  width: 16, height: 16,
                }} />
              </div>

              <div style={{
                fontSize: 15, color: 'var(--gray-7)',
                lineHeight: 1.45,
              }}>{it.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- InputBar ----------
// Wide pill-shaped composer for the global AI surface inside a product page.
// Sparkles glyph on the left, placeholder, suggested actions on the right,
// circular send button. Use in a dashboard header or above main content.
function InputBar() {
  const suggestions = [
    'Check I-9 complian…',
    'Review payroll exce…',
    'Why did offer acce…',
  ];
  return (
    <div style={{
      background: EMBED_BG,
      borderRadius: 14,
      padding: '28px 28px 32px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: '#fff',
        border: '1px solid #E6E5DC',
        borderRadius: 999,
        padding: '12px 12px 12px 24px',
        boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
      }}>
        <span style={{ color: BRAND_GREEN, display: 'inline-flex', flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9 2.5l1.6 4.4L15 8.5l-4.4 1.6L9 14.5l-1.6-4.4L3 8.5l4.4-1.6L9 2.5zM17 13l1 2.6 2.6 1-2.6 1L17 20.2 16 17.6 13.4 16.6 16 15.6 17 13z" />
          </svg>
        </span>
        <div style={{
          flex: 1, fontSize: 17, color: 'var(--gray-6)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          minWidth: 0,
        }}>
          Run a report, resolve a task, check compliance…
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {suggestions.map((s, i) => (
            <button key={i} style={{
              background: '#fff',
              border: '1px solid var(--gray-3)',
              color: 'var(--gray-9)',
              fontSize: 14, fontWeight: 600,
              padding: '9px 18px', borderRadius: 999,
              cursor: 'pointer', fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}>{s}</button>
          ))}
          <button aria-label="Send" style={{
            width: 42, height: 42, borderRadius: '50%',
            background: BRAND_GREEN, color: '#fff',
            border: 0, padding: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- TaskCard ----------
// "Needs Your Attention" carousel of grouped actions the AI summarized. Card
// stack peeks out behind the front card to imply a queue. Each card has an
// eyebrow (the bucket the items belong to), a serif-bold title, body prose,
// and primary + secondary CTAs.
function TaskCard() {
  return (
    <div style={{
      background: EMBED_BG,
      border: '1px solid #E6E5DC',
      borderRadius: 16,
      padding: '22px 22px 28px',
    }}>
      {/* Header: title + Full list link + carousel controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16,
      }}>
        <h3 style={{
          margin: 0, fontFamily: 'var(--font-serif)',
          fontSize: 24, fontWeight: 700, color: BRAND_GREEN,
          letterSpacing: '-0.01em', lineHeight: 1.1,
        }}>Needs Your Attention</h3>
        <a style={{
          fontSize: 15, fontWeight: 600, color: BRAND_GREEN,
          textDecoration: 'none', cursor: 'pointer',
        }}>Full list</a>
        <div style={{ flex: 1 }} />
        <button aria-label="Previous" style={{
          background: 'transparent', border: 0, padding: 4,
          color: BRAND_GREEN, cursor: 'pointer', display: 'flex',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
          {[true, false, false, false, false].map((on, i) => (
            <span key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: on ? BRAND_GREEN : '#C7CEC2',
            }} />
          ))}
        </div>
        <button aria-label="Next" style={{
          background: 'transparent', border: 0, padding: 4,
          color: BRAND_GREEN, cursor: 'pointer', display: 'flex',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Stacked cards — front card on top, two peeking out below-right */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 10, left: 10, right: -10, bottom: -20,
          background: '#fff',
          border: '1px solid var(--gray-2)',
          borderRadius: 14,
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          top: 5, left: 5, right: -5, bottom: -10,
          background: '#fff',
          border: '1px solid var(--gray-2)',
          borderRadius: 14,
          zIndex: 1,
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          background: '#fff',
          border: '1px solid var(--gray-2)',
          borderRadius: 14,
          padding: '20px 22px 22px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12,
          }}>
            {/* Stacked monograms */}
            <div style={{ display: 'flex', flexShrink: 0, marginTop: 2 }}>
              {['Alex Rivera', 'Priya Nair', 'Tom Okafor'].map((n, i) => (
                <div key={n} style={{
                  marginLeft: i === 0 ? 0 : -10,
                  border: '2px solid #fff', borderRadius: '50%',
                  display: 'inline-flex',
                  background: '#fff',
                }}>
                  <Monogram name={n} size={32} photo radius={999} />
                </div>
              ))}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 700, color: BRAND_GREEN,
                letterSpacing: '0.06em',
                marginBottom: 6,
              }}>
                <Ico.calendar style={{ width: 14, height: 14, color: BRAND_GREEN }} />
                <span>PTO REQUESTS</span>
              </div>
              <div style={{
                fontSize: 17, fontWeight: 700, color: 'var(--gray-9)',
                lineHeight: 1.35,
              }}>
                Alex Rivera, Priya Nair, and Tom Okafor are requesting time off
              </div>
            </div>

            <button aria-label="More" style={{
              background: 'transparent', border: 0, padding: 4,
              color: 'var(--gray-7)', cursor: 'pointer', display: 'flex',
              flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <circle cx="4" cy="10" r="1.6" />
                <circle cx="10" cy="10" r="1.6" />
                <circle cx="16" cy="10" r="1.6" />
              </svg>
            </button>
          </div>

          <div style={{
            fontSize: 15, color: 'var(--gray-7)', lineHeight: 1.5,
            marginBottom: 28,
          }}>
            3 PTO requests with no scheduling conflicts. Alex (Apr 14–15, 2 days), Priya (Apr 21, 1 day), Tom (Apr 17–18, 2 days).
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              background: BRAND_GREEN, color: '#fff',
              border: 0, borderRadius: 999,
              padding: '11px 26px', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Approve All</button>
            <button style={{
              background: '#fff', color: BRAND_GREEN,
              border: `1.5px solid ${BRAND_GREEN}`, borderRadius: 999,
              padding: '11px 26px', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Snooze</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { InsightCard, InputBar, TaskCard };
