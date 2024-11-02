import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { projectConfig } from '../config';


const router = createBrowserRouter([
  {
    path: projectConfig.baseRoute,
    element: <App />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>
);
