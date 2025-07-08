import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import BuilderPage from "./pages/BuilderPage";
import AppLayout from "./components/AppLayout";
import FormPage from "./pages/FormPage"; // donrt

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
            <LandingPage />
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
            <DashboardPage />
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
            <BuilderPage />
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
            <FormPage />
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
            <NotFoundPage />
          </AppLayout>
        }
      />
    </Routes>
  );
};

export default App;
