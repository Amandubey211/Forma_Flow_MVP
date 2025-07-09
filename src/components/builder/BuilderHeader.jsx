import {
  ArrowLeft,
  ChevronDown,
  Eye,
  Upload,
  CheckCircle,
  Loader2,
  Save,
} from "lucide-react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

const AutoSaveIndicator = ({ status }) => {
  const messages = {
    saved: {
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      text: "All changes saved",
    },
    saving: {
      icon: <Loader2 className="h-4 w-4 animate-spin text-slate-500" />,
      text: "Saving...",
    },
    dirty: {
      icon: <Save className="h-4 w-4 text-slate-500" />,
      text: "Unsaved changes",
    }, // Using Save icon for dirty state
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 text-sm text-slate-500"
      >
        {messages[status].icon}
        <span>{messages[status].text}</span>
      </motion.div>
    </AnimatePresence>
  );
};

const BuilderHeader = ({ templateId, templateName, onSave, saveStatus }) => {
  const navigate = useNavigate();

  const handleShareClick = () => {
    try {
      navigator.clipboard.writeText(
        `${window.location.origin}/form/${templateId}`
      );
      toast.success("Public form link copied to clipboard!");
    } catch (error) {
      toast.error("Could not copy link to clipboard.");
      console.error("Clipboard copy failed:", error);
    }
  };

  // --- THIS IS THE CHANGE ---
  // Uses React Router's navigate function for a seamless, in-app transition without a page reload.
  // This is the standard way to navigate within an SPA.
  // Note: For direct URL access or page reloads on the preview route to work in production (e.g., on Vercel),
  // you will need to configure server-side rewrites to point all paths to your index.html.
  const handlePreviewClick = () => {
    navigate(`/form/${templateId}`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-lg sm:px-6">
      <div className="flex items-center gap-2">
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
          {/* Workspace info can be hidden on smaller screens if needed */}
          <span className="hidden sm:inline text-sm text-slate-500">
            My workspace /
          </span>
          <button className="flex items-center gap-1 text-sm font-medium text-slate-800">
            {templateName}
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Auto-save indicator remains centered */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <AutoSaveIndicator status={saveStatus} />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={handlePreviewClick}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <motion.button
          onClick={handleShareClick}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 bg-slate-900 text-slate-50 hover:bg-slate-900/90 transition-colors"
        >
          <Upload className="mr-2 h-4 w-4" />
          Share
        </motion.button>
        <Button size="sm" onClick={onSave}>
          Save & Close
        </Button>
      </div>
    </header>
  );
};

export default BuilderHeader;
