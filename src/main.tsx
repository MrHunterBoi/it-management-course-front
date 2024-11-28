import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/tiptap/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import './i18n';
import Home from './pages/Home.tsx';
import Profile from './pages/profile/Profile.tsx';
import CreateNewStory from './pages/stories/CreateNewStory.tsx';
import EditStory from './pages/stories/EditStory.tsx';
import Stories from './pages/stories/Stories.tsx';
import Story from './pages/stories/Story.tsx';

// const router = createHashRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: '',
//         element: <Home />,
//       },
//       {
//         path: 'stories',
//         element: <Stories />,
//       },
//       {
//         path: 'stories/new',
//         element: <CreateNewStory />,
//       },
//       {
//         path: 'stories/:storyId',
//         element: <Story />,
//       },

//       {
//         path: 'stories/:storyId/edit',
//         element: <EditStory />,
//       },
//       {
//         path: 'profile',
//         element: <Profile />,
//       },
//       {
//         path: '*',
//         element: <Home />,
//       },
//     ],
//   },
// ]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <BrowserRouter basename="/it-management-course-front">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="stories" element={<Stories />} />
              <Route path="stories/new" element={<CreateNewStory />} />
              <Route path="stories/:storyId" element={<Story />} />
              <Route path="stories/:storyId/edit" element={<EditStory />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>
);
