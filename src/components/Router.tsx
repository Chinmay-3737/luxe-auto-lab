import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import CategoriesPage from '@/components/pages/CategoriesPage';
import CarListingPage from '@/components/pages/CarListingPage';
import CarDetailPage from '@/components/pages/CarDetailPage';
import CustomizationPage from '@/components/pages/CustomizationPage';
import ContactPage from '@/components/pages/ContactPage';
import SplashScreen from '@/components/SplashScreen';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <SplashScreen />
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "category/:slug",
        element: <CarListingPage />,
      },
      {
        path: "car/:id",
        element: <CarDetailPage />,
      },
      {
        path: "customization",
        element: <CustomizationPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}