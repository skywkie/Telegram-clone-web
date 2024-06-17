import React from "react";

import styles from "./ChatBody.module.scss";

export default function ChatBody() {
  return (
    <div className={styles.chatbody}>
      <div className={styles.chatbody__container}>
        <div className={styles.message__container_me}>
          <p className={styles.message__text}>messagemessagemessagemessagemessage</p>
          <p className={styles.message__text}>messagemessagemessagemessagemessage</p>
        </div>
        <div className={styles.message__container_notme}>
          <p className={styles.message__text}>messagemessagemessagemessagemessage</p>
          <p className={styles.message__text}>messagemessagemessagemessagemessage</p>
        </div>
        <div className={styles.message__container_me}>
          <p className={styles.message__text}>messagemessagemessagemessagemessage</p>
        </div>
        <div className={styles.message__container_notme}>
          <p className={styles.message__text}>messagemessagemessagemessagemessage</p>
        </div>
        <div className={styles.message__container_me}>
          <p className={styles.message__text}>messagemessagemessagemessagemessage</p>
        </div>
        <div className={styles.message__container_notme}>
          <p className={styles.message__text}>messagemessagemessagemessagemessage</p>
        </div>
      </div>
    </div>
  );
}
