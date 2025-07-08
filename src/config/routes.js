// src/config/routes.js
export const routes = [
  {
    path: "/",
    element: <LandingPage />,
    seo: {
      title: "Build Forms That Feel Intuitive",
      description:
        "Create beautiful, powerful, and accessible forms in minutes with our drag-and-drop form builder.",
    },
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    seo: {
      title: "Dashboard",
      description:
        "Manage your forms and view analytics in your FormaFlow dashboard.",
    },
    protected: true,
  },
  {
    path: "/features",
    element: <FeaturesPage />,
    seo: {
      title: "Features",
      description:
        "Discover all the powerful features of our form builder platform.",
    },
  },
  {
    path: "/pricing",
    element: <PricingPage />,
    seo: {
      title: "Pricing",
      description: "Flexible pricing plans for teams of all sizes.",
    },
  },
];

export const publicRoutes = routes.filter((route) => !route.protected);
export const protectedRoutes = routes.filter((route) => route.protected);
