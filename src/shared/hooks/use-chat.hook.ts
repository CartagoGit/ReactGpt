import { useError, useReadStream, useScrollToBottom } from "./index.hooks";
import { IFetch, IMessage } from "../interfaces/index.interfaces";
import { useCallback, useRef, useState } from "react";

export const useChat = <T>(data: {
  initMessage: IMessage;
  request: (text: string, options?: { abortSignal?: AbortSignal }) => IFetch<T>;
}) => {
  const { initMessage, request } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([initMessage]);
  const abortController = useRef(new AbortController());
  const readStream = useReadStream(setMessages);
  const setError = useError(setMessages);
  const chatRef = useScrollToBottom(messages);

  const handlePost = useCallback(async (text: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const resp = await request(text, {
      abortSignal: abortController.current.signal,
    });
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
      try {
        await readStream(stream);
      } catch (error) {
        console.log(error);
        // setError("Ocurrió un error leyendo la respuesta del servidor.");
      }
    }
    setIsLoading(false);
  }, []);

  const handleAbortStream = useCallback(() => {
    console.log("Abortando stream", isLoading);
    if (!isLoading) return;
    console.log("Abortando stream - isLoading");
    abortController.current.abort();
    abortController.current = new AbortController();
    setMessages(([...prev]) => {
      // prev[prev.length - 1].text = prev[prev.length - 1].text + " - ERROR -";
      prev[prev.length - 1].text = " - ERROR -";
      const newMessage = {
        text: "Se ha cancelado la petición",
        isGpt: true,
        isError: true,
      };
      console.warn(newMessage);
      return [...prev, newMessage];
    });
    setIsLoading(false);
  }, []);

  return { messages, isLoading, handlePost, chatRef, handleAbortStream };
};
