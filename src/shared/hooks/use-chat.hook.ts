import { useCallback, useState } from "react";
import { IFetch } from "../interfaces/api.interface";
import { IMessage } from "../interfaces/message.interface";
import { useError, useScrollToBottom } from "./index.hooks";

export const useChat = <T>(data: {
  initMessage: IMessage;
  useCase: (text: string) => IFetch<T>;
}) => {
  const { initMessage, useCase } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([initMessage]);
  const setError = useError(setMessages);
  const chatRef = useScrollToBottom(messages);

  const handlePost = useCallback(async (text: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const resp = await useCase(text);
    if (!resp.ok) return setError(resp.message);
    setIsLoading(false);
   
    setMessages((prev) => [...prev, { text: "", isGpt: true }]);
  }, []);

  return { messages, isLoading, handlePost, chatRef };
};
