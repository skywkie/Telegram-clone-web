import React from "react";
import styles from "./SidebarHead.module.css";

import BurgerMenu from "./BurgerMenu";
import Input from "@/components/UI/Field";

const SidebarHead = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className={styles.sidebarHead}>
      <div className={styles.sidebarHeadContainer}>
        <BurgerMenu />
        <Input
          variant="search"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className={styles.search}
          placeholder="Поиск"
        />
      </div>
    </div>
  );
};

export default SidebarHead;
