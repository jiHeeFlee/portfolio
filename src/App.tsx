import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './router';

import './styles/reset.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* SEO 유틸 */}
    <HelmetProvider>
      {/* Router  */}
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
