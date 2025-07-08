import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayout";
import Loader from "./components/ui/Loader"; // 1. Import the new Loader component

// Lazy loaded pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const BuilderPage = lazy(() => import("./pages/BuilderPage"));
const FormPage = lazy(() => import("./pages/FormPage"));

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            seoProps={{
              title: "Build Forms That Feel Intuitive",
              description:
                "Create beautiful, powerful, and accessible forms in minutes with our drag-and-drop form builder.",
            }}
          >
            {/* 2. Use the Loader component as the fallback */}
            <Suspense fallback={<Loader />}>
              <LandingPage />
            </Suspense>
          </AppLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <AppLayout
            seoProps={{
              title: "Dashboard",
              description:
                "Manage your forms and view analytics in your FormaFlow dashboard.",
            }}
          >
            <Suspense fallback={<Loader />}>
              <DashboardPage />
            </Suspense>
          </AppLayout>
        }
      />

      <Route
        path="/builder/:templateId"
        element={
          <AppLayout
            seoProps={{
              title: "Builder",
              description:
                "Manage your forms and view analytics in your FormaFlow Builder.",
            }}
          >
            <Suspense fallback={<Loader />}>
              <BuilderPage />
            </Suspense>
          </AppLayout>
        }
      />

      {/* For the full-screen form page, we don't use AppLayout */}
      <Route
        path="/form/:templateId"
        element={
          <Suspense fallback={<Loader />}>
            <FormPage />
          </Suspense>
        }
      />

      <Route
        path="*"
        element={
          <AppLayout
            seoProps={{
              title: "Page Not Found",
              description: "The page you're looking for doesn't exist.",
            }}
          >
            <Suspense fallback={<Loader />}>
              <NotFoundPage />
            </Suspense>
          </AppLayout>
        }
      />
    </Routes>
  );
};

export default App;
