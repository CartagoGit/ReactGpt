import { Dispatch, SetStateAction, useCallback } from "react";
import { IMessage } from "../interfaces/index.interfaces";

export const useError = (setMessages: Dispatch<SetStateAction<IMessage[]>>) => {
  return useCallback((message: string) => {
    const errorMessage = {
      text: message,
      isGpt: true,
      isError: true,
    };
    console.error(errorMessage);
    setMessages(([...prev]) => {
      prev[prev.length - 1] = errorMessage;
      return prev;
    });
  }, []);
};
