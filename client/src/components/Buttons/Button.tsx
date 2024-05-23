import React from "react";
import RegisterButton from "./RegisterButton";

interface IButton {
  label: string;
  type: "auth" | "secondary" | "danger";
  onClick: () => void;
}

//Fabric pattern
function Button({ label, type, onClick }: IButton) {
  switch (type) {
    case "auth":
      return <RegisterButton label={label} onClick={onClick} />;
    default:
      return null;
  }
}

export default Button;
