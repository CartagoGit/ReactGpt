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
    async (props: { text: string; selectedOptions?: string }) => {
      if (isLoading) return;
      const { text } = props;
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
      } catch (error: any) {
        let errorMessage =
          "Ocurrió un error leyendo la respuesta del servidor.";
        if (error?.name === "AbortError")
          errorMessage = "Se ha cancelado la petición.";
        setError({ message: errorMessage, error, ok: false });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleAbortStream = useCallback(() => {
    if (!isLoading) return;
    abortController.current.abort("Clicked in abort button.");
    abortController.current = new AbortController();
  }, [isLoading]);

  return {
    messages,
    isLoading,
    handlePost,
    chatRef,
    handleAbortStream,
  };
};
