import { Button } from '../ui/Button';
import { Type, Pilcrow, Hash, ToggleRight, ChevronDown } from 'lucide-react';
import { FIELD_TYPES } from '../../lib/constants';

const fieldOptions = [
  { type: FIELD_TYPES.LABEL, icon: <Type size={20} />, name: "Label" },
  { type: FIELD_TYPES.TEXT, icon: <Pilcrow size={20} />, name: "Text Input" },
  { type: FIELD_TYPES.NUMBER, icon: <Hash size={20} />, name: "Number Input" },
  { type: FIELD_TYPES.BOOLEAN, icon: <ToggleRight size={20} />, name: "Boolean (Toggle)" },
  { type: FIELD_TYPES.ENUM, icon: <ChevronDown size={20} />, name: "Dropdown (Enum)" },
];

const BuilderSidebar = ({ onAddField }) => {
  return (
    <aside className="w-72 bg-dark-card border-l border-dark-border p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-light-text">Elements</h2>
      <div className="grid grid-cols-2 gap-2">
        {fieldOptions.map(opt => (
          <Button
            key={opt.type}
            variant="outline"
            className="flex flex-col items-center justify-center h-24 text-center"
            onClick={() => onAddField(opt.type)}
          >
            {opt.icon}
            <span className="mt-2 text-xs">{opt.name}</span>
          </Button>
        ))}
      </div>
      {/* We could add Workflow and Permissions tabs here later */}
    </aside>
  );
};

export default BuilderSidebar;