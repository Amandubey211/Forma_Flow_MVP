import { AnimatePresence, motion } from "framer-motion";
import {
  FileEdit,
  X,
  Image as ImageIcon,
  Settings,
  Palette,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

const THEME_COLORS = [
  "#6366f1", // Indigo
  "#ec4899", // Pink
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
];

const EditTemplateModal = ({ isOpen, onClose, onSave, template }) => {
  const [activeTab, setActiveTab] = useState("general");

  // State for the editable fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // State for the display-only theme color
  const [themeColor, setThemeColor] = useState("");

  const inputRef = useRef(null);

  // When the modal opens or the template prop changes, populate the state.
  // This ensures the fields are pre-loaded with the current template's data.
  useEffect(() => {
    if (isOpen && template) {
      setName(template.name || "");
      setDescription(template.description || ""); // Assuming description is part of your template object
      setThemeColor(template.themeColor || THEME_COLORS[0]);

      // When the modal opens, auto-focus the name input for immediate editing.
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, template]);

  // This function is now fully functional for the General tab.
  const handleSave = () => {
    // We only save if the name is not empty.
    if (name.trim()) {
      const updatedSettings = {
        name: name.trim(),
        description: description.trim(),
        // We don't pass back theme or image as they are not editable yet.
      };
      onSave(updatedSettings); // Pass the updated data back to the parent
      onClose(); // Close the modal on successful save
    }
  };

  // Keyboard shortcuts for better UX
  const handleKeyDown = (e) => {
    // Allow Enter key to save from the input fields
    if (
      e.key === "Enter" &&
      (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
    ) {
      handleSave();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const TabButton = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tabName ? "bg-slate-100 text-slate-800" : "text-slate-500 hover:bg-slate-100/50"}`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg bg-white rounded-lg shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 p-2 flex items-center justify-center flex-shrink-0">
                  <Settings className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Template Settings
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Main Content with Tabs */}
            <div className="flex flex-col sm:flex-row gap-4 p-6">
              <nav className="flex flex-row sm:flex-col gap-1">
                <TabButton
                  tabName="general"
                  label="General"
                  icon={<FileEdit size={16} />}
                />
                <TabButton
                  tabName="theme"
                  label="Theme"
                  icon={<Palette size={16} />}
                />
              </nav>
              <div className="flex-1 sm:pl-4 sm:border-l sm:border-slate-200">
                <AnimatePresence mode="wait">
                  {activeTab === "general" && (
                    <motion.div
                      key="general"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="template-name"
                            className="text-sm font-medium text-slate-700"
                          >
                            Template Name
                          </label>
                          <Input
                            id="template-name"
                            ref={inputRef}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter template name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="template-description"
                            className="text-sm font-medium text-slate-700"
                          >
                            Description
                          </label>
                          <textarea
                            id="template-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a short description for your template"
                            className="mt-1 w-full min-h-[80px] rounded-md border border-slate-300 p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "theme" && (
                    <motion.div
                      key="theme"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700">
                            Cover Image
                          </label>
                          <div className="mt-1 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-10 bg-slate-50">
                            <div className="text-center">
                              <ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label className="relative cursor-not-allowed rounded-md bg-transparent font-semibold text-indigo-400">
                                  <span>Upload a file</span>
                                  <input
                                    type="file"
                                    disabled
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs leading-5 text-gray-600">
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700">
                            Theme Color
                          </label>
                          <div className="flex gap-2 mt-2">
                            {THEME_COLORS.map((color) => (
                              <button
                                key={color}
                                disabled
                                className={`w-8 h-8 rounded-full border-2 transition-transform ${themeColor === color ? "border-indigo-600 ring-2 ring-offset-2 ring-indigo-500" : "border-white"}`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer with Actions */}
            <div className="bg-slate-50 px-6 py-4 flex flex-row-reverse gap-3 border-t border-slate-200">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditTemplateModal;
