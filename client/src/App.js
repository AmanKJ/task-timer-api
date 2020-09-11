import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    callApi().then((res) => setResponse(res.data));
  }, []);

  const callApi = async () => {
    console.log("ff");
    const res = await fetch("/data");
    const body = await res.json();
    console.log(body);
    return body;
  };

  return <h1>{response}</h1>;
}

export default App;
