import styles from "./BurgerMenu.module.scss";

const modalItems = [{ title: "Избранное" }, { title: "Настройки" }, { title: "Друзья" }];

const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <ul className={styles.modalList}>
          {modalItems.map((item) => {
            return (
              <li className={styles.modalListItem} key={item.title}>
                <button className={styles.modalListButton}>{item.title}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
