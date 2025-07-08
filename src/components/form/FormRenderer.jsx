import { Input } from "../ui/Input";
import { FIELD_TYPES } from "../../lib/constants";

const FormRenderer = ({ section, register, errors }) => {
  const renderField = (field) => {
    const { id, type, label, config } = field;
    const validationRules = {
      required: config.required ? `${label} is required` : false,
    };

    switch (type) {
      case FIELD_TYPES.LABEL:
        const Tag = config.level || "h2";
        const classNames = {
          h1: "text-3xl font-bold mt-4 mb-2",
          h2: "text-2xl font-semibold mt-3 mb-1",
          h3: "text-xl font-medium mt-2 mb-1",
        };
        return <Tag className={classNames[Tag]}>{label}</Tag>;

      case FIELD_TYPES.TEXT:
        return (
          <div>
            <label htmlFor={id} className="block text-sm font-medium mb-1">
              {label} {config.required && "*"}
            </label>
            <Input
              id={id}
              {...register(id, validationRules)}
              placeholder={config.placeholder}
            />
            {errors[id] && (
              <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>
            )}
          </div>
        );

      case FIELD_TYPES.NUMBER:
        return (
          <div>
            <label htmlFor={id} className="block text-sm font-medium mb-1">
              {label} {config.required && "*"}
            </label>
            <Input
              id={id}
              type="number"
              {...register(id, { ...validationRules, valueAsNumber: true })}
              placeholder={config.placeholder}
            />
            {errors[id] && (
              <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>
            )}
          </div>
        );

      case FIELD_TYPES.ENUM:
        return (
          <div>
            <label htmlFor={id} className="block text-sm font-medium mb-1">
              {label} {config.required && "*"}
            </label>
            <select
              id={id}
              {...register(id, validationRules)}
              className="w-full h-10 rounded-md border border-dark-border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              {config.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors[id] && (
              <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>
            )}
          </div>
        );

      case FIELD_TYPES.BOOLEAN:
        return (
          <div className="flex items-center gap-x-3">
            <input
              id={id}
              type="checkbox"
              {...register(id)}
              className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
            />
            <label htmlFor={id} className="block text-sm font-medium">
              {label}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {section.fields.map((field) => (
        <div key={field.id}>{renderField(field)}</div>
      ))}
    </div>
  );
};

export default FormRenderer;
