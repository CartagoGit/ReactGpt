import { useCallback, useState } from "react";
import { IFetch } from "../interfaces/api.interface";
import { IMessage } from "../interfaces/message.interface";
import { useError, useReadStream, useScrollToBottom } from "./index.hooks";

export const useChat = <T extends object>(data: {
  initMessage: IMessage;
  useCase: (text: string) => IFetch<T>;
}) => {
  const { initMessage, useCase } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([initMessage]);
  const readStream = useReadStream(setMessages);
  const setError = useError(setMessages);
  const chatRef = useScrollToBottom(messages);

  const handlePost = useCallback(async (text: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const resp = await useCase(text);
    if (!resp.ok) return setError(resp.message);
    setIsLoading(false);
    if ("gptMessage" in resp) {
      const gptMessage = resp.gptMessage as string;
    } else if ("stream" in resp) {
      const stream = resp.stream as ReadableStreamDefaultReader<Uint8Array>;
      setMessages((prev) => [...prev, { text: "", isGpt: true }]);
      await readStream(stream);
    }

    setMessages((prev) => [...prev, { text: "", isGpt: true }]);
  }, []);

  return { messages, isLoading, handlePost, chatRef };
};
