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
  selectable: Record<string, ISelectOption>;
  selectableByDefault?: ISelectOption;
  fileToDownload?: any;
};

export type ITextMessageBoxFileProps = ITextMessageBoxProps & {
  accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"];
};
