import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import PreviewPane from './PreviewPane.jsx';
import { PreviewPaneProvider } from './PreviewPaneContext.jsx';

// Routes that don't show the preview pane — the main column reclaims the
// width that would otherwise be reserved for the pane.
const WIDE_ROUTES = new Set(['/', '/embedded']);

export default function Layout() {
  const { pathname } = useLocation();
  const wide = WIDE_ROUTES.has(pathname);
  return (
    <PreviewPaneProvider>
      <div className="docs-shell">
        <ScrollToTop />
        <Sidebar />
        <main className={`docs-main${wide ? ' docs-main--wide' : ''}`}>
          <Outlet />
        </main>
        {!wide && <PreviewPane />}
      </div>
    </PreviewPaneProvider>
  );
}
