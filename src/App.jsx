import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayout";

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
            <Suspense fallback={<div>Loading...</div>}>
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
            <Suspense fallback={<div>Loading...</div>}>
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
            <Suspense fallback={<div>Loading...</div>}>
              <BuilderPage />
            </Suspense>
          </AppLayout>
        }
      />

      <Route
        path="/form/:templateId"
        element={
          <AppLayout
            seoProps={{
              title: "Form",
              description: "Form",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <FormPage />
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
            <Suspense fallback={<div>Loading...</div>}>
              <NotFoundPage />
            </Suspense>
          </AppLayout>
        }
      />
    </Routes>
  );
};

export default App;
