import React from "react";

import { io } from "socket.io-client";

import styles from "./ChatBody.module.scss";

import Input from "@/components/UI/Field";

interface Message {
  text: string;
  isMe: boolean;
}

const testMessages = [
  { text: "qweqw123123ewqe", isMe: false },
  { text: "qweq23123213wewqe", isMe: false },
  { text: "111rqegwwerg", isMe: true },
  { text: "qweqwewqe", isMe: false },
  { text: "qweqwqwdwqdewqe", isMe: true },
  { text: "wgffrweewqweqwewqe", isMe: true },
  { text: "qwe221qwewqe", isMe: false },
];

const ChatBody = () => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>(testMessages);

  const socketRef = React.useRef<any | null>(null); // ????

  React.useLayoutEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("connect", () => {
      console.log("connected to server");
    });
    socketRef.current.on("message", (newMessage: any) => {
      console.log("@onMessage");
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  function onClick() {
    if (message) {
      // TODO: новое сообщение в вебсокеты
      setMessages([{ text: message, isMe: true }, ...messages]);
      socketRef.current.emit("chat-message", message);
      setMessage("");
    }
  }

  return (
    <div className={styles.chatbody}>
      <div className={styles.chatbody__container}>
        <div className={styles.message__inputContainer}>
          <Input
            variant="message"
            placeholder="Сообщение"
            type="text"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button onClick={onClick} className={styles.message__send}>
            SEND
          </button>
        </div>
        {messages.map((message, i) => {
          const isMeContainerClass = message.isMe
            ? styles.message__container_me
            : styles.message__container_notme;
          return (
            <div className={isMeContainerClass} key={i}>
              <p className={styles.message__text}>{message.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatBody;
