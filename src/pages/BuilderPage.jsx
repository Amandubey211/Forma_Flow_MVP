import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../components/ui/Button";
import BuilderSidebar from "../components/builder/BuilderSidebar";
import SectionBuilder from "../components/builder/SectionBuilder";
import { ArrowLeft, Save, Eye, Home } from "lucide-react";
import { useTemplates } from "../context/TemplateContext";

const BuilderPage = () => {
  const { templateId } = useParams();
  const { getTemplateById, updateTemplate } = useTemplates();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const fetchedTemplate = getTemplateById(templateId);
    if (fetchedTemplate) {
      setTemplate(fetchedTemplate);
    } else {
      toast.error("Template not found!");
      navigate("/dashboard");
    }
  }, [templateId, getTemplateById, navigate]);

  const updateField = (sectionId, fieldId, newFieldData) => {
    setTemplate((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId ? newFieldData : field
              ),
            }
          : section
      ),
    }));
    setIsDirty(true);
  };

  const addField = (sectionId, fieldType) => {
    const newField = {
      id: uuidv4(),
      type: fieldType,
      label: `New ${fieldType}`,
      config: { required: false },
    };
    if (fieldType === "Enum")
      newField.config.options = ["Option 1", "Option 2"];
    if (fieldType === "Label") newField.config.level = "h2";

    setTemplate((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, fields: [...section.fields, newField] }
          : section
      ),
    }));
    setIsDirty(true);
  };

  const deleteField = (sectionId, fieldId) => {
    setTemplate((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter((field) => field.id !== fieldId),
            }
          : section
      ),
    }));
    setIsDirty(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeSectionId = active.data.current.sortable.containerId;
      const overSectionId = over.data.current.sortable.containerId;

      if (activeSectionId !== overSectionId) {
        toast.error("You can only move fields within the same section.");
        return;
      }

      setTemplate((prev) => {
        const sectionIndex = prev.sections.findIndex(
          (s) => s.id === activeSectionId
        );
        if (sectionIndex === -1) return prev;

        const oldIndex = prev.sections[sectionIndex].fields.findIndex(
          (f) => f.id === active.id
        );
        const newIndex = prev.sections[sectionIndex].fields.findIndex(
          (f) => f.id === over.id
        );

        const newSections = [...prev.sections];
        newSections[sectionIndex] = {
          ...newSections[sectionIndex],
          fields: arrayMove(
            newSections[sectionIndex].fields,
            oldIndex,
            newIndex
          ),
        };

        return { ...prev, sections: newSections };
      });
      setIsDirty(true);
    }
  };

  const handleSave = () => {
    updateTemplate(template);
    setIsDirty(false);
  };

  if (!template)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-dark-bg font-sans">
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between p-4 bg-dark-card border-b border-dark-border flex-shrink-0">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-light-text">
                {template.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/form/${template.id}`} target="_blank">
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </Link>
              <Button onClick={handleSave} disabled={!isDirty}>
                <Save className="mr-2 h-4 w-4" />
                Save{" "}
                {isDirty && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                )}
              </Button>
            </div>
          </header>

          {/* Builder Canvas */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {template.sections.map((section) => (
                <SortableContext
                  key={section.id}
                  items={section.fields.map((f) => f.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <SectionBuilder
                    section={section}
                    onUpdateField={updateField}
                    onDeleteField={deleteField}
                  />
                </SortableContext>
              ))}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <BuilderSidebar
          onAddField={(fieldType) =>
            addField(template.sections[0].id, fieldType)
          }
        />
      </div>
    </DndContext>
  );
};

export default BuilderPage;
