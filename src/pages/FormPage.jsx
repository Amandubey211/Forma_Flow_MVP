import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useTemplates } from "../context/TemplateContext";
import { useSubmissions } from "../context/SubmissionContext";
import AppLayout from "../components/AppLayout";
import RenderedFormField from "../components/form/RenderedFormField";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";

const FormPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { getTemplateById } = useTemplates();
  const { addSubmission } = useSubmissions();

  // Fetch the template based on the URL parameter
  const template = getTemplateById(templateId);

  // Initialize all methods from react-hook-form
  const methods = useForm();

  /**
   * Handles the form submission process.
   * @param {object} data - The validated form data.
   */
  const onSubmit = (data) => {
    try {
      // Log the data to the console for easy debugging
      console.log("Form Submission Data:", data);

      addSubmission(templateId, data);
      navigate("/dashboard"); // Navigate to dashboard after successful submission
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
      console.error("Submission error:", error);
    }
  };

  // Render a "Not Found" state if the template doesn't exist
  if (!template) {
    return (
      <AppLayout seoProps={{ title: "Form Not Found" }}>
        <div className="flex h-screen items-center justify-center text-center dotted-bg">
          <div className="p-10 bg-white rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold text-slate-900">
              Form Not Found
            </h1>
            <p className="text-slate-500 mt-2">
              The form you are looking for does not exist or has been deleted.
            </p>
            <Button onClick={() => navigate("/dashboard")} className="mt-6">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    // The main container for the form page, providing the dotted background
    <div className="min-h-screen w-full dotted-bg flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* 
        FormProvider is crucial. It passes down all the form methods (register, watch, control, etc.)
        via context, allowing deeply nested components like RenderedFormField to access them.
      */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-xl shadow-2xl space-y-8"
        >
          {/* Form Header */}
          <div className="text-center border-b border-slate-200 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {template.name}
            </h1>
            <p className="mt-2 text-slate-500">
              Please fill out the form below.
            </p>
          </div>

          {/* Dynamically Rendered Fields */}
          {template.sections.map((section) => (
            <div key={section.id} className="space-y-6">
              {/* You could optionally render the section title here if needed */}
              {/* <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-4">{section.title}</h2> */}

              {section.fields.map((field) => (
                <RenderedFormField
                  key={field.id}
                  field={field}
                  // Pass down the necessary props from react-hook-form
                  register={methods.register}
                  errors={methods.formState.errors}
                  control={methods.control}
                />
              ))}
            </div>
          ))}

          {/* Form Footer with Submit Button */}
          <div className="pt-6 border-t border-slate-200">
            <Button
              type="submit"
              disabled={methods.formState.isSubmitting}
              className="w-full h-12 text-lg"
            >
              {methods.formState.isSubmitting ? "Submitting..." : "Submit Form"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormPage;
