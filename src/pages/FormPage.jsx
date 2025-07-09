import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useTemplates } from "../context/TemplateContext";
import { useSubmissions } from "../context/SubmissionContext";
import RenderedFormField from "../components/form/RenderedFormField";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";
import ProfileCard from "../components/form/ProfileCard";
import { ArrowLeft } from "lucide-react"; // 1. Import ArrowLeft icon

const FormPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { getTemplateById } = useTemplates();
  const { addSubmission } = useSubmissions();
  const template = getTemplateById(templateId);
  const methods = useForm();

  const onSubmit = (data) => {
    try {
      console.log("Form Submission Data:", data);
      addSubmission(templateId, data);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
      console.error("Submission error:", error);
    }
  };

  if (!template) {
    return (
      <div className="flex h-screen items-center justify-center text-center dotted-bg">
        <div className="p-10 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-slate-900">Form Not Found</h1>
          <p className="text-slate-500 mt-2">
            The form you are looking for does not exist or has been deleted.
          </p>
          <Button onClick={() => navigate("/dashboard")} className="mt-6">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full dotted-bg flex items-center justify-center p-4 lg:p-8">
      {/* 2. Add the floating "Back" button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {/* Left Column: The Form */}
        <div className="lg:col-span-2">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full bg-white p-8 sm:p-10 rounded-2xl shadow-2xl space-y-8"
            >
              <div className="text-center border-b border-slate-200 pb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  {template.name}
                </h1>
                <p className="mt-2 text-slate-500">
                  Please fill out the form below.
                </p>
              </div>

              {template.sections.map((section) => (
                <div key={section.id} className="space-y-6">
                  {section.fields.map((field) => (
                    <RenderedFormField key={field.id} field={field} />
                  ))}
                </div>
              ))}

              <div className="pt-6 border-t border-slate-200">
                <Button
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                  className="w-full h-12 text-lg"
                >
                  {methods.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit Form"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Right Column: The Profile Card */}
        <div className="w-full lg:sticky lg:top-8">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default FormPage;
