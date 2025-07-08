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
import { FilePlus2, Eye, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/Input";
import { useTemplates } from "../context/TemplateContext";

const DashboardPage = () => {
  const { templates, addTemplate, deleteTemplate } = useTemplates();
  const [newTemplateName, setNewTemplateName] = useState("");
  const navigate = useNavigate();

  const handleCreateTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error("Template name cannot be empty.");
      return;
    }
    const newTemplate = {
      id: uuidv4(),
      name: newTemplateName,
      sections: [{ id: uuidv4(), title: "Untitled Section", fields: [] }],
    };
    addTemplate(newTemplate);
    setNewTemplateName("");
    navigate(`/builder/${newTemplate.id}`);
  };

  return (
    <div className="min-h-screen bg-dark-bg p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-light-text">
              Template Dashboard
            </h1>
            <p className="text-medium-text mt-1">
              Create, edit, and manage your form templates.
            </p>
          </div>
          {templates.length < 5 && (
            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                type="text"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="New Template Name"
                className="bg-dark-card w-full sm:w-auto"
                onKeyDown={(e) => e.key === "Enter" && handleCreateTemplate()}
              />
              <Button onClick={handleCreateTemplate} className="flex-shrink-0">
                <FilePlus2 className="mr-2 h-4 w-4" /> Create
              </Button>
            </div>
          )}
        </header>

        {templates.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-dark-border rounded-lg">
            <h2 className="text-xl font-semibold text-light-text">
              No templates yet!
            </h2>
            <p className="text-medium-text mt-2">
              Start by creating your first template above.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
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
              <CardContent className="flex-grow">
                {/* Could add a preview of sections/fields here */}
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Link to={`/form/${template.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" /> Preview
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTemplate(template.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <Link to={`/builder/${template.id}`}>
                    <Button size="sm" className="flex items-center gap-2">
                      <Edit className="h-4 w-4" /> Edit
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
