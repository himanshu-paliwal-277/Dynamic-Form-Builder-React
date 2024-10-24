import Field from "../components/Field";
import store from "../state/store";

function FormSubmission() {
  const {fields} = store();
  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission
    console.log("Your form data:", fields);
    console.log("Your From is submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          <Field field={field} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormSubmission;
