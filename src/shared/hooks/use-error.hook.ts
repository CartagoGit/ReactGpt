import { Dispatch, SetStateAction, useCallback } from "react";
import { IMessage } from "../interfaces/index.interfaces";

export const useError = (setMessages: Dispatch<SetStateAction<IMessage[]>>) => {
  return useCallback((message: string) => {
    setMessages(([...prev]) => {
      prev[prev.length - 1] = {
        text: message,
        isGpt: true,
        isError: true,
      };
      return prev;
    });
  }, []);
};
