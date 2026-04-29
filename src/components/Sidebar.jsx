import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Overview', end: true },
  { to: '/cot', label: 'Chain of Thought' },
  { to: '/choices', label: 'Choices & Todos' },
  { to: '/artifacts', label: 'Artifacts' },
  { to: '/filter-dropdown', label: 'Filter & Scope' },
  { to: '/inline-chat', label: 'Inline Chat' },
  { to: '/misc', label: 'Sources & Loading' },
  { to: '/system-objects', label: 'System Objects' },
  { to: '/shifts', label: 'Shifts' },
  { to: '/viz', label: 'Data Viz' },
  { to: '/embedded', label: 'Embedded' },
  { to: '/skill', label: 'Claude Code Skill' },
];

export default function Sidebar() {
  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar-header">
        <div className="docs-sidebar-title">AI Patterns</div>
        <div className="docs-sidebar-sub">BambooHR</div>
      </div>
      <nav className="docs-nav">
        {NAV.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? 'docs-nav-link is-active' : 'docs-nav-link'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
