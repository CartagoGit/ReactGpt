import { useEffect, useRef } from "react";
import { IMessage } from "../interfaces/index.interfaces";

export const useScrollToBottom = (messages: IMessage[]) => {
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);
  return chatRef;
};
