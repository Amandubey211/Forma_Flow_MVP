# FormaFlow - The Intuitive Form Builder

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.18.0-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

FormaFlow is a dynamic, schema-driven Form Template Builder that empowers users to create beautiful, responsive, and highly functional forms with an intuitive drag-and-drop interface. This project was built to fulfill a technical assignment but was approached with a product-minded focus on superior user experience, fluid animations, and a scalable architecture.

---

## ✨ Live Demo, Video & About Me

Experience the live application, see a walkthrough of its core features, and learn more about the developer behind it.

*   **Live Application:** **https://formaflow.vercel.app/**
*   **Video Showcase (2 min):** **https://drive.google.com/file/d/1e8K9MyJdQAVQV_cmHRqUax4ynxIWzN7k/view**
*   **About The Developer:** **https://amandubey.vercel.app/about | https://www.linkedin.com/in/profile-amandubey/**

---

## 🚀 Core Features

### Builder Module
*   **Intuitive Drag & Drop:** Effortlessly reorder fields or drag new ones from the palette onto the canvas, even into an empty list.
*   **Inline Editing Experience:** Click any field to reveal a rich editor panel directly below, with changes reflected in real-time.
*   **Auto-Saving:** All changes are automatically saved to local storage after a brief pause in typing, with a clear status indicator (`Saving...`, `All changes saved`) in the header.
*   **High-Fidelity Previews:** The canvas shows a realistic, disabled preview of how each field (text, dropdowns, file uploads) will look to the end-user.
*   **Rich Field Palette:** A comprehensive set of field types including text, paragraph, dropdown, radio, checkbox, image, and file uploads.
*   **Advanced UX Features:**
    *   **Template Settings Modal:** A focused modal to edit a template's name and description.
    *   **Duplicate Field:** Instantly clone any field and its configuration with a single click.
    *   **Add Between:** A subtle "+" icon appears on hover to add new fields exactly where you want them.
    *   **Scroll-to-Active:** The view automatically centers on the field you're editing for a seamless workflow.

### Form & Submission Module
*   **Schema-Driven Rendering:** Forms are dynamically generated from the template's JSON schema, making the system incredibly flexible.
*   **Interactive File Previews:** Users can upload images or PDFs and preview them in a pop-up modal before submitting.
*   **Robust Validation:** Utilizes `react-hook-form` for client-side validation based on rules set in the builder (e.g., "required").
*   **Local Storage Persistence:** All templates and form submissions are saved to the browser's local storage.

### General UX & Polish
*   **Polished & Consistent UI:** A clean, modern interface built with Tailwind CSS, designed to be both beautiful and functional.
*   **Purposeful Animations:** Fluid animations using Framer Motion provide satisfying user feedback without being distracting.
*   **Thoughtful Edge Case Handling:** Gracefully handles empty states, unsaved changes warnings, and 404 errors on production refresh.
*   **Accessible Modals:** Confirmation and settings modals feature focus-trapping and keyboard controls (`Esc` to close) for better accessibility.

---

## 🛠️ Tech Stack & Architectural Decisions

This project uses a modern, robust tech stack chosen for developer experience, performance, and scalability.

> **Fun Fact:** The fear of long words is called **hippopotomonstrosesquippedaliophobia**. Attention to detail is key!

| Category           | Technology / Library                                                                | Rationale                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Framework**      | [**React**](https://reactjs.org/) & [**Vite**](https://vitejs.dev/)                   | For a fast, modern development experience and a performant component-based architecture.                  |
| **Styling**        | [**Tailwind CSS**](https://tailwindcss.com/)                                        | For rapid, utility-first styling that ensures consistency and maintainability.                            |
| **Animation**      | [**Framer Motion**](https://www.framer.com/motion/)                                 | For creating fluid, high-quality animations and complex layout transitions with a simple API.             |
| **State Management** | **React Context API** & `useLocalStorage`                                           | For managing global state (templates, submissions) in a clean, decoupled way without external libraries.  |
| **Drag & Drop**    | [**@dnd-kit**](https://dndkit.com/)                                                 | A lightweight, performant, and accessible drag-and-drop toolkit for React.                                |
| **Form Handling**  | [**React Hook Form**](https://react-hook-form.com/)                                 | For high-performance, scalable form state management and validation on the submission page.               |
| **Routing**        | [**React Router**](https://reactrouter.com/)                                        | The standard for handling client-side routing and navigation in React applications.                       |
| **Icons**          | [**Lucide React**](https://lucide.dev/)                                             | For a beautiful, consistent, and lightweight set of SVG icons.                                            |

### Architectural Pattern
The application is built on a **Schema-Driven Rendering** architecture. This means the UI is dynamically generated from a JSON "schema" (our template object). This pattern decouples the data from the presentation, making the system highly scalable, maintainable, and flexible.

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18.x or later)
*   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## ✅ Assignment Checklist

### Selection Criteria
- [x] **Well-documented README:** Provided.
- [x] **Code Quality & Structure:** Professional project structure with clean, reusable components.
- [x] **Polished UI & Edge Cases:** UI is consistent and polished, with handling for empty states, unsaved changes, and 404s.
- [x] **All Assignment Specs:** All features from the spec sheet for both the Builder and Form have been implemented.
- [x] **Short Demo Video:** A complete video showcase is linked above.

### Bonus Points
- [x] **Modular & Reusable Components:** Extensive use of reusable UI and logic components.
- [x] **Schema-Driven Rendering:** Core architectural pattern of the application.
- [x] **Effective State Management:** Clean and efficient use of Context API and `react-hook-form`.
- [ ] **Type Safety:** Project uses JavaScript. Could be enhanced with TypeScript.
- [ ] **Unit/Component Tests:** Tests have not been implemented but could be added with a framework like Vitest.
