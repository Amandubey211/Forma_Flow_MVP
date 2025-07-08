import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import SortableField from "./SortableField";

const SectionBuilder = ({ section, onUpdateField, onDeleteField }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {section.fields.length === 0 && (
          <div className="text-center text-medium-text py-8 border-2 border-dashed border-dark-border rounded-md">
            <p>Drag or add a field here to start.</p>
          </div>
        )}
        {section.fields.map((field) => (
          <SortableField
            key={field.id}
            field={field}
            sectionId={section.id}
            onUpdate={onUpdateField}
            onDelete={onDeleteField}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default SectionBuilder;
