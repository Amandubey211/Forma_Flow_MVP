export const landingPageConfig = {
  navbar: {
    logo: "FormaFlow",
    links: [
      // { name: "Features", path: "/features" },
      // { name: "Templates", path: "/templates" },
      { name: "Dashboard", path: "/dashboard" },
      { name: "About", path: "/about" },
    ],
    cta: {
      login: { text: "Login", path: "/login" },
      getStarted: { text: "Get Started Free", path: "/dashboard" },
    },
  },

  hero: {
    title: "Build forms that feel intuitive.",
    description:
      "Create beautiful, powerful, and accessible forms in minutes. No code required. Just drag, drop, and you're done.",
    cta: {
      text: "Start Building for Free",
      path: "/dashboard",
    },
  },

  socialProof: {
    title: "Trusted by the best teams",
    companies: [
      { name: "Google", icon: "Chrome" },
      { name: "Microsoft", icon: "Square" },
      { name: "Apple", icon: "Apple" },
      { name: "Amazon", icon: "ShoppingBag" },
      { name: "Facebook", icon: "Facebook" },
      { name: "Netflix", icon: "Tv" },
      { name: "Slack", icon: "Slack" },
      { name: "GitHub", icon: "Github" },
    ],
  },

  benefits: [
    {
      icon: "Layers",
      title: "Drag & Drop Simplicity",
      description:
        "Build powerful forms in minutes with our intuitive, no-code visual editor.",
    },
    {
      icon: "GitBranch",
      title: "Conditional Logic",
      description:
        "Create dynamic forms that react to user input, showing or hiding questions.",
    },
    {
      icon: "Code",
      title: "Seamless Integrations",
      description:
        "Connect to your favorite tools like Slack, Google Sheets, and more.",
    },
    {
      icon: "BarChart",
      title: "Advanced Analytics",
      description:
        "Gain insights from your data with a built-in, easy-to-understand dashboard.",
    },
    {
      icon: "Users",
      title: "Team Collaboration",
      description:
        "Invite team members to create, edit, and manage forms together in one workspace.",
    },
    {
      icon: "Palette",
      title: "Custom Branding",
      description:
        "Match your forms to your brand with custom colors, fonts, and logos.",
    },
  ],

  testimonials: [
    {
      quote:
        "This is a complete game-changer. We've cut down our form creation time by 90% and the responses have never been more organized. Simply brilliant.",
      author: "Jane Doe",
      role: "Head of Operations, Startup Inc.",
      avatar: "https://i.pravatar.cc/48",
    },
    {
      quote:
        "The conditional logic features alone have saved us hundreds of hours in form processing. Our team loves how intuitive the interface is.",
      author: "John Smith",
      role: "Product Manager, Tech Corp",
      avatar: "https://i.pravatar.cc/48?img=2",
    },
    {
      quote:
        "We switched from Typeform and haven't looked back. The customization options and pricing are unbeatable.",
      author: "Sarah Johnson",
      role: "Marketing Director, Growth LLC",
      avatar: "https://i.pravatar.cc/48?img=3",
    },
  ],

  cta: {
    title: "Ready to start building?",
    description:
      "Join thousands of teams building better forms today. It's free to get started.",
    button: {
      text: "Sign Up for Free",
      path: "/dashboard",
    },
  },

  footer: {
    logo: "FormaFlow",
    tagline: "Build better forms, faster.",
    links: {
      product: [
        { name: "Features", path: "/features" },
        { name: "Pricing", path: "/pricing" },
        { name: "Integrations", path: "/integrations" },
        { name: "Changelog", path: "/changelog" },
      ],
      company: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" },
      ],
      resources: [
        { name: "Blog", path: "/blog" },
        { name: "Support", path: "/support" },
        { name: "API Docs", path: "/api" },
      ],
      legal: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
    copyright: `© ${new Date().getFullYear()} FormaFlow, Inc. All rights reserved.`,
  },
};
