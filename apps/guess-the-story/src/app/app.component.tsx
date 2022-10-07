// Third parties
import { Route, Routes, Navigate } from 'react-router-dom';

// Libs
import { PageStories } from '@playroom/guess-the-story/features/stories';

export const App = () => (
  <Routes>
    <Route path="home" element={<Navigate to="/stories" />} />
    <Route path="stories" element={<PageStories />} />
    <Route path="/" element={<Navigate to="home" />} />
  </Routes>
);
