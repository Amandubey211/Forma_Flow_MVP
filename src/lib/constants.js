import { v4 as uuidv4 } from "uuid";

export const FIELD_TYPES = {
  // Text Elements
  LABEL: "Label",
  TEXT: "Text",
  PARAGRAPH: "Paragraph",

  // Multiple Choice Elements
  DROPDOWN: "Dropdown",
  RADIO: "Radio",
  CHECKBOX: "Checkbox", // A single checkbox (like Yes/No)

  // Media Elements
  UPLOAD: "Upload",
  IMAGE: "Image",

  // Kept for backward compatibility if needed
  NUMBER: "Number",
  BOOLEAN: "Boolean", // Can be mapped to Checkbox
  ENUM: "Enum", // Can be mapped to Dropdown
};
export const PRE_BUILT_TEMPLATES = [
  {
    id: uuidv4(),
    name: "Job Application",
    sections: [
      {
        id: uuidv4(),
        title: "Personal Information",
        fields: [
          {
            id: uuidv4(),
            type: FIELD_TYPES.LABEL,
            label: "Your Details",
            config: { level: "h2" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.TEXT,
            label: "Full Name",
            config: { required: true, placeholder: "e.g., Aman Dubey" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.TEXT,
            label: "Email Address",
            config: { required: true, placeholder: "aman@example.com" },
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Professional Experience",
        fields: [
          {
            id: uuidv4(),
            type: FIELD_TYPES.LABEL,
            label: "Work History",
            config: { level: "h2" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.NUMBER,
            label: "Years of Experience",
            config: { required: true, min: 0 },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.ENUM,
            label: "Primary Skill",
            config: {
              required: true,
              options: ["React", "Vue", "Angular", "Node.js"],
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.BOOLEAN,
            label: "Willing to relocate?",
            config: { required: false },
          },
        ],
      },
    ],
  },
  {
    id: "showcase-template-01", // Use a predictable ID for easy access
    name: "Project Progress Showcase",
    sections: [
      {
        id: uuidv4(),
        title: "Showcase Details",
        fields: [
          {
            id: uuidv4(),
            type: FIELD_TYPES.LABEL,
            label: "Project Showcase & Feedback",
            config: { level: "h2" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.PARAGRAPH,
            label: "Introduction",
            config: {
              required: false,
              // This is a great place to put a default value that explains the form's purpose.
              // Note: You'll need to update your renderer to handle a `defaultValue` property.
              // For now, we'll use the placeholder.
              placeholder:
                "Hi Priyansha & Ayush,\n\nThank you for the opportunity. Here is a live, interactive showcase of the Form Builder assignment, built with the tool itself. I've included a short demo video and some fields to demonstrate the submission functionality.\n\nBest regards,\nAman Dubey",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.IMAGE, // Using 'Image' to imply video, as it has a nice UI
            label: "Demo Video (Click to 'Upload' & Preview)",
            config: {
              required: true,
              placeholder:
                "A short screen recording showcasing the builder's features.",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.RADIO,
            label: "Overall Impression of the UI/UX",
            config: {
              required: true,
              options: [
                "Excellent, very polished",
                "Good, meets expectations",
                "Average, needs some work",
                "Below expectations",
              ],
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.DROPDOWN,
            label: "Which feature stands out the most?",
            config: {
              required: false,
              options: [
                "The fluid drag-and-drop UI",
                "Inline editing experience",
                "File preview functionality",
                "The overall design aesthetic",
                "Code quality and structure",
              ],
              placeholder: "Select the most impressive feature",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.TEXT,
            label: "Any specific feedback or suggestions?",
            config: {
              required: false,
              placeholder: "e.g., 'Consider adding multi-column layouts...'",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.CHECKBOX,
            label:
              "This submission confirms I have reviewed the project showcase.",
            config: {
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Customer Feedback",
    sections: [
      {
        id: uuidv4(),
        title: "Feedback Form",
        fields: [
          {
            id: uuidv4(),
            type: FIELD_TYPES.LABEL,
            label: "Tell Us What You Think",
            config: { level: "h1" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.ENUM,
            label: "Overall Satisfaction",
            config: {
              required: true,
              options: [
                "Very Satisfied",
                "Satisfied",
                "Neutral",
                "Unsatisfied",
                "Very Unsatisfied",
              ],
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.TEXT,
            label: "Comments",
            config: {
              required: false,
              multiline: true,
              placeholder: "Your feedback helps us improve...",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.BOOLEAN,
            label: "May we contact you about your feedback?",
            config: { required: false },
          },
        ],
      },
    ],
  },
];
