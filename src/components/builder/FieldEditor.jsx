import { useState } from "react";
import { Trash2, Edit, Check, X } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { FIELD_TYPES } from "../../lib/constants";

const FieldEditor = ({ field, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState(field);

  const handleUpdate = () => {
    onUpdate(field.id, editedField);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedField(field);
    setIsEditing(false);
  };

  const renderPreview = () => (
    <div className="p-4 bg-dark-card/50 rounded-md border border-dark-border flex justify-between items-center">
      <div>
        <p className="font-semibold">{field.label}</p>
        <p className="text-sm text-medium-text">
          {field.type}
          {field.config.required && (
            <span className="text-red-400 ml-2">*Required</span>
          )}
        </p>
      </div>
      <div>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );

  const renderEditor = () => (
    <Card className="bg-dark-card/80">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Label</label>
          <Input
            value={editedField.label}
            onChange={(e) =>
              setEditedField({ ...editedField, label: e.target.value })
            }
          />
        </div>
        {/* Type-specific config */}
        {editedField.type === FIELD_TYPES.ENUM && (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Options (comma-separated)
            </label>
            <Input
              value={editedField.config.options.join(", ")}
              onChange={(e) =>
                setEditedField({
                  ...editedField,
                  config: {
                    ...editedField.config,
                    options: e.target.value.split(",").map((s) => s.trim()),
                  },
                })
              }
            />
          </div>
        )}
        {editedField.type === FIELD_TYPES.LABEL && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Style</label>
            <select
              value={editedField.config.level}
              onChange={(e) =>
                setEditedField({
                  ...editedField,
                  config: { ...editedField.config, level: e.target.value },
                })
              }
              className="w-full h-10 rounded-md border border-dark-border bg-transparent px-3 py-2"
            >
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
            </select>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`required-${field.id}`}
            checked={editedField.config.required}
            onChange={(e) =>
              setEditedField({
                ...editedField,
                config: { ...editedField.config, required: e.target.checked },
              })
            }
            className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
          />
          <label htmlFor={`required-${field.id}`}>Required</label>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
          <Button onClick={handleUpdate}>
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return isEditing ? renderEditor() : renderPreview();
};

export default FieldEditor;
