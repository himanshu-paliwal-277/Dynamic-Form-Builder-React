function Field({ field, onChange }) {
  switch (field.type) {
    case "text":
      return (
        <input className="" type="text" placeholder={field.label} onChange={onChange} />
      );
    case "number":
      return (
        <input type="number" placeholder={field.label} onChange={onChange} />
      );
    case "radio":
      return field.options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={field.label}
            value={option}
            onChange={onChange}
          />
          {option}
        </label>
      ));
    case "checkbox":
      return field.options.map((option) => (
        <label key={option}>
          <input type="checkbox" value={option} onChange={onChange} />
          {option}
        </label>
      ));
    case "file":
      return <input type="file" onChange={onChange} />;
    default:
      return null;
  }
}

export default Field;
