import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PageHeader({ icon, title, lede }) {
  return (
    <header className="page-header">
      <div className="page-title-row">
        {icon && (
          <span className="page-title-icon" aria-hidden="true">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        <h1>{title}</h1>
      </div>
      {lede && <p className="page-lede">{lede}</p>}
    </header>
  );
}
