import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { FIELD_TYPES } from "../../lib/constants";
import FileUploadPreview from "./FileUploadPreview";

const RenderedFormField = ({ field }) => {
  const { id, type, label, config } = field;
  const { required, placeholder, options, level } = config;
  const fieldId = `form-field-${id}`;

  // useFormContext provides access to all form methods without prop drilling
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  // 'watch' is used to get the real-time value of the file input
  const fileList = watch(id);

  const validationRules = {
    required: required ? "This field is required" : false,
  };

  // Helper function to render the field label, including the red asterisk for required fields
  const renderLabel = () => (
    <label
      htmlFor={fieldId}
      className="block mb-2 text-base font-medium text-slate-800"
    >
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );

  switch (type) {
    case FIELD_TYPES.LABEL:
      const Tag = level || "h3";
      return <Tag className="font-bold text-slate-900 mt-6 mb-2">{label}</Tag>;

    case FIELD_TYPES.TEXT:
      return (
        <div>
          {renderLabel()}
          <Input
            id={fieldId}
            {...register(id, validationRules)}
            placeholder={placeholder}
          />
          {errors[id] && (
            <p className="mt-1 text-sm text-red-500">{errors[id].message}</p>
          )}
        </div>
      );

    case FIELD_TYPES.PARAGRAPH:
      return (
        <div>
          {renderLabel()}
          <textarea
            id={fieldId}
            {...register(id, validationRules)}
            placeholder={placeholder}
            className="flex w-full min-h-[100px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          />
          {errors[id] && (
            <p className="mt-1 text-sm text-red-500">{errors[id].message}</p>
          )}
        </div>
      );

    case FIELD_TYPES.DROPDOWN:
      return (
        <div>
          {renderLabel()}
          <Controller
            name={id}
            control={control}
            rules={validationRules}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger id={fieldId}>
                  <SelectValue
                    placeholder={placeholder || "Select an option"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {(options || []).map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors[id] && (
            <p className="mt-1 text-sm text-red-500">{errors[id].message}</p>
          )}
        </div>
      );

    case FIELD_TYPES.RADIO:
      return (
        <div>
          {renderLabel()}
          <div className="mt-2 space-y-3">
            {(options || []).map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  id={`${fieldId}-${index}`}
                  type="radio"
                  value={option}
                  {...register(id, validationRules)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`${fieldId}-${index}`}
                  className="text-sm font-medium text-slate-700"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors[id] && (
            <p className="mt-1 text-sm text-red-500">{errors[id].message}</p>
          )}
        </div>
      );

    case FIELD_TYPES.CHECKBOX: // "Yes / No" type
      return (
        <div className="flex items-center gap-3 p-3 rounded-md border border-transparent transition-colors hover:bg-slate-50 hover:border-slate-200">
          <input
            id={fieldId}
            type="checkbox"
            {...register(id, validationRules)}
            className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          <label
            htmlFor={fieldId}
            className="text-base font-medium text-slate-800 cursor-pointer"
          >
            {label}
          </label>
        </div>
      );

    case FIELD_TYPES.UPLOAD:
    case FIELD_TYPES.IMAGE:
      return (
        <div>
          {renderLabel()}
          <FileUploadPreview
            field={field}
            fieldId={fieldId}
            fileList={fileList}
            register={register}
            validationRules={validationRules}
          />
          {errors[id] && (
            <p className="mt-1 text-sm text-red-500">{errors[id].message}</p>
          )}
        </div>
      );

    default:
      return (
        <div className="p-3 bg-red-100 text-red-800 border border-red-200 rounded-md text-sm font-medium">
          <strong>Warning:</strong> Unsupported field type detected: "{type}".
          Please check your template configuration.
        </div>
      );
  }
};

export default RenderedFormField;
