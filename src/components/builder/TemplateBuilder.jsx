// // import { useState } from "react";
// // import SectionList from "./SectionList";
// // import FieldConfig from "./FieldConfig";

// // const TemplateBuilder = () => {
// //   const [selectedField, setSelectedField] = useState(null);

// //   return (
// //     <div className="flex gap-6">
// //       <div className="w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
// //         <SectionList onSelectField={setSelectedField} />
// //       </div>
// //       <div className="w-2/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
// //         {selectedField ? (
// //           <FieldConfig field={selectedField} />
// //         ) : (
// //           <div className="text-center py-10 text-gray-500">
// //             Select a field to configure
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TemplateBuilder;

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   ChevronDown,
//   FileText,
//   Trash2,
//   Search,
//   CheckSquare,
//   Circle,
//   Upload,
//   Image as ImageIcon,
//   Plus,
//   GripVertical,
//   AlignLeft,
// } from "lucide-react";

// // --- Data for Sidebar Elements ---
// // Kept outside the component to prevent re-declaration on every render
// const elementGroups = {
//   "TEXT ELEMENTS": [
//     {
//       type: "short-answer",
//       label: "Short Answer",
//       icon: <FileText className="w-6 h-6" />,
//     },
//     {
//       type: "paragraph",
//       label: "Paragraph",
//       icon: <AlignLeft className="w-6 h-6" />,
//     },
//   ],
//   "MULTIPLE CHOICE": [
//     {
//       type: "dropdown",
//       label: "Dropdown",
//       icon: <CheckSquare className="w-6 h-6" />,
//     },
//     { type: "radio", label: "Radio", icon: <Circle className="w-6 h-6" /> },
//     {
//       type: "yes-no",
//       label: "Yes / No",
//       icon: (
//         <div className="flex items-center justify-center w-6 h-6 border-2 border-current rounded-md">
//           <CheckSquare size={12} />
//         </div>
//       ),
//     },
//   ],
//   "MEDIA ELEMENT": [
//     { type: "upload", label: "Upload", icon: <Upload className="w-6 h-6" /> },
//     { type: "image", label: "Image", icon: <ImageIcon className="w-6 h-6" /> },
//   ],
// };

// const JobApplicationBuilder = () => {
//   // --- STATE MANAGEMENT ---
//   const [fields, setFields] = useState([
//     {
//       id: 1,
//       type: "short-answer",
//       label: "Full Name",
//       helpText: "",
//       isRequired: true,
//       showConditions: false,
//     },
//   ]);
//   const [activeFieldId, setActiveFieldId] = useState(null);
//   const [activeTab, setActiveTab] = useState("Field");
//   const [hoveredElement, setHoveredElement] = useState(null);

//   // --- HANDLER FUNCTIONS ---
//   const getFieldTypeDetails = (type) => {
//     for (const group of Object.values(elementGroups)) {
//       const found = group.find((el) => el.type === type);
//       if (found) return { label: found.label, icon: found.icon };
//     }
//     return { label: "Field", icon: <FileText className="w-4 h-4" /> };
//   };

//   const handleAddField = (type) => {
//     const newId = Date.now();
//     const newField = {
//       id: newId,
//       type: type,
//       label: "Untitled " + getFieldTypeDetails(type).label,
//       helpText: "",
//       isRequired: false,
//       showConditions: false,
//     };
//     setFields((prevFields) => [...prevFields, newField]);
//     setActiveFieldId(newId);
//   };

//   const handleFieldUpdate = (id, key, value) => {
//     setFields((prevFields) =>
//       prevFields.map((field) =>
//         field.id === id ? { ...field, [key]: value } : field
//       )
//     );
//   };

//   const handleDeleteField = (id) => {
//     setFields((prevFields) => prevFields.filter((field) => field.id !== id));
//     if (activeFieldId === id) {
//       setActiveFieldId(null);
//     }
//   };

//   const handleDoneEditing = () => {
//     setActiveFieldId(null);
//   };

//   // --- SUB-COMPONENTS (Defined inside for single-component requirement) ---
//   const CustomSwitch = ({ checked, onChange }) => (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={checked}
//       onClick={() => onChange(!checked)}
//       className={`${
//         checked ? "bg-gray-800" : "bg-gray-200"
//       } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2`}
//     >
//       <span
//         aria-hidden="true"
//         className={`${
//           checked ? "translate-x-5" : "translate-x-0"
//         } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
//       />
//     </button>
//   );

//   return (
//     <div
//       className="bg-[#fbfbfa] min-h-screen font-sans text-gray-900"
//       style={{
//         backgroundImage:
//           "radial-gradient(circle, #e5e5e5 1px, rgba(0, 0, 0, 0) 1px)",
//         backgroundSize: "20px 20px",
//       }}
//     >
//       <div className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
//         {/* --- HEADER --- */}
//         <header className="flex items-center justify-between pb-6">
//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded-md hover:bg-gray-200/50 transition-colors">
//               <ArrowLeft size={20} />
//             </button>
//             <div className="flex items-center text-sm">
//               <span className="text-gray-500">John's workspace /</span>
//               <button className="flex items-center gap-1 font-medium ml-1 p-1 rounded-md hover:bg-gray-200/50 transition-colors">
//                 Job application
//                 <ChevronDown size={16} />
//               </button>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="px-4 py-2 text-sm font-medium border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
//               Save draft
//             </button>
//             <button className="px-4 py-2 text-sm font-medium border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
//               Preview
//             </button>
//             <button className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg shadow-sm hover:bg-gray-900 transition-colors">
//               Share
//             </button>
//           </div>
//         </header>

//         {/* --- MAIN CONTENT --- */}
//         <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//           {/* --- LEFT PANEL: FORM BUILDER --- */}
//           <div className="lg:col-span-2 space-y-4">
//             <AnimatePresence>
//               {fields.map((field) => (
//                 <motion.div
//                   key={field.id}
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
//                   transition={{ type: "spring", stiffness: 260, damping: 25 }}
//                 >
//                   {activeFieldId === field.id ? (
//                     // --- EDITING VIEW ---
//                     <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-500">
//                       <div className="flex items-center justify-between mb-6">
//                         <div className="flex items-center gap-3 text-sm font-medium">
//                           <div className="text-gray-500">
//                             {getFieldTypeDetails(field.type).icon}
//                           </div>
//                           <span>{getFieldTypeDetails(field.type).label}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-gray-600">
//                             Make as required
//                           </span>
//                           <CustomSwitch
//                             checked={field.isRequired}
//                             onChange={(isChecked) =>
//                               handleFieldUpdate(
//                                 field.id,
//                                 "isRequired",
//                                 isChecked
//                               )
//                             }
//                           />
//                         </div>
//                       </div>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="text-sm font-medium text-gray-700 block mb-1">
//                             Label
//                           </label>
//                           <input
//                             type="text"
//                             value={field.label}
//                             onChange={(e) =>
//                               handleFieldUpdate(
//                                 field.id,
//                                 "label",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Add field label"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                           />
//                         </div>
//                         <div>
//                           <label className="text-sm font-medium text-gray-700 block mb-1">
//                             Add help text
//                           </label>
//                           <input
//                             type="text"
//                             value={field.helpText}
//                             onChange={(e) =>
//                               handleFieldUpdate(
//                                 field.id,
//                                 "helpText",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Add help text"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                           />
//                         </div>
//                         <div>
//                           <label className="text-sm font-medium text-gray-700 block mb-1">
//                             Field type
//                           </label>
//                           <div className="relative">
//                             <select
//                               value={field.type}
//                               onChange={(e) =>
//                                 handleFieldUpdate(
//                                   field.id,
//                                   "type",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full appearance-none p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             >
//                               <option value="" disabled>
//                                 Select option
//                               </option>
//                               {Object.values(elementGroups)
//                                 .flat()
//                                 .map((el) => (
//                                   <option key={el.type} value={el.type}>
//                                     {el.label}
//                                   </option>
//                                 ))}
//                             </select>
//                             <ChevronDown
//                               size={20}
//                               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                             />
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 pt-2">
//                           <CustomSwitch
//                             checked={field.showConditions}
//                             onChange={(isChecked) =>
//                               handleFieldUpdate(
//                                 field.id,
//                                 "showConditions",
//                                 isChecked
//                               )
//                             }
//                           />
//                           <span className="text-sm text-gray-600">
//                             Only show field when conditions are met
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
//                         <button
//                           onClick={() => handleDeleteField(field.id)}
//                           className="p-2 rounded-md hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors"
//                         >
//                           <Trash2 size={20} />
//                         </button>
//                         <button
//                           onClick={handleDoneEditing}
//                           className="px-6 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors"
//                         >
//                           Done
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     // --- DISPLAY VIEW ---
//                     <div
//                       onClick={() => setActiveFieldId(field.id)}
//                       className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all duration-200"
//                     >
//                       <div className="flex items-start gap-4">
//                         <GripVertical className="text-gray-400 mt-2 flex-shrink-0 cursor-move" />
//                         <div className="w-full">
//                           <label className="font-medium text-sm flex items-center">
//                             {field.label}{" "}
//                             {field.isRequired && (
//                               <span className="text-red-500 ml-1">*</span>
//                             )}
//                           </label>
//                           <div className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-gray-50/80 text-gray-500 text-sm">
//                             {field.helpText || "Placeholder..."}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             <button
//               onClick={() => handleAddField("short-answer")}
//               className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100/80 hover:border-gray-400 transition-all duration-200"
//             >
//               <Plus size={16} />
//               Add field
//             </button>
//           </div>

//           {/* --- RIGHT PANEL: ELEMENTS SIDEBAR --- */}
//           <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 sticky top-8">
//             <div className="p-3">
//               <div className="flex border-b border-gray-200">
//                 {["Field", "Workflow", "Permissions"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab ? "border-b-2 border-gray-800 text-gray-800" : "text-gray-500 hover:text-gray-800"}`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="p-3">
//               {activeTab === "Field" && (
//                 <div className="space-y-6">
//                   <div className="relative">
//                     <Search
//                       size={18}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Search element"
//                       className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50/80 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     />
//                   </div>

//                   <div className="space-y-4">
//                     {Object.entries(elementGroups).map(
//                       ([groupName, elements]) => (
//                         <div key={groupName}>
//                           <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
//                             {groupName}
//                           </h3>
//                           <div className="grid grid-cols-2 gap-2">
//                             {elements.map((el) => (
//                               <button
//                                 key={el.type}
//                                 onClick={() => handleAddField(el.type)}
//                                 onMouseEnter={() => setHoveredElement(el.type)}
//                                 onMouseLeave={() => setHoveredElement(null)}
//                                 className={`flex flex-col items-center justify-center text-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${hoveredElement === el.type ? "bg-gray-100 scale-105" : "bg-white"}`}
//                               >
//                                 <div
//                                   className={`transition-colors text-gray-600 ${hoveredElement === el.type ? "text-gray-800" : ""}`}
//                                 >
//                                   {el.icon}
//                                 </div>
//                                 <span className="text-xs font-medium mt-2">
//                                   {el.label}
//                                 </span>
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </div>
//               )}
//               {activeTab === "Workflow" && (
//                 <div className="text-center p-12 text-gray-500 text-sm">
//                   Workflow settings are not available.
//                 </div>
//               )}
//               {activeTab === "Permissions" && (
//                 <div className="text-center p-12 text-gray-500 text-sm">
//                   Permission settings are not available.
//                 </div>
//               )}
//             </div>
//           </aside>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default JobApplicationBuilder;
