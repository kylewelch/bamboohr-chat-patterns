import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import PreviewPane from './PreviewPane.jsx';
import { PreviewPaneProvider } from './PreviewPaneContext.jsx';

export default function Layout() {
  return (
    <PreviewPaneProvider>
      <div className="docs-shell">
        <ScrollToTop />
        <Sidebar />
        <main className="docs-main">
          <Outlet />
        </main>
        <PreviewPane />
      </div>
    </PreviewPaneProvider>
  );
}
