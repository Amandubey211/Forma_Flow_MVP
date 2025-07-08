import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SelectContext = createContext();

const Select = ({ children, value, onValueChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !select_current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    if (disabled) return;
    if (onValueChange) {
      onValueChange(val);
    }
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedValue: value,
        handleSelect,
        disabled,
      }}
    >
      <div className="relative" ref={selectRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ children, className }) => {
  const { isOpen, setIsOpen, disabled } = useContext(SelectContext);
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setIsOpen(!isOpen)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      <ChevronDown
        className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
};

const SelectValue = ({ placeholder }) => {
  const { selectedValue } = useContext(SelectContext);
  const hasValue =
    selectedValue !== null &&
    selectedValue !== undefined &&
    selectedValue !== "";
  return (
    <span className={hasValue ? "text-slate-900" : "text-slate-500"}>
      {selectedValue || placeholder}
    </span>
  );
};

const SelectContent = ({ children, className }) => {
  const { isOpen } = useContext(SelectContext);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          className={`absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg p-1 ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SelectItem = ({ children, value, className }) => {
  const { handleSelect, selectedValue } = useContext(SelectContext);
  const isSelected = selectedValue === value;
  return (
    <div
      onClick={() => handleSelect(value)}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-3 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 ${isSelected ? "font-semibold text-slate-900" : "text-slate-700"} ${className}`}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
