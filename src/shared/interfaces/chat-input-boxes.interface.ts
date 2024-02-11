import { langs } from "../../core/constants/langs.constant";

export interface ISelectOption {
  id: number;
  label: string;
}

export interface ISendMessageProps {
  text: string;
  selectedOption?: ISelectOption;
}

export interface ITextMessageBoxProps {
  onSendMessage: (props: ISendMessageProps) => void;
  isLoading: boolean;
  placeholder?: string;
  enableCorrections?: boolean;
  onAbortStream?: () => void;
}

export type ITextMessageBoxSelectProps = ITextMessageBoxProps & {
  onSendMessage: (props: ISendMessageProps) => void;
  options: Record<(typeof langs)[number], ISelectOption>;
};

export type ITextMessageBoxFileProps = ITextMessageBoxProps & {
  accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"];
};
