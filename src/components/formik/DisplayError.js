import React from "react";

function DisplayError({ message, touched }) {
  return (
    <div className="text-danger mt-2" style={{ fontSize: ".9em" }}>
      {message && touched ? `*${message}` : null}
    </div>
  );
}

export default DisplayError;
