import { Dispatch, SetStateAction, useCallback } from "react";
import { IMessage } from "../interfaces/message.interface";

// Custom hook to read a stream and update the messages
export const useReadStream = (
  setMessages: Dispatch<SetStateAction<IMessage[]>>
) => {
  // Generator to read the stream strings
  const generator = useCallback(async function* generator(
    stream: ReadableStreamDefaultReader<Uint8Array>
  ) {
    const decoder = new TextDecoder();
    console.log("generator");
    let result = "";
    while (true) {
      const { done, value } = await stream.read();
      if (done) break;
      const decodeChunk = decoder.decode(value, { stream: true });
      result += decodeChunk;
      yield result;
    }
  },
  []);

  // Function to read the stream and update the messages
  const readStream = useCallback(
    async (stream: ReadableStreamDefaultReader<Uint8Array>) => {
      console.log("readStream");
      setMessages((prev) => [
        ...prev,
        { text: "me cago en la leche", isGpt: true },
      ]);

      for await (const gptMessage of generator(stream)) {
        console.log("gptMessage", gptMessage);
        setMessages(([...prev]) => {
          prev.at(-1)!.text = gptMessage;
          return prev;
        });
      }
    },
    []
  );

  return readStream;
};
