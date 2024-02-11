export interface ISelectOption {
  id: number;
  text: string;
}

export interface ITextMessageBoxProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  enableCorrections?: boolean;
  onAbortStream?: () => void;
}

export type ITextMessageBoxSelectProps = ITextMessageBoxProps & {
  onSendMessage: (props: { message: string; selectedOption: string }) => void;
  options: ISelectOption[];
};

export type ITextMessageBoxFileProps = ITextMessageBoxProps & {
  accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"];
};
