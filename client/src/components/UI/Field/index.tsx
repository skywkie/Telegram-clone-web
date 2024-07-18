import React from "react";
import clsx from "clsx";

import styles from "./Field.module.css";

type VariantInput = "auth" | "search" | "message";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  variant: VariantInput;
}

const Input = ({ variant, ...rest }: InputProps) => (
  <input
    {...rest}
    className={clsx({
      [styles[variant]]: variant,
    })}
  />
);

export default Input;
