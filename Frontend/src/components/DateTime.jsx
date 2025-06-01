import React, { useEffect, useState } from "react";

function DateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date()); // updating every second
    }, 1000);

    return () => clearInterval(timer); //clean unwanted data
  }, []);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return (
    <div className="lg:text-lg lg:font-semibold text-orange-200 p-2 m-3">
      <div className="p-4"> {currentDateTime.toLocaleString("en-IN", options)}</div>
    </div>
  );
}

export default DateTime;
