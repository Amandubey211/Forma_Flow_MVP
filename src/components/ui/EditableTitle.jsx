import { useState, useEffect, useRef } from "react";
import { Edit } from "lucide-react";
import { motion } from "framer-motion";

/**
 * A component that displays a title, which becomes an editable input field on click.
 *
 * @param {object} props
 * @param {string} props.initialTitle - The initial text to display.
 * @param {(newTitle: string) => void} props.onSave - The callback function to execute when saving the new title.
 */
export const EditableTitle = ({ initialTitle, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef(null);

  // Effect to automatically focus the input when editing mode is enabled.
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select(); // Select the text for easy replacement
    }
  }, [isEditing]);

  /**
   * Saves the new title if it has changed and is not empty.
   * Then, it exits editing mode.
   */
  const handleSave = () => {
    if (title.trim() && title !== initialTitle) {
      onSave(title);
    } else {
      // If the title is empty or unchanged, revert to the initial title
      setTitle(initialTitle);
    }
    setIsEditing(false);
  };

  /**
   * Handles keyboard events for a better user experience.
   * 'Enter' saves the changes, and 'Escape' cancels them.
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setTitle(initialTitle); // Revert changes
      setIsEditing(false);
    }
  };

  // Render the input field when in editing mode
  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleSave} // Save when the input loses focus
        onKeyDown={handleKeyDown}
        className="w-full text-lg font-semibold leading-none tracking-tight bg-slate-100 rounded-md p-1 -m-1 outline-none ring-2 ring-indigo-500"
      />
    );
  }

  // Render the display title when not editing
  return (
    <div
      className="group relative cursor-pointer p-1 -m-1 rounded-md hover:bg-slate-100/50"
      onClick={() => setIsEditing(true)}
      title="Click to edit name"
    >
      <h3 className="text-lg font-semibold leading-none tracking-tight text-slate-900">
        {initialTitle}
      </h3>
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Edit className="h-4 w-4 text-slate-400" />
      </motion.div>
    </div>
  );
};
