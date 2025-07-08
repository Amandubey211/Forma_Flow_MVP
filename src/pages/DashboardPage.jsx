import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { FilePlus2, Eye, Trash2, Edit, Inbox } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/Input";
import { useTemplates } from "../context/TemplateContext";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import EditTemplateModal from "../components/ui/EditTemplateModal";
import { motion, AnimatePresence } from "framer-motion";

const DashboardPage = () => {
  // 1. We no longer need `updateTemplateName`
  const { templates, addTemplate, deleteTemplate, updateTemplate } =
    useTemplates();
  const navigate = useNavigate();

  const [newTemplateName, setNewTemplateName] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const handleCreateTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error("Template name cannot be empty.");
      return;
    }
    if (templates.length >= 5) {
      toast.error("You have reached the maximum of 5 templates.");
      return;
    }
    const newTemplate = {
      id: uuidv4(),
      name: newTemplateName,
      sections: [{ id: uuidv4(), title: "Form Fields", fields: [] }],
    };
    addTemplate(newTemplate);
    setNewTemplateName("");
    navigate(`/builder/${newTemplate.id}`);
  };

  const openDeleteModal = (template) => {
    setSelectedTemplate(template);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (template) => {
    setSelectedTemplate(template);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTemplate) {
      deleteTemplate(selectedTemplate.id);
    }
    setIsDeleteModalOpen(false);
    setSelectedTemplate(null);
  };

  // 2. This function now correctly calls the robust `updateTemplate`
  const handleConfirmEdit = (updatedSettings) => {
    if (selectedTemplate) {
      updateTemplate(selectedTemplate.id, updatedSettings);
      toast.success("Template settings updated!");
    }
    setIsEditModalOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Template Dashboard
              </h1>
              <p className="text-slate-500 mt-1">
                Create, edit, and manage your form templates.
              </p>
            </div>
            <AnimatePresence>
              {templates.length < 5 && (
                <motion.div
                  className="flex gap-2 w-full sm:w-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="text"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="New Template Name"
                    className="bg-white w-full sm:w-auto"
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleCreateTemplate()
                    }
                  />
                  <Button
                    onClick={handleCreateTemplate}
                    className="flex-shrink-0"
                  >
                    <FilePlus2 className="mr-2 h-4 w-4" /> Create
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {templates.length === 0 && (
            <motion.div
              className="text-center py-16 border-2 border-dashed border-slate-300 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Inbox className="mx-auto h-12 w-12 text-slate-400" />
              <h2 className="mt-4 text-xl font-semibold text-slate-800">
                No templates yet!
              </h2>
              <p className="text-slate-500 mt-2">
                Start by creating your first template above.
              </p>
            </motion.div>
          )}

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {templates.map((template) => (
              <motion.div
                key={template.id}
                variants={itemVariants}
                className="group relative"
              >
                <motion.div
                  className="absolute top-3 right-3 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/50 backdrop-blur-sm hover:bg-white"
                    title="Edit Settings"
                    onClick={() => openEditModal(template)}
                  >
                    <Edit className="h-4 w-4 text-slate-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/50 backdrop-blur-sm hover:bg-white"
                    title="Delete Template"
                    onClick={() => openDeleteModal(template)}
                  >
                    <Trash2 className="h-4 w-4 text-slate-600 hover:text-red-500" />
                  </Button>
                </motion.div>

                <Card
                  className="flex flex-col h-full"
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.07)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>
                      {template.sections.length} section(s),{" "}
                      {template.sections.reduce(
                        (acc, s) => acc + s.fields.length,
                        0
                      )}{" "}
                      field(s)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow" />
                  <CardFooter className="flex justify-between gap-2">
                    <Link to={`/form/${template.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" /> Preview & Fill
                      </Button>
                    </Link>
                    <Link to={`/builder/${template.id}`}>
                      <Button size="sm" className="flex items-center gap-2">
                        <Edit className="h-4 w-4" /> Builder
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Template"
        message={`Are you sure you want to permanently delete the "${selectedTemplate?.name}" template? This action cannot be undone.`}
      />
      <EditTemplateModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleConfirmEdit}
        template={selectedTemplate}
      />
    </>
  );
};

export default DashboardPage;
