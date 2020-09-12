import React from "react";
import Data from "./data";

const Output = ({ data, fetchData }) => {
  return (
    <div className="output">
      {data.length === 0 ? (
        <p>
          <strong>status:</strong> No task Found in the Database!
        </p>
      ) : (
        data.map((value) => <Data key={value._id} value={value} fetchData={fetchData} />)
      )}
    </div>
  );
};

export default Output;
