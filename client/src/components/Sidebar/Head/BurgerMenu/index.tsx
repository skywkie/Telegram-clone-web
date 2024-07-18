import React from "react";

import styles from "./BurgerMenu.module.scss";

import Modal from "./Modal";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function onClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button className={styles.burgerMenu} onClick={onClick}>
        <div className={styles.burgerMenuItem}></div>
        <div className={styles.burgerMenuItem}></div>
        <div className={styles.burgerMenuItem}></div>
      </button>
      {isOpen && <Modal />}
    </>
  );
};

export default BurgerMenu;
