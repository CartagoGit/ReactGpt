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
      setMessages((prev) => [
        ...prev,
        { text: resp.gptMessage as string, isGpt: true, info: resp },
      ]);
    } else if ("stream" in resp) {
      await readStream(resp.stream as ReadableStreamDefaultReader<Uint8Array>);
    }
    setIsLoading(false);
  }, []);

  return { messages, isLoading, handlePost, chatRef };
};
