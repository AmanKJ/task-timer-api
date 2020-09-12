import React, { useState } from "react";
import Button from "./components/button";
import Form from "./components/form";
import Output from "./components/output";
import "./App.css";

function App() {
  const [response, setResponse] = useState([]);
  const [formData, setFormData] = useState({});
  const [active, setActive] = useState(0);
  const [saved, setSaved] = useState(0);

  const fetchData = async () => {
    const res = await fetch("/list");
    const data = await res.json();
    setResponse(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newData = formData;
    newData.duration = Number(newData.duration);
    setFormData(newData);

    try {
      const res = await fetch("/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) setSaved(1);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleChange = (e) => {
    setSaved(0);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="ui-container">
      <Button title={active ? "Hide" : "Try here"} handleClick={() => setActive(!active)} />

      {active ? (
        <div className="row">
          <div className="column">
            <div className="ref">
              <Form
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                fetchData={fetchData}
              />
              {saved ? <button className="button-saved">SUCCESS</button> : ""}
            </div>
          </div>
          <div className="column">
            <div className="ref">
              <Output data={response} fetchData={fetchData} />
              <div className="button-container">
                <button onClick={fetchData}>GET REQUEST</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
