import styles from "./Chat.module.scss";

import ChatBody from "./Body/ChatBody";
import ChatHead from "./Head/ChatHead";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <ChatHead />
      <ChatBody />
    </div>
  );
};

export default Chat;
