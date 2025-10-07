import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import NotFound from './pages/_errors/NotFound';

// 라우트 컴포넌트를 import()로 미리 당길 수 있게 하는 helper
export function lazyPreload<T extends { default: React.ComponentType<any> }>(
  importer: () => Promise<T>
) {
  // component 자음만 사용한 변수
  const Cmp = React.lazy(importer) as any;
  (Cmp as any).preload = importer; // Smartlink에서 el.type.preload() 호출용

  return Cmp as React.LazyExoticComponent<React.ComponentType<any>> & {
    preload: () => Promise<T>;
  };
}

const Home = lazyPreload(() => import('./pages/home/page'));
const Landing = lazyPreload(() => import('./pages/landing/page'));
const Post = lazyPreload(() => import('./pages/posts/page'));
const Upload = lazyPreload(() => import('./pages/upload/page'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'home', element: <Home /> },
      { path: 'landing', element: <Landing /> },
      { path: 'upload', element: <Upload /> },
      {
        path: `posts/:id`,
        element: <Post />,
        loader: async ({ params }) => {
          // 추후에 supabase end-point로 변경하기
          const post = fetch(`/api/posts/${params.id}`).then(r => r.json());
          return { post };
        }
      }
    ]
  }
]);
