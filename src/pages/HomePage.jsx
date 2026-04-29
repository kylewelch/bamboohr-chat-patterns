import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBrain,
  faSquareCheck,
  faFileLines,
  faFilter,
  faAt,
  faMagnifyingGlass,
  faBriefcase,
  faCalendarDays,
  faChartColumn,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons';

const PAGES = [
  { to: '/cot',             icon: faBrain,             name: 'Chain of Thought', desc: 'Patterns for surfacing AI reasoning before the answer.' },
  { to: '/choices',         icon: faSquareCheck,       name: 'Choices & Todos',  desc: 'Single/multi select, segmented controls, todo lists, done confirmations.' },
  { to: '/artifacts',       icon: faFileLines,         name: 'Artifacts',        desc: 'Markdown, image, CSV, code, and HTML preview cards.' },
  { to: '/filter-dropdown', icon: faFilter,            name: 'Filter & Scope',   desc: 'In-message dropdowns, facets, segmented answers, slot fills.' },
  { to: '/inline-chat',     icon: faAt,                name: 'Inline Chat',      desc: 'Pinned composers, selection menus, hover actions, AI-fill form fields.' },
  { to: '/misc',            icon: faMagnifyingGlass,   name: 'Sources & Loading',desc: 'Citations, loaders, scope filters, context pills, file uploads.' },
  { to: '/system-objects',  icon: faBriefcase,         name: 'System Objects',   desc: 'Quiet, scannable references to employees, reports, jobs, policies.' },
  { to: '/shifts',          icon: faCalendarDays,      name: 'Shifts',           desc: 'Shift edit, fill open shifts, draft a week, publish & notify.' },
  { to: '/viz',             icon: faChartColumn,       name: 'Data Viz',         desc: 'KPI tiles, bar/line/donut charts, mini tables.' },
  { to: '/skill',           icon: faPuzzlePiece,       name: 'Claude Code Skill',desc: 'Download a SKILL.md bundle so Claude Code knows these patterns by name.' },
];

export default function HomePage() {
  return (
    <>
      <h1>AI Chat Patterns</h1>
      <p className="page-lede">
        A working catalog of the AI/chat UI patterns used across BambooHR. Each
        pattern lives on its own page with a live demo and brief notes on when
        and why to use it.
      </p>
      <div className="home-grid">
        {PAGES.map(({ to, icon, name, desc }) => (
          <Link key={to} to={to} className="home-tile">
            <span className="home-tile-icon" aria-hidden="true">
              <FontAwesomeIcon icon={icon} />
            </span>
            <span className="home-tile-body">
              <div className="home-tile-name">{name}</div>
              <div className="home-tile-desc">{desc}</div>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
