import { Link } from "react-router-dom";

import styles from "./SidebarItem.module.scss";

interface SidebarItemProps {
  name: string;
  description: string;
  path: number;
}

const SidebarItem = ({ name, description, path }: SidebarItemProps) => {
  return (
    <Link to={`/chat/${path}`} className={styles.sidebar__item}>
      <h5>{name}</h5>
      <p>{description}</p>
    </Link>
  );
};

export default SidebarItem;
