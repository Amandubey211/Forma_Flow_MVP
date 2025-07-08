import { v4 as uuidv4 } from "uuid";

export const FIELD_TYPES = {
  // Text Elements
  LABEL: "Label",
  TEXT: "Short Answer",
  PARAGRAPH: "Paragraph",

  // Multiple Choice Elements
  DROPDOWN: "Dropdown",
  RADIO: "Radio",
  CHECKBOX: "Yes / No",

  // Media Elements
  UPLOAD: "Upload",
  IMAGE: "Image",

  // Legacy types for backward compatibility
  NUMBER: "Number",
  BOOLEAN: "Boolean",
  ENUM: "Enum",
};

export const PRE_BUILT_TEMPLATES = [
  // --- TEMPLATE 1: Overhauled Job Application ---
  {
    id: uuidv4(),
    name: "Comprehensive Job Application",
    sections: [
      {
        id: uuidv4(),
        title: "Personal Information",
        fields: [
          {
            id: uuidv4(),
            type: FIELD_TYPES.LABEL,
            label: "Join Our Team!",
            config: { level: "h1" },
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
            config: {
              required: true,
              placeholder: "e.g., aman.dubey@example.com",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.TEXT,
            label: "Phone Number",
            config: { required: true, placeholder: "+91 12345 67890" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.TEXT,
            label: "Link to your Portfolio/Website",
            config: {
              required: false,
              placeholder: "https://your-portfolio.com",
            },
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
            label: "Your Experience",
            config: { level: "h2" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.DROPDOWN,
            label: "Years of Professional Experience",
            config: {
              required: true,
              options: [
                "0-1 Years",
                "1-3 Years",
                "3-5 Years",
                "5-8 Years",
                "8+ Years",
              ],
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.PARAGRAPH,
            label: "Describe your most relevant past role.",
            config: {
              required: true,
              placeholder:
                "Describe your key responsibilities and achievements...",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.UPLOAD,
            label: "Upload your Resume/CV",
            config: { required: true },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.PARAGRAPH,
            label: "Cover Letter",
            config: {
              required: true,
              placeholder:
                "Why are you a good fit for this role and our company?",
            },
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Skills & Qualifications",
        fields: [
          {
            id: uuidv4(),
            type: FIELD_TYPES.LABEL,
            label: "Skill Assessment",
            config: { level: "h2" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.RADIO,
            label: "Proficiency in React",
            config: {
              required: true,
              options: ["Beginner", "Intermediate", "Advanced", "Expert"],
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.RADIO,
            label: "Proficiency in Node.js",
            config: {
              required: true,
              options: ["Beginner", "Intermediate", "Advanced", "Expert"],
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.TEXT,
            label:
              "What is your expected annual salary (in your local currency)?",
            config: { required: false, placeholder: "e.g., 1,200,000 INR" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.CHECKBOX,
            label:
              "Are you authorized to work in the country of this job's location?",
            config: { required: true },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.CHECKBOX,
            label: "Are you willing to relocate if necessary?",
            config: { required: false },
          },
        ],
      },
    ],
  },

  // --- TEMPLATE 2: Your Project Showcase (Unchanged) ---
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

  // --- TEMPLATE 3: Overhauled Customer Feedback ---
  {
    id: uuidv4(),
    name: "In-Depth Customer Feedback",
    sections: [
      {
        id: uuidv4(),
        title: "Feedback Form",
        fields: [
          {
            id: uuidv4(),
            type: FIELD_TYPES.LABEL,
            label: "Tell Us What You Think!",
            config: { level: "h1" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.PARAGRAPH,
            label: "Which product/service are you providing feedback for?",
            config: {
              required: true,
              placeholder: "e.g., The Form Builder App",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.RADIO,
            label: "How would you rate your overall satisfaction?",
            config: {
              required: true,
              options: [
                "⭐ Very Unsatisfied",
                "⭐⭐ Unsatisfied",
                "⭐⭐⭐ Neutral",
                "⭐⭐⭐⭐ Satisfied",
                "⭐⭐⭐⭐⭐ Very Satisfied",
              ],
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.PARAGRAPH,
            label: "What did you like most about the product?",
            config: {
              required: false,
              placeholder: "Describe what you enjoyed...",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.PARAGRAPH,
            label: "What could we improve?",
            config: {
              required: true,
              placeholder: "Please be as specific as possible...",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.DROPDOWN,
            label:
              "How likely are you to recommend us to a friend or colleague?",
            config: {
              required: true,
              options: [
                "Very Unlikely",
                "Unlikely",
                "Neutral",
                "Likely",
                "Very Likely",
              ],
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.IMAGE,
            label: "If you encountered an issue, please upload a screenshot.",
            config: { required: false },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.CHECKBOX,
            label: "May we contact you to follow up on your feedback?",
            config: { required: false },
          },
        ],
      },
    ],
  },

  // --- TEMPLATE 5: NEW Detailed Bug Report ---
  {
    id: uuidv4(),
    name: "Detailed Bug Report",
    sections: [
      {
        id: uuidv4(),
        title: "Bug Report Details",
        fields: [
          {
            id: uuidv4(),
            type: FIELD_TYPES.LABEL,
            label: "Submit a Bug Report",
            config: { level: "h2" },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.TEXT,
            label: "Briefly, what is the issue?",
            config: {
              required: true,
              placeholder:
                "e.g., 'Save button is not working on the builder page'",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.PARAGRAPH,
            label: "Steps to Reproduce",
            config: {
              required: true,
              placeholder:
                "Please list the exact steps needed to make the bug appear...",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.PARAGRAPH,
            label: "Expected vs. Actual Behavior",
            config: {
              required: true,
              placeholder:
                "What did you expect to happen, and what actually happened?",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.DROPDOWN,
            label: "Issue Severity",
            config: {
              required: true,
              options: [
                "Critical (Blocks all work)",
                "High (Major feature broken)",
                "Medium (Inconvenient)",
                "Low (Cosmetic issue)",
              ],
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.TEXT,
            label: "Browser & OS Version",
            config: {
              required: true,
              placeholder: "e.g., Chrome 125 on macOS Sonoma",
            },
          },
          {
            id: uuidv4(),
            type: FIELD_TYPES.IMAGE,
            label: "Upload Screenshot or Video of the Bug",
            config: { required: true },
          },
        ],
      },
    ],
  },
];
