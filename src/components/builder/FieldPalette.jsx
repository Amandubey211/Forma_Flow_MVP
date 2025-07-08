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
  Construction,
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

const PaletteItem = ({ field }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-item-${field.type}`, // This ID is crucial
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

const ComingSoonPlaceholder = ({ featureName }) => (
  <motion.div
    key={featureName}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-col items-center justify-center text-center p-8 mt-10 bg-slate-50 rounded-lg border border-slate-200"
  >
    <Construction className="h-12 w-12 text-slate-400 mb-4" />
    <h3 className="font-semibold text-slate-800">{featureName} Coming Soon!</h3>
    <p className="text-sm text-slate-500 mt-1 max-w-xs">
      This feature is on our roadmap and we're working hard to bring it to you.
    </p>
  </motion.div>
);

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
    <aside className="w-1/3 max-w-sm flex flex-col border-l border-slate-200 bg-white">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-around rounded-md bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab("Field")}
            className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition-all duration-200 ${activeTab === "Field" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:bg-slate-200"}`}
          >
            Field
          </button>
          <button
            onClick={() => setActiveTab("Workflow")}
            className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition-all duration-200 ${activeTab === "Workflow" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:bg-slate-200"}`}
          >
            Workflow
          </button>
          <button
            onClick={() => setActiveTab("Permissions")}
            className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition-all duration-200 ${activeTab === "Permissions" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:bg-slate-200"}`}
          >
            Permissions
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === "Field" && (
            <motion.div
              key="field-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative">
                <Input
                  placeholder="Search element"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-slate-400" />
              </div>
              <div className="mt-6 space-y-6">
                {filteredItems.map((group) => (
                  <div key={group.group}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {group.group}
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {group.fields.map((field) => (
                        <PaletteItem key={field.type} field={field} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === "Workflow" && (
            <ComingSoonPlaceholder
              key="workflow-tab"
              featureName="Workflow Automation"
            />
          )}
          {activeTab === "Permissions" && (
            <ComingSoonPlaceholder
              key="permissions-tab"
              featureName="Field Permissions"
            />
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default FieldPalette;
