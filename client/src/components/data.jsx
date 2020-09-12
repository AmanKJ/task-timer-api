import React, { useState } from "react";
import { useEffect } from "react";

const Data = ({ value, fetchData }) => {
  const [time, setTime] = useState(value.duration);

  const fetchTimer = async () => {
    const timers = await (await fetch("/timer")).json();
    timers.forEach((time) => {
      if (time._id === value._id) {
        setTime(time.duration);
      }
    });
  };

  useEffect(() => {
    fetchTimer();

    const interval = setInterval(() => {
      setTime((time) => {
        if (time) {
          return time - 1;
        } else {
          fetchData();
          return clearInterval();
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>
        <strong>task_name:</strong> {value.task_name}
      </p>
      <p>
        <strong>task_description:</strong> {value.task_description}
      </p>
      <p>
        <strong>creator:</strong> {value.creator}
      </p>
      <p>
        <strong>duration:</strong> {value.duration} sec
        <span
          style={{
            backgroundColor: "tomato",
            padding: "8px",
            borderRadius: 5,
            color: "#f6f6f6",
            marginLeft: "10px",
          }}
        >
          {time}
        </span>
      </p>
      <br />
    </div>
  );
};

export default Data;
