import { useState, useEffect } from "react";
import { Eye, Paperclip, UploadCloud } from "lucide-react";
import Modal from "../ui/Modal";
import { Button } from "../ui/Button";

const FileUploadPreview = ({
  field,
  fieldId,
  fileList,
  validationRules,
  register,
}) => {
  const [previewFile, setPreviewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedFile = fileList && fileList[0];

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      // Clean up the object URL when the component unmounts or the file changes
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  const handlePreview = () => {
    if (selectedFile) {
      setPreviewFile(selectedFile);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewFile(null);
  };

  return (
    <>
      <div className="mt-2 flex flex-col justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
        <div className="text-center">
          <UploadCloud
            className="mx-auto h-12 w-12 text-gray-400"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm justify-center leading-6 text-gray-600">
            <label
              htmlFor={fieldId}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>{selectedFile ? "Change file" : "Upload a file"}</span>
              <input
                id={fieldId}
                type="file"
                className="sr-only"
                {...register(field.id, validationRules)}
                accept={field.type === "Image" ? "image/*" : "application/pdf"}
              />
            </label>
            {!selectedFile && <p className="pl-1">or drag and drop</p>}
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PDF, PNG, JPG up to 10MB
          </p>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-3 flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <Paperclip className="h-5 w-5 text-slate-500 flex-shrink-0" />
            <span className="truncate text-sm font-medium text-slate-700">
              {selectedFile.name}
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePreview}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={previewFile?.name || "File Preview"}
      >
        {previewFile?.type.startsWith("image/") && (
          <img
            src={previewUrl}
            alt="File preview"
            className="max-w-full max-h-full mx-auto"
          />
        )}
        {previewFile?.type === "application/pdf" && (
          <iframe
            src={previewUrl}
            className="w-full h-[75vh]"
            title={previewFile.name}
          />
        )}
      </Modal>
    </>
  );
};

export default FileUploadPreview;
