import { ArrowLeft, ChevronDown, Eye, Save } from "lucide-react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const BuilderHeader = ({ templateName, onSave }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="h-6 w-px bg-slate-200" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">My workspace</span>
          <span className="text-sm text-slate-400">/</span>
          <button className="flex items-center gap-1 text-sm font-medium text-slate-800">
            {templateName}
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Save className="mr-2 h-4 w-4" />
          Save draft
        </Button>
        <Button variant="secondary" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button size="sm" onClick={onSave}>
          Save
        </Button>
      </div>
    </header>
  );
};

export default BuilderHeader;
