import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import Layout from './components/Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <HashRouter>
          <Layout>
            <App />
          </Layout>
        </HashRouter>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>
);
