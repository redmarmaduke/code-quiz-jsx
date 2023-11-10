import React from "react";

function Body(props: { children: React.ReactNode }) {
  return (
    <header>
      <div
        style={{
          marginBottom: "1em",
        }}
        className="justify-center"
      >
        {props.children}
      </div>
    </header>
  );
}

export default Body;
