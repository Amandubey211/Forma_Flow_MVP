import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayout";
import Loader from "./components/ui/Loader";
import AboutPage from "./pages/AboutPage";

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
          <Suspense fallback={<Loader text="Loading Builder..." />}>
            <BuilderPage />
          </Suspense>
        }
      />

      {/* The FormPage also correctly remains outside of AppLayout */}
      <Route
        path="/form/:templateId"
        element={
          <Suspense fallback={<Loader text="Loading Form..." />}>
            <FormPage />
          </Suspense>
        }
      />

      <Route
        path="/about"
        element={
          <AppLayout
            seoProps={{
              title: "About",
              description:
                "Manage your forms and view analytics in your FormaFlow dashboard.",
            }}
          >
            <Suspense fallback={<Loader />}>
              <AboutPage />
            </Suspense>
          </AppLayout>
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
