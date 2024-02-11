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

  const handlePost = useCallback(
    async (text: string) => {
      if (isLoading) return;
      setMessages((prev) => [...prev, { text, isGpt: false }]);
      setIsLoading(true);
      try {
        const resp = await request(text, {
          abortSignal: abortController.current.signal,
        });
        if (!resp.ok) return setError(resp);

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
      } catch (error) {
        console.log(error);
        const errorMessage =
          "Ocurrió un error leyendo la respuesta del servidor.";
        setError({ message: errorMessage, error, ok: false });
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const handleAbortStream =
    // useCallback(() => {
    () => {
      console.log("Abortando stream", isLoading, messages[messages.length - 1]);
      if (!isLoading) return;
      console.log("Abortando stream - isLoading");
      abortController.current.abort("Clicked in abort button.");
      // abortController.current.abort();
      abortController.current = new AbortController();
      const newMessage = {
        text: "Se ha cancelado la petición",
        isGpt: true,
        isError: true,
      };
      // throw new Error("Se ha cancelado la petición");
      // setError("Se ha cancelado la petición");
      // setMessages(([...prev]) => {
      //   if (!prev[prev.length - 1].isGpt) return [...prev, newMessage];
      //   const errorText = " - ERROR -";
      //   console.log("errror", errorText);
      //   // if (!prev[prev.length - 1].isGpt) return prev;
      //   prev[prev.length - 1].text += errorText;
      //   // prev[prev.length - 1].text = " - ERROR -";
      //   console.warn(newMessage);
      //   return [...prev, newMessage];
      // });
      // setIsLoading(false);
    };
  // }, [isLoading]);

  return {
    messages,
    isLoading,
    handlePost,
    chatRef,
    handleAbortStream,
  };
};
