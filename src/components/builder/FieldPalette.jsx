import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type,
  AlignLeft,
  Search,
  Heading1,
  CheckSquare,
  CircleDot,
  UploadCloud,
  Image as ImageIcon,
  ToggleRight,
} from "lucide-react";
import { FIELD_TYPES } from "../../lib/constants";
import { Input } from "../ui/Input";

const PALETTE_ITEMS = [
  {
    group: "Text Elements",
    fields: [
      { type: FIELD_TYPES.LABEL, icon: <Heading1 size={24} />, name: "Label" },
      {
        type: FIELD_TYPES.TEXT,
        icon: <Type size={24} />,
        name: "Short Answer",
      },
      {
        type: FIELD_TYPES.PARAGRAPH,
        icon: <AlignLeft size={24} />,
        name: "Paragraph",
      },
    ],
  },
  {
    group: "Multiple Choice",
    fields: [
      {
        type: FIELD_TYPES.DROPDOWN,
        icon: <CheckSquare size={24} />,
        name: "Dropdown",
      },
      { type: FIELD_TYPES.RADIO, icon: <CircleDot size={24} />, name: "Radio" },
      {
        type: FIELD_TYPES.CHECKBOX,
        icon: <ToggleRight size={24} />,
        name: "Yes / No",
      },
    ],
  },
  {
    group: "Media Element",
    fields: [
      {
        type: FIELD_TYPES.UPLOAD,
        icon: <UploadCloud size={24} />,
        name: "Upload",
      },
      { type: FIELD_TYPES.IMAGE, icon: <ImageIcon size={24} />, name: "Image" },
    ],
  },
];

// A dedicated component for each draggable item in the palette
const PaletteItem = ({ field }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-item-${field.type}`,
    data: { type: field.type, isPaletteItem: true },
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      whileTap={{ scale: 0.95 }}
      className="flex cursor-grab flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:border-slate-300"
    >
      {field.icon}
      <span>{field.name}</span>
    </motion.div>
  );
};

const FieldPalette = () => {
  const [activeTab, setActiveTab] = useState("Field");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = PALETTE_ITEMS.map((group) => ({
    ...group,
    fields: group.fields.filter((field) =>
      field.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((group) => group.fields.length > 0);

  return (
    <aside className="w-1/3 max-w-sm flex-shrink-0 border-l border-slate-200 bg-white p-6">
      <div className="flex items-center justify-around rounded-md bg-slate-100 p-1">
        <button
          onClick={() => setActiveTab("Field")}
          className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition-all duration-200 ${activeTab === "Field" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
        >
          Field
        </button>
        <button
          onClick={() => setActiveTab("Workflow")}
          className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition-all duration-200 ${activeTab === "Workflow" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
        >
          Workflow
        </button>
        <button
          onClick={() => setActiveTab("Permissions")}
          className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition-all duration-200 ${activeTab === "Permissions" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
        >
          Permissions
        </button>
      </div>

      <div className="relative mt-6">
        <Input
          placeholder="Search element"
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-slate-400" />
      </div>

      <div className="mt-6 space-y-6">
        <AnimatePresence>
          {filteredItems.map((group) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {group.group}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {group.fields.map((field) => (
                  <PaletteItem key={field.type} field={field} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default FieldPalette;
