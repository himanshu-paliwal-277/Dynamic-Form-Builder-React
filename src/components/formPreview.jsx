import store from "../state/store";

function FormPreview() {
  const { fields } = store();
  const { formName } = store();
  const { formDescription } = store();
  return (
    <div className="mx-[20%] mb-20">
      <h1 className="mb-3 text-3xl font-bold">Form Preview</h1>
      {/* Form Name */}
      <div className="px-6 py-8 mb-4 bg-white border-t-[12px] border-green-500 mt-4 rounded-xl">
        <h1 className="mb-2 text-4xl font-semibold">{formName || "Untitled Form"}</h1>
        <p>{formDescription}</p>
      </div>
      
      <div className="flex flex-col gap-4 form-preview">
        {fields?.map((field, index) => (
          <div key={index} className="flex flex-col gap-3 py-8 overflow-hidden bg-white rounded-lg shadow-sm px-7">
            <label className="mb-2 text-lg">{field.label}</label>
            {/* <Field field={field} /> */}
            <input
              type={field.type}
              className="w-full py-2 duration-100 border-b-2 outline-none focus:border-gray-500"
              placeholder={"input " + field.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormPreview;
