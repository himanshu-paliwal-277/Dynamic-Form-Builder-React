import Field from "./Field";
import store from "../state/store";

function FormPreview() {
  const {fields} = store();
  return (
    <>
        <h1>Form Preview</h1>
      <div className="form-preview">
        {fields?.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            <Field field={field} />
          </div>
        ))}
      </div>
    </>
  );
}

export default FormPreview;
