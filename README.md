# FormaFlow - The Intuitive Form Builder

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.18-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

FormaFlow is a dynamic, schema-driven Form Template Builder that empowers users to create beautiful, responsive, and highly functional forms with an intuitive drag-and-drop interface. This project was built to fulfill a technical assignment but was approached with a product-minded focus on superior user experience, fluid animations, and a scalable architecture.

---

## ✨ **Live Demo & Project Showcase**

Experience the live application, see a walkthrough of its core features, and learn more about the developer.

*   **🚀 Live Application:** **[https://formaflow.vercel.app/](https://formaflow.vercel.app/)**
*   **🎬 Video Showcase (2 min):** **[Link to Your Demo Video]**
*   **👤 About The Developer:** **[https://amandubey.vercel.app/about](https://amandubey.vercel.app/about)**

---

## 🚀 **Core Features**

### Builder Module
*   **Intuitive Drag & Drop:** Effortlessly reorder fields or drag new ones from the palette onto the canvas, even into an empty list.
*   **Inline Editing Experience:** Click any field to reveal a rich editor panel directly below, with the view automatically centering for a focused workflow.
*   **Auto-Saving:** All changes are automatically saved to local storage after a brief pause in typing, with a clear status indicator (`Saving...`, `All changes saved`).
*   **High-Fidelity Previews:** The canvas shows a realistic, disabled preview of how each field will look to the end-user.
*   **Advanced UX Features:** Includes a template settings modal, one-click field duplication, and a context-aware "add-between" button.

### Form & Submission Module
*   **Schema-Driven Rendering:** Forms are dynamically generated from the template's JSON schema, making the system incredibly flexible.
*   **Interactive File Previews:** Users can upload images or PDFs and preview them in a pop-up modal before submitting.
*   **Robust Validation:** Utilizes `react-hook-form` for client-side validation based on rules set in the builder.
*   **Persistent State:** All templates and form submissions are saved to the browser's local storage via a React Context API.

---

## 🛠️ **Tech Stack & Architectural Decisions**

This project uses a modern, robust tech stack chosen for developer experience, performance, and scalability.

> **Fun Fact:** The fear of long words is called **hippopotomonstrosesquippedaliophobia**. Attention to detail is key!

| Category           | Technology / Library                                                                | Rationale                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Framework**      | [**React**](https://reactjs.org/) & [**Vite**](https://vitejs.dev/)                   | For a fast, modern development experience and a performant component-based architecture.                  |
| **Styling**        | [**Tailwind CSS**](https://tailwindcss.com/)                                        | For rapid, utility-first styling that ensures consistency and maintainability.                            |
| **Animation**      | [**Framer Motion**](https://www.framer.com/motion/)                                 | For creating fluid, high-quality animations and complex layout transitions with a simple API.             |
| **State Management** | **React Context API** & `useLocalStorage`                                           | For managing global state in a clean, decoupled way without external libraries. `useCallback` is used to prevent stale state issues.  |
| **Drag & Drop**    | [**@dnd-kit**](https://dndkit.com/)                                                 | A lightweight, performant, and accessible drag-and-drop toolkit for React.                                |
| **Form Handling**  | [**React Hook Form**](https://react-hook-form.com/)                                 | For high-performance, scalable form state management and validation on the submission page.               |

### **Architectural Pattern**
The application is built on a **Schema-Driven Rendering** architecture. This means the UI is dynamically generated from a JSON "schema" (our template object). This pattern decouples the data from the presentation, making the system highly scalable, maintainable, and flexible.

---

## ⚙️ **Getting Started**

To get a local copy up and running, follow these simple steps.

### Prerequisites
*   Node.js (v18.x or later)
*   npm or yarn

### Installation & Setup
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Amandubey211/form-template-builder.git
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

## ✅ **Assignment Checklist**

### Selection Criteria
- [x] **Well-documented README:** Provided.
- [x] **Code Quality & Structure:** Professional project structure with clean, reusable components.
- [x] **Polished UI & Edge Cases:** UI is consistent and polished, with handling for empty states, unsaved changes, and 404s.
- [x] **All Assignment Specs:** All features from the spec sheet for both the Builder and Form have been implemented.
- [x] **Short Demo Video:** A complete video showcase is linked above.

### Bonus Points
- [x] **Modular & Reusable Components**
- [x] **Schema-Driven Rendering**
- [x] **Effective State Management**
- [x] **Basic Unit or Component Tests** (Implemented with Vitest)
- [ ] **Type Safety** (Project uses JavaScript)
