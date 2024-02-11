import { useState } from "react";

import { useError, useReadStream, useScrollToBottom } from "./index.hooks";
import { IFetch, IMessage } from "../interfaces/index.interfaces";

export const useChat = <T extends object>(data: {
  initMessage: IMessage;
  request: (text: string) => IFetch<T>;
}) => {
  const { initMessage, request } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([initMessage]);
  const readStream = useReadStream(setMessages);
  const setError = useError(setMessages);
  const chatRef = useScrollToBottom(messages);

  const handlePost = async (text: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const resp = await request(text);
    if (!resp.ok) {
      setMessages((prev) => [...prev, { text: "", isGpt: true }]);
      setIsLoading(false);
      return setError(resp.message);
    }
    if ("gptMessage" in resp) {
      //   const gptMessage = resp.gptMessage as string;
    } else if ("stream" in resp) {
      await readStream(resp.stream as ReadableStreamDefaultReader<Uint8Array>);
    }
    setIsLoading(false);
  };

  return { messages, isLoading, handlePost, chatRef };
};
