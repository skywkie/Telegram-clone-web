import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type VariantButton = "auth";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant: VariantButton;
}

const Button = ({ variant, children, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className={clsx({
      [styles[variant]]: variant,
    })}
  >
    {children}
  </button>
);

export default Button;
