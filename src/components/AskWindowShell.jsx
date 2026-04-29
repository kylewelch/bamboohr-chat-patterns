// Reusable Ask BambooHR window mockup. Hosts a slotted artifact in a chat
// thread with header, optional pinned strip, scrolling messages, and composer.
const GREEN = '#4B7B2D';

function ChatSparkle() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h15A2.5 2.5 0 0 1 23 5.5v10A2.5 2.5 0 0 1 20.5 18H10l-5 4.5V18H5.5A2.5 2.5 0 0 1 3 15.5v-10Z" fill={GREEN}/>
      <path d="M13 7l.9 2.1L16 10l-2.1.9L13 13l-.9-2.1L10 10l2.1-.9L13 7Z" fill="#fff"/>
      <circle cx="17.5" cy="7.5" r="1" fill="#fff"/>
    </svg>
  );
}

function UserBubble({ children }) {
  return (
    <div style={{
      alignSelf: 'flex-end', marginLeft: 40, maxWidth: '100%',
      background: '#F2F3F1',
      padding: '12px 14px', borderRadius: 10,
      fontSize: 13, color: 'var(--gray-9)', lineHeight: 1.45,
      textAlign: 'left'
    }}>
      {children}
    </div>
  );
}

function AIBubble({ children }) {
  return (
    <div style={{ fontSize: 13, color: 'var(--gray-9)', lineHeight: 1.55 }}>
      {children}
    </div>
  );
}

export default function AskWindowShell({
  slot,
  pinned,
  userMsg = "Show me what this looks like.",
  aiLead = "Here you go:",
  aiTrail,
  thread,
  slotScrollX = false,
  dateLabel = "Today",
  width = 400,
  height = 720,
}) {
  return (
    <div style={{
      width: '100%', maxWidth: width, height, margin: '0 auto',
      display: 'flex', flexDirection: 'column',
      background: '#fff', border: '1px solid var(--gray-3)', borderRadius: 14,
      boxShadow: '0 4px 14px rgba(0,0,0,.08)', overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 14px 12px', flexShrink: 0, background: '#fff'
      }}>
        <ChatSparkle />
        <div style={{
          fontSize: 20, fontWeight: 700, color: GREEN, letterSpacing: '-0.01em',
          fontFamily: 'var(--font-serif)'
        }}>Ask BambooHR</div>
        <div style={{ flex: 1 }} />
        <button aria-label="Expand" style={{
          width: 30, height: 30, borderRadius: '50%',
          border: '1.5px solid var(--gray-3)', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0, color: 'var(--gray-7)'
        }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3h4M3 3v4M13 13h-4M13 13v-4"/>
          </svg>
        </button>
        <button aria-label="Close" style={{
          width: 30, height: 30, borderRadius: '50%',
          border: '1.5px solid var(--gray-3)', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0, color: 'var(--gray-7)'
        }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8"/>
          </svg>
        </button>
      </div>

      {pinned && (
        <div style={{ padding: '0 14px 10px', flexShrink: 0 }}>
          {pinned}
        </div>
      )}

      <div style={{
        flex: 1, overflow: 'auto', padding: '4px 14px 14px',
        display: 'flex', flexDirection: 'column', gap: 14
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 12, color: 'var(--gray-6)', margin: '4px 0'
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--gray-2)' }} />
          <span>{dateLabel}</span>
          <div style={{ flex: 1, height: 1, background: 'var(--gray-2)' }} />
        </div>

        {thread ? thread : (
          <>
            {userMsg && <UserBubble>{userMsg}</UserBubble>}
            {aiLead && <AIBubble>{aiLead}</AIBubble>}
            {slot && (
              slotScrollX ? (
                <div style={{
                  alignSelf: 'stretch',
                  overflowX: 'auto',
                  margin: '0 -14px',
                  padding: '0 14px',
                }}>
                  <div style={{ width: 'max-content' }}>
                    {slot}
                  </div>
                </div>
              ) : (
                <div style={{ alignSelf: 'stretch' }}>
                  {slot}
                </div>
              )
            )}
            {aiTrail && <AIBubble>{aiTrail}</AIBubble>}
          </>
        )}
      </div>

      <div style={{
        padding: 12, background: '#F5F6F4', flexShrink: 0
      }}>
        <div style={{
          border: '1px solid var(--gray-3)', borderRadius: 6, background: '#fff',
          padding: '10px 12px', display: 'flex', alignItems: 'flex-start', gap: 10,
          minHeight: 64
        }}>
          <div style={{ flex: 1, fontSize: 13, color: 'var(--gray-5)', lineHeight: 1.4 }}>
            Ask a question...
          </div>
          <button aria-label="Send" style={{
            background: 'transparent', border: 0, padding: 2, cursor: 'pointer',
            color: 'var(--gray-5)', alignSelf: 'flex-end'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export { UserBubble, AIBubble };
