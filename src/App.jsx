import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayout";
import Loader from "./components/ui/Loader";

// Lazy loaded pages for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const BuilderPage = lazy(() => import("./pages/BuilderPage"));
const FormPage = lazy(() => import("./pages/FormPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <Routes>
      {/* Landing Page Route */}
      <Route
        path="/"
        element={
          <AppLayout
            seoProps={{
              title: "FormaFlow | Build Forms That Feel Intuitive",
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

      {/* Dashboard Page Route */}
      <Route
        path="/dashboard"
        element={
          <AppLayout
            seoProps={{
              title: "Dashboard | FormaFlow",
              description:
                "Manage your form templates and view analytics in your FormaFlow dashboard.",
            }}
          >
            <Suspense fallback={<Loader />}>
              <DashboardPage />
            </Suspense>
          </AppLayout>
        }
      />

      {/* Builder Page Route (Full Screen) */}
      <Route
        path="/builder/:templateId"
        element={
          // This page is a full-screen experience and does not use AppLayout.
          // SEO would be handled within BuilderPage itself if needed.
          <Suspense fallback={<Loader text="Loading Builder..." />}>
            <BuilderPage />
          </Suspense>
        }
      />

      {/* Form Page Route (Full Screen) */}
      <Route
        path="/form/:templateId"
        element={
          // This page is a full-screen experience and does not use AppLayout.
          // SEO is handled within FormPage itself.
          <Suspense fallback={<Loader text="Loading Form..." />}>
            <FormPage />
          </Suspense>
        }
      />

      {/* About Page Route */}
      <Route
        path="/about"
        element={
          <AppLayout
            seoProps={{
              title: "About Aman Dubey | FormaFlow Developer",
              description:
                "Learn about the developer and the technology behind the FormaFlow project.",
            }}
          >
            <Suspense fallback={<Loader />}>
              <AboutPage />
            </Suspense>
          </AppLayout>
        }
      />

      {/* Pricing Page Route */}
      <Route
        path="/pricing"
        element={
          <AppLayout
            seoProps={{
              title: "Pricing Plans | FormaFlow",
              description:
                "Choose the perfect plan for your form-building needs. Start for free.",
            }}
          >
            <Suspense fallback={<Loader />}>
              <PricingPage />
            </Suspense>
          </AppLayout>
        }
      />
      <Route
        path="/play"
        element={
          <AppLayout
            seoProps={{
              title: "Loading page | FormaFlow",
              description:
                "Choose the perfect plan for your form-building needs. Start for free.",
            }}
          >
            <Suspense fallback={<Loader />}>
              <Loader />
            </Suspense>
          </AppLayout>
        }
      />

      {/* Not Found (404) Route */}
      <Route
        path="*"
        element={
          <AppLayout
            seoProps={{
              title: "404: Page Not Found | FormaFlow",
              description:
                "The page you're looking for doesn't exist or has been moved.",
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
