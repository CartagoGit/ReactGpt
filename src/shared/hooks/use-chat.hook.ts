import { useError, useReadStream, useScrollToBottom } from "./index.hooks";
import { IFetch, IMessage } from "../interfaces/index.interfaces";
import { useCallback, useState } from "react";

export const useChat = <T>(data: {
  initMessage: IMessage;
  request: (text: string) => IFetch<T>;
}) => {
  const { initMessage, request } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([initMessage]);
  const readStream = useReadStream(setMessages);
  const setError = useError(setMessages);
  const chatRef = useScrollToBottom(messages);

  const handlePost = useCallback(async (text: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const resp = await request(text);
    if (!resp.ok) {
      setIsLoading(false);
      return setError(resp.message);
    }
    if ("gptMessage" in resp) {
      const { gptMessage } = resp as { gptMessage: string };
      setMessages((prev) => [
        ...prev,
        { text: gptMessage as string, isGpt: true, info: resp },
      ]);
    } else if ("stream" in resp) {
      const { stream } = resp as { stream: ReadableStreamDefaultReader };
      await readStream(stream);
    }
    setIsLoading(false);
  }, []);

  return { messages, isLoading, handlePost, chatRef };
};
