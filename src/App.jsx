import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ArtifactsPage from './pages/ArtifactsPage.jsx';
import ChoicesPage from './pages/ChoicesPage.jsx';
import CotPage from './pages/CotPage.jsx';
import FilterDropdownPage from './pages/FilterDropdownPage.jsx';
import InlineChatPage from './pages/InlineChatPage.jsx';
import MiscPage from './pages/MiscPage.jsx';
import ShiftsPage from './pages/ShiftsPage.jsx';
import SystemObjectsPage from './pages/SystemObjectsPage.jsx';
import VizPage from './pages/VizPage.jsx';
import EmbeddedPage from './pages/EmbeddedPage.jsx';
import SkillPage from './pages/SkillPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="artifacts" element={<ArtifactsPage />} />
        <Route path="choices" element={<ChoicesPage />} />
        <Route path="cot" element={<CotPage />} />
        <Route path="filter-dropdown" element={<FilterDropdownPage />} />
        <Route path="inline-chat" element={<InlineChatPage />} />
        <Route path="misc" element={<MiscPage />} />
        <Route path="shifts" element={<ShiftsPage />} />
        <Route path="system-objects" element={<SystemObjectsPage />} />
        <Route path="viz" element={<VizPage />} />
        <Route path="embedded" element={<EmbeddedPage />} />
        <Route path="skill" element={<SkillPage />} />
      </Route>
    </Routes>
  );
}
