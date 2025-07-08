import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import {
  Grip,
  Type,
  AlignLeft,
  CheckSquare,
  CircleDot,
  ToggleRight,
  UploadCloud,
  Image as ImageIcon,
  Heading1,
} from "lucide-react";
import { Input } from "../ui/Input";
import { FIELD_TYPES } from "../../lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

const EditableField = ({ field, onClick, isActive }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
    data: { isSortable: true, label: field.label },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  /**
   * Renders a high-fidelity, disabled preview of the actual form element.
   * This provides a much better UX than a generic input box.
   */
  const renderFieldPreview = () => {
    switch (field.type) {
      case FIELD_TYPES.LABEL:
        const Tag = field.config.level || "h3";
        return (
          <Tag className="font-bold text-slate-800 leading-tight">
            {field.label}
          </Tag>
        );

      case FIELD_TYPES.TEXT:
        return (
          <Input
            disabled
            placeholder={field.config.placeholder || "User input..."}
          />
        );

      case FIELD_TYPES.PARAGRAPH:
        return (
          <textarea
            disabled
            placeholder={field.config.placeholder || "User long text input..."}
            className="flex w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
          />
        );

      case FIELD_TYPES.DROPDOWN:
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {(field.config.options || []).map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case FIELD_TYPES.RADIO:
        return (
          <div className="space-y-2">
            {(field.config.options || ["Option 1", "Option 2"])
              .slice(0, 3)
              .map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    disabled
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label className="text-sm text-slate-700">{option}</label>
                </div>
              ))}
          </div>
        );

      case FIELD_TYPES.CHECKBOX:
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              disabled
              className="h-4 w-4 rounded text-indigo-600 border-gray-300"
            />
            <label className="font-medium text-slate-800">{field.label}</label>
          </div>
        );

      case FIELD_TYPES.UPLOAD:
      case FIELD_TYPES.IMAGE:
        return (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
            {field.type === FIELD_TYPES.UPLOAD ? (
              <UploadCloud />
            ) : (
              <ImageIcon />
            )}
            <span className="text-sm font-medium">{field.label}</span>
          </div>
        );

      default:
        return <Input disabled placeholder="Undefined field type" />;
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layoutId={`field-container-${field.id}`}
      onClick={onClick}
      className={`relative w-full cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md ${isActive ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-200 hover:border-slate-300"}`}
    >
      <div className="flex w-full items-start gap-4">
        {/* Drag Handle */}
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab touch-none p-1.5 pt-2 text-slate-400"
        >
          <Grip className="h-5 w-5" />
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          {/* Label is rendered outside for most types, but inside for Checkbox and Label types */}
          {field.type !== FIELD_TYPES.CHECKBOX &&
            field.type !== FIELD_TYPES.LABEL && (
              <label className="block mb-2 font-medium text-slate-800">
                {field.label}
              </label>
            )}
          {renderFieldPreview()}
        </div>
      </div>
    </motion.div>
  );
};

export default EditableField;
