import { v4 as uuidv4 } from 'uuid';

export const FIELD_TYPES = {
  LABEL: 'Label',
  TEXT: 'Text',
  NUMBER: 'Number',
  BOOLEAN: 'Boolean',
  ENUM: 'Enum',
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
          { id: uuidv4(), type: FIELD_TYPES.LABEL, label: "Your Details", config: { level: 'h2' } },
          { id: uuidv4(), type: FIELD_TYPES.TEXT, label: "Full Name", config: { required: true, placeholder: "e.g., Aman Dubey" } },
          { id: uuidv4(), type: FIELD_TYPES.TEXT, label: "Email Address", config: { required: true, placeholder: "aman@example.com" } },
        ]
      },
      {
        id: uuidv4(),
        title: "Professional Experience",
        fields: [
          { id: uuidv4(), type: FIELD_TYPES.LABEL, label: "Work History", config: { level: 'h2' } },
          { id: uuidv4(), type: FIELD_TYPES.NUMBER, label: "Years of Experience", config: { required: true, min: 0 } },
          { id: uuidv4(), type: FIELD_TYPES.ENUM, label: "Primary Skill", config: { required: true, options: ["React", "Vue", "Angular", "Node.js"] } },
          { id: uuidv4(), type: FIELD_TYPES.BOOLEAN, label: "Willing to relocate?", config: { required: false } },
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Customer Feedback",
    sections: [
      {
        id: uuidv4(),
        title: "Feedback Form",
        fields: [
           { id: uuidv4(), type: FIELD_TYPES.LABEL, label: "Tell Us What You Think", config: { level: 'h1' } },
           { id: uuidv4(), type: FIELD_TYPES.ENUM, label: "Overall Satisfaction", config: { required: true, options: ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very Unsatisfied"] } },
           { id: uuidv4(), type: FIELD_TYPES.TEXT, label: "Comments", config: { required: false, multiline: true, placeholder: "Your feedback helps us improve..." } },
           { id: uuidv4(), type: FIELD_TYPES.BOOLEAN, label: "May we contact you about your feedback?", config: { required: false } },
        ]
      }
    ]
  }
];