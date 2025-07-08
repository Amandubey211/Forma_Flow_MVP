import { motion } from "framer-motion";
import { FileText, Trash2, Plus, X, Copy } from "lucide-react";
import { FIELD_TYPES } from "../../lib/constants";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { ToggleSwitch } from "../ui/ToggleSwitch";

const ActiveFieldEditor = ({
  field,
  onUpdateField,
  onDeleteField,
  onDuplicateField,
  onDone,
}) => {
  const handleConfigChange = (configKey, value) => {
    onUpdateField(field.id, {
      ...field,
      config: { ...field.config, [configKey]: value },
    });
  };

  const handleLabelChange = (e) => {
    onUpdateField(field.id, { ...field, label: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...(field.config.options || [])];
    newOptions[index] = value;
    handleConfigChange("options", newOptions);
  };

  const addOption = () => {
    const newOptions = [...(field.config.options || []), "New Option"];
    handleConfigChange("options", newOptions);
  };

  const removeOption = (index) => {
    const newOptions = (field.config.options || []).filter(
      (_, i) => i !== index
    );
    handleConfigChange("options", newOptions);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="w-full overflow-hidden"
    >
      <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-500" />
            <span className="font-semibold text-slate-800">{field.type}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">
              Make as required
            </span>
            <ToggleSwitch
              enabled={!!field.config.required}
              setEnabled={(val) => handleConfigChange("required", val)}
            />
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 py-5">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Label
            </label>
            <Input
              value={field.label}
              onChange={handleLabelChange}
              className="mt-1.5 bg-white"
              placeholder="Add field label"
            />
          </div>

          {/* --- THIS IS THE FIX --- */}
          {/* This input was missing. It correctly binds to field.config.placeholder */}
          {(field.type === FIELD_TYPES.TEXT ||
            field.type === FIELD_TYPES.PARAGRAPH ||
            field.type === FIELD_TYPES.DROPDOWN ||
            field.type === FIELD_TYPES.RADIO) && (
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Help text
              </label>
              <Input
                value={field.config.placeholder || ""}
                onChange={(e) =>
                  handleConfigChange("placeholder", e.target.value)
                }
                className="mt-1.5 bg-white"
                placeholder="Add help text for the user"
              />
            </div>
          )}
          {/* --- END OF FIX --- */}

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Field type
            </label>
            <Select
              onValueChange={(val) =>
                onUpdateField(field.id, { ...field, type: val })
              }
              value={field.type}
            >
              <SelectTrigger className="mt-1.5 bg-white">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(FIELD_TYPES).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(field.type === FIELD_TYPES.DROPDOWN ||
            field.type === FIELD_TYPES.RADIO) && (
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Options
              </label>
              <div className="mt-2 space-y-2">
                {(field.config.options || []).map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="bg-white"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 flex-shrink-0"
                      onClick={() => removeOption(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-white"
                onClick={addOption}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Option
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">
              Only show field when conditions are met
            </label>
            <ToggleSwitch enabled={false} setEnabled={() => {}} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDuplicateField(field.id)}
              title="Duplicate field"
            >
              <Copy className="h-5 w-5 text-slate-500 hover:text-indigo-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteField(field.id)}
              title="Delete field"
            >
              <Trash2 className="h-5 w-5 text-slate-500 hover:text-red-500" />
            </Button>
          </div>
          <Button onClick={onDone}>Done</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveFieldEditor;
