import React from "react";
import clsx from "clsx";

import styles from "./Field.module.css";

type VariantField = "auth" | "search" | "message";

interface FieldProps extends React.ComponentPropsWithoutRef<"input"> {
  variant: VariantField;
}

const Field = ({ variant, ...rest }: FieldProps) => (
  <input
    {...rest}
    className={clsx({
      [styles[variant]]: variant,
    })}
  />
);

export default Field;
