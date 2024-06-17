import ChatBody from "./Body/ChatBody";
import styles from "./Chat.module.scss";
import ChatHead from "./Head/ChatHead";

export default function Chat() {
  return (
    <div className={styles.chat}>
      <ChatHead />
      <ChatBody />
    </div>
  );
}
