import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import { useTemplates } from "../context/TemplateContext";
import BuilderHeader from "../components/builder/BuilderHeader";
import FieldPalette from "../components/builder/FieldPalette";
import EditableField from "../components/builder/EditableField";
import ActiveFieldEditor from "../components/builder/ActiveFieldEditor";
import { Button } from "../components/ui/Button";
import { FIELD_TYPES } from "../lib/constants";
import { Grip, Plus } from "lucide-react";

// Helper to create new fields
const createNewField = (type) => ({
  id: uuidv4(),
  type,
  label: `New ${type}`,
  config:
    type === FIELD_TYPES.DROPDOWN || type === FIELD_TYPES.RADIO
      ? { required: false, options: ["Option 1"] }
      : { required: false, placeholder: "" },
});

// A dedicated component for the droppable empty area
const DroppableEmptyArea = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: "canvas-droppable-area",
  });
  return (
    <div
      ref={setNodeRef}
      className="mt-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-12 text-center min-h-[150px]"
    >
      {children}
    </div>
  );
};

const BuilderPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { getTemplateById, updateTemplate } = useTemplates();

  const [template, setTemplate] = useState(null);
  const [initialTemplateState, setInitialTemplateState] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [activeFieldId, setActiveFieldId] = useState(null);
  const [activeDragItem, setActiveDragItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const fieldRefs = useRef(new Map());
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const mainSection = template?.sections[0];

  // --- All Logic and Handlers are now correctly inside the component ---

  useEffect(() => {
    const fetchedTemplate = getTemplateById(templateId);
    if (fetchedTemplate) {
      const templateWithSections = {
        ...fetchedTemplate,
        sections:
          fetchedTemplate.sections && fetchedTemplate.sections.length > 0
            ? fetchedTemplate.sections
            : [{ id: uuidv4(), title: "Form Fields", fields: [] }],
      };
      setTemplate(templateWithSections);
      setInitialTemplateState(JSON.parse(JSON.stringify(templateWithSections)));
    } else {
      toast.error("Template not found!");
      navigate("/dashboard");
    }
  }, [templateId, getTemplateById, navigate]);

  useEffect(() => {
    if (template && initialTemplateState) {
      const hasChanged =
        JSON.stringify(template) !== JSON.stringify(initialTemplateState);
      setIsDirty(hasChanged);
    }
  }, [template, initialTemplateState]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (activeFieldId) {
      const node = fieldRefs.current.get(activeFieldId);
      if (node) {
        setTimeout(() => {
          node.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [activeFieldId]);

  const updateField = (fieldId, updatedField) => {
    setTemplate((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => ({
        ...section,
        fields: section.fields.map((f) =>
          f.id === fieldId ? updatedField : f
        ),
      })),
    }));
  };

  const addField = (fieldType, index) => {
    const newField = createNewField(fieldType);
    setTemplate((prev) => {
      const newSections = [...prev.sections];
      const fields = [...newSections[0].fields];
      fields.splice(index, 0, newField);
      newSections[0] = { ...newSections[0], fields };
      return { ...prev, sections: newSections };
    });
    setActiveFieldId(newField.id);
    toast.success(`${fieldType} field added!`);
  };

  const duplicateField = (fieldId) => {
    const fieldToDuplicate = mainSection.fields.find((f) => f.id === fieldId);
    if (fieldToDuplicate) {
      const newField = { ...fieldToDuplicate, id: uuidv4() };
      const index = mainSection.fields.findIndex((f) => f.id === fieldId);
      setTemplate((prev) => {
        const newFields = [...prev.sections[0].fields];
        newFields.splice(index + 1, 0, newField);
        const newSections = [...prev.sections];
        newSections[0] = { ...newSections[0], fields: newFields };
        return { ...prev, sections: newSections };
      });
      setActiveFieldId(newField.id);
      toast.success("Field duplicated!");
    }
  };

  const deleteField = (id) => {
    if (activeFieldId === id) setActiveFieldId(null);
    setTemplate((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => ({
        ...section,
        fields: section.fields.filter((f) => f.id !== id),
      })),
    }));
    toast.success("Field deleted.");
  };

  const onDragStart = (event) => {
    if (activeFieldId) setActiveFieldId(null);
    setActiveDragItem(event.active);
  };

  const onDragEnd = (event) => {
    setActiveDragItem(null);
    const { active, over } = event;
    if (!over) return;
    if (active.data.current?.isPaletteItem) {
      let index = mainSection.fields.length;
      if (over.data.current?.isSortable) {
        index = mainSection.fields.findIndex((f) => f.id === over.id);
      } else if (over.id === "canvas-droppable-area") {
        index = 0;
      }
      addField(active.data.current.type, index);
      return;
    }
    if (active.id !== over.id && over.data.current?.isSortable) {
      const oldIndex = mainSection.fields.findIndex((f) => f.id === active.id);
      const newIndex = mainSection.fields.findIndex((f) => f.id === over.id);
      setTemplate((prev) => {
        const newFields = arrayMove(
          prev.sections[0].fields,
          oldIndex,
          newIndex
        );
        const newSections = [...prev.sections];
        newSections[0] = { ...newSections[0], fields: newFields };
        return { ...prev, sections: newSections };
      });
    }
  };

  const handleSave = () => {
    setActiveFieldId(null);
    setInitialTemplateState(JSON.parse(JSON.stringify(template)));
    setIsDirty(false);
    setTimeout(() => {
      updateTemplate(template);
      // navigate("/dashboard"); // Can be re-enabled if you want to navigate away on save
    }, 100);
  };

  // The loading guard now works correctly
  if (!template || !mainSection)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen w-full flex-col bg-slate-100">
      <BuilderHeader templateName={template.name} onSave={handleSave} />
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={() => setActiveDragItem(null)}
      >
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto dotted-bg">
            <div className="mx-auto max-w-3xl p-8 lg:p-12">
              <SortableContext
                items={mainSection.fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  className="space-y-1 relative"
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {mainSection.fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative"
                      onMouseEnter={() => setHoveredIndex(index)}
                    >
                      <motion.div
                        ref={(node) => {
                          if (node) fieldRefs.current.set(field.id, node);
                          else fieldRefs.current.delete(field.id);
                        }}
                        layout
                      >
                        <EditableField
                          field={field}
                          isActive={activeFieldId === field.id}
                          onClick={() =>
                            setActiveFieldId(
                              activeFieldId === field.id ? null : field.id
                            )
                          }
                        />
                        <AnimatePresence>
                          {activeFieldId === field.id && (
                            <ActiveFieldEditor
                              field={field}
                              onUpdateField={updateField}
                              onDeleteField={() => deleteField(field.id)}
                              onDuplicateField={() => duplicateField(field.id)}
                              onDone={() => setActiveFieldId(null)}
                            />
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <AnimatePresence>
                        {hoveredIndex === index &&
                          activeFieldId !== field.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10"
                            >
                              <button
                                onClick={() =>
                                  addField(FIELD_TYPES.TEXT, index + 1)
                                }
                                className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110"
                              >
                                <Plus size={16} />
                              </button>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </SortableContext>

              {mainSection.fields.length === 0 && (
                <DroppableEmptyArea>
                  <h3 className="text-lg font-medium text-slate-800">
                    Your form is empty!
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Drag elements from the right panel to get started.
                  </p>
                </DroppableEmptyArea>
              )}
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    addField(FIELD_TYPES.TEXT, mainSection.fields.length)
                  }
                  className="w-full max-w-xs h-12 text-base"
                >
                  + Add field
                </Button>
              </div>
            </div>
          </main>
          <FieldPalette />
        </div>
        <DragOverlay dropAnimation={null}>
          {activeDragItem ? (
            <div className="flex w-full cursor-grabbing items-center gap-4 rounded-lg border border-slate-300 bg-white p-4 shadow-xl">
              <div className="p-1.5 text-slate-400">
                <Grip className="h-5 w-5" />
              </div>
              <div className="flex-grow">
                <div className="font-medium text-slate-800">
                  {activeDragItem.data.current?.label ||
                    activeDragItem.data.current?.type ||
                    "New Field"}
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default BuilderPage;
