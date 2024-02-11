import { Dispatch, SetStateAction, useCallback } from "react";
import { IErrorResponse, IMessage } from "../interfaces/index.interfaces";

export const useError = (setMessages: Dispatch<SetStateAction<IMessage[]>>) => {
  return useCallback((error: IErrorResponse) => {
    const { message } = error;
    const errorMessage = {
      text: message,
      isGpt: true,
      isError: true,
    };
    console.error("useError:", error);
    setMessages(([...prev]) => {
      const lastMessage = prev.at(-1)!;
      // if (prev.at(-1)?.isGpt) prev[prev.length - 1].text += "\n<- Error ->";
      if (lastMessage.isGpt) {
        prev[prev.length - 1] = {
          ...lastMessage,
          errorMessage: `⚠️ Error`,
        };
      }
      return [...prev, errorMessage];
    });
  }, []);
};
