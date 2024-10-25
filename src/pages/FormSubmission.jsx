import store from "../state/store";

function FormSubmission() {
  const {fields} = store();
  const { formName } = store();
  const { formDescription } = store();
  
  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission
    console.log("Your form data:", fields);
    console.log("Your From is submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-[20%] mb-20">
      <div className="px-6 py-8 mb-4 bg-white border-t-[12px] border-green-500 mt-4 rounded-xl">
        <h1 className="mb-2 text-4xl font-semibold">{formName || "Untitled Form"}</h1>
        <p>{formDescription}</p>
      </div>
      <div className="flex flex-col gap-4 ">
        {fields?.map((field, index) => (
          <div key={index} className="flex flex-col gap-3 py-8 overflow-hidden bg-white rounded-lg shadow-sm px-7">
            <label className="mb-2 text-lg">{field.label}</label>
            {field.type === "number" || field.type === "text" || field.type === "file" ? 
            <input
              type={field.type}
              className="w-full py-2 duration-100 border-b-2 outline-none focus:border-gray-500"
              placeholder={"input " + field.type}
            />
            : 
            <div>
              {field.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2">
                  <input type={field.type} className="mr-4" />
                  <label>{option || `Option ${optionIndex + 1}`}</label>
                </div>
              ))}
            </div>
          }
          </div>
        ))}
      </div>
      <button className="px-6 font-semibold py-2 mt-4 text-white bg-[#298904] rounded hover:scale-105 active:scale-100 duration-200" type="submit">Submit</button>
    </form>
  );
};

export default FormSubmission;
