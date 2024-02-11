import { langs } from "../../core/constants/langs.constant";

export interface ISelectOption {
  id: number;
  label: string;
}

export interface ITextMessageBoxProps {
  onSendMessage: (props: { text: string }) => void;
  isLoading: boolean;
  placeholder?: string;
  enableCorrections?: boolean;
  onAbortStream?: () => void;
}

export type ITextMessageBoxSelectProps = ITextMessageBoxProps & {
  onSendMessage: (props: {
    text: string;
    selectedOption: ISelectOption;
  }) => void;
  options: Record<(typeof langs)[number], ISelectOption>;
};

export type ITextMessageBoxFileProps = ITextMessageBoxProps & {
  accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"];
};
