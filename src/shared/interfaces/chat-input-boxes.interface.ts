export interface ISelectOption<T extends string = string> {
  id: number;
  label: T;
}

export interface ISendMessageProps<T extends string = string> {
  text: string;
  selectedOption?: ISelectOption<T>;
}

export interface ITextMessageBoxProps<T extends string = string> {
  onSendMessage: (props: ISendMessageProps<T>) => void;
  isLoading: boolean;
  placeholder?: string;
  enableCorrections?: boolean;
  onAbortStream?: () => void;
}

export type ITextMessageBoxSelectProps<T extends string = string> =
  ITextMessageBoxProps<T> & {
    onSendMessage: (props: ISendMessageProps<T>) => void;
    selectable: Record<T, ISelectOption<T>>;
    selectableByDefault?: ISelectOption<T> | undefined;
    fileToDownload?: any;
  };

export type ITextMessageBoxFileProps = ITextMessageBoxProps & {
  accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"];
};
