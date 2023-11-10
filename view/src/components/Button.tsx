import { Link } from "react-router-dom";

function Button() {
  return <Link to="https://www.google.com/"></Link>;
  /*
    return (
        <Link style={{
            fontFamily: "Arial, Gadget, sans-serif",
            margin: "1px 1px 1px 1px",
            border: "1px solid purple",
            borderRadius: "5px",
            backgroundColor: "purple",
            color: "white",
            fontSize: "1.25em"
        }}
        {...props}>{props.children}</Link>
    );
    */
}

export default Button;
