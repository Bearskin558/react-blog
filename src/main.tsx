import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { store } from './app/store';
import './index.css';
import ThemeProvider from './components/ThemeProvider';
import Auth from './pages/Auth/Auth';
import Layout from './components/Layout';
import Posts from './pages/Posts/Posts';
import CurrentPost from './pages/CurrentPost/CurrentPost';
import UserProfile from './pages/UserProfile/UserProfile';
import Followers from './pages/Followers/Followers';
import Following from './pages/Following/Following';
import AuthGuard from './features/user/AuthGuard';

const container = document.getElementById('root');
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Posts />,
      },
      {
        path: 'posts/:id',
        element: <CurrentPost />,
      },
      {
        path: 'users/:id',
        element: <UserProfile />,
      },
      {
        path: 'followers',
        element: <Followers />,
      },
      {
        path: 'following',
        element: <Following />,
      },
    ],
  },
]);

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider>
          <AuthGuard>
            <RouterProvider router={router} />
          </AuthGuard>
        </ThemeProvider>
      </NextUIProvider>
    </Provider>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
