import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldEditor from "./FieldEditor";
import { GripVertical } from "lucide-react";

const SortableField = ({ field, sectionId, onUpdate, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-2">
      <button
        {...attributes}
        {...listeners}
        className="p-2 mt-2 cursor-grab touch-none"
      >
        <GripVertical className="text-medium-text" />
      </button>
      <div className="flex-1">
        <FieldEditor
          field={field}
          onUpdate={(...args) => onUpdate(sectionId, ...args)}
          onDelete={() => onDelete(sectionId, field.id)}
        />
      </div>
    </div>
  );
};

export default SortableField;
