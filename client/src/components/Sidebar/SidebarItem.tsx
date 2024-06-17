import React from "react";

import styles from "./SidebarItem.module.scss";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  description: string;
  path: number;
}

export default function SidebarItem({ name, description, path }: Props): React.ReactNode {
  return (
    <Link to={`/chat/${path}`} className={styles.sidebar__item}>
      <h5>{name}</h5>
      <p>{description}</p>
    </Link>
  );
}
