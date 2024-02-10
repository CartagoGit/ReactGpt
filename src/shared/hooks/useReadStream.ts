import { Dispatch, SetStateAction, useCallback } from "react";
import { IMessage } from "../interfaces/message.interface";

// Custom hook to read a stream and update the messages
export const useReadStream = (
  setMessages: Dispatch<SetStateAction<IMessage[]>>
) => {
  const readStream = useCallback(
    async (stream: ReadableStreamDefaultReader<Uint8Array>) => {
      const decoder = new TextDecoder();
      let result = "";
      setMessages((prev) => [...prev, { text: result, isGpt: true }]);
      while (true) {
        const { done, value } = await stream.read();
        if (done) break;
        const decodeChunk = decoder.decode(value, { stream: true });
        result += decodeChunk;
        setMessages(([...prev]) => {
          prev.at(-1)!.text = result;
          return prev;
        });
      }
    },
    []
  );

  return readStream;
};
