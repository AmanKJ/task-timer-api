import React from "react";

const Form = ({ handleSubmit, handleChange, fetchData }) => {
  const btn_style = {
    margin: "10px",
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="task_name"
        name="task_name"
        onChange={(e) => handleChange(e)}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="task_description"
        name="task_description"
        onChange={(e) => handleChange(e)}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="creator"
        name="creator"
        onChange={(e) => handleChange(e)}
      />{" "}
      <br />
      <input
        type="number"
        placeholder="duration"
        name="duration"
        onChange={(e) => handleChange(e)}
      />{" "}
      <br />
      <button style={btn_style} type="submit">
        POST REQUEST
      </button>
      <button
        style={btn_style}
        onClick={(e) => {
          handleSubmit(e);
          fetchData();
        }}
      >
        POST + GET
      </button>
    </form>
  );
};

export default Form;
