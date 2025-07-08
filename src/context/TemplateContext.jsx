import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PRE_BUILT_TEMPLATES } from "../lib/constants";
import toast from "react-hot-toast";

const TemplateContext = createContext();

export const useTemplates = () => useContext(TemplateContext);

export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useLocalStorage(
    "form-templates",
    PRE_BUILT_TEMPLATES
  );

  const addTemplate = (template) => {
    if (templates.length >= 5) {
      toast.error("You can only have up to 5 templates.");
      return;
    }
    setTemplates((prev) => [...prev, template]);
    toast.success("Template created successfully!");
  };

  // --- THIS IS THE ROBUST, CORRECTED FUNCTION ---
  /**
   * Updates a template with new data. Can handle full or partial updates.
   * @param {string} templateId - The ID of the template to update.
   * @param {object} updatedData - An object containing the properties to update.
   */
  const updateTemplate = (templateId, updatedData) => {
    setTemplates((prev) =>
      prev.map((t) => {
        if (t.id === templateId) {
          // Merge existing template with the new updated data
          return { ...t, ...updatedData };
        }
        return t;
      })
    );
    // Note: We let the component calling this function decide whether to show a toast.
  };

  const deleteTemplate = (templateId) => {
    setTemplates((prev) => prev.filter((t) => t.id !== templateId));
    toast.success("Template deleted!");
  };

  const getTemplateById = (id) => {
    return templates.find((t) => t.id === id);
  };

  const value = {
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateById,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
