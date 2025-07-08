import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

// 1. Create the context
const SubmissionContext = createContext();

// 2. Create a custom hook for easy access to the context
export const useSubmissions = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error("useSubmissions must be used within a SubmissionProvider");
  }
  return context;
};

// 3. Create the Provider component
export const SubmissionProvider = ({ children }) => {
  // The state is an object where the key is the templateId,
  // and the value is an array of submission objects for that template.
  // e.g., { 'template-id-1': [submission1, submission2] }
  const [submissions, setSubmissions] = useLocalStorage("form-submissions", {});

  /**
   * Adds a new submission for a given template.
   * @param {string} templateId - The ID of the form template being submitted.
   * @param {object} data - The form data from react-hook-form.
   */
  const addSubmission = (templateId, data) => {
    const newSubmission = {
      id: uuidv4(), // Generate a unique ID for the submission
      submittedAt: new Date().toISOString(), // Record the timestamp
      data,
    };

    setSubmissions((prevSubmissions) => {
      // Get the existing array of submissions for this template, or an empty array if none exist
      const existingSubmissions = prevSubmissions[templateId] || [];

      // Return the new state object
      return {
        ...prevSubmissions,
        [templateId]: [...existingSubmissions, newSubmission], // Add the new submission to the array
      };
    });

    toast.success("Form submitted successfully!");
  };

  /**
   * Retrieves all submissions for a specific template ID.
   * @param {string} templateId - The ID of the template to get submissions for.
   * @returns {Array} An array of submission objects, or an empty array if none exist.
   */
  const getSubmissionsForTemplate = (templateId) => {
    return submissions[templateId] || [];
  };

  // The value that will be available to all consumer components
  const value = {
    submissions,
    addSubmission,
    getSubmissionsForTemplate,
  };

  return (
    <SubmissionContext.Provider value={value}>
      {children}
    </SubmissionContext.Provider>
  );
};
