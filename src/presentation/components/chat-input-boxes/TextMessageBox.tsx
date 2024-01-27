import { FormEvent } from "react";

interface IProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  enableCorrections?: boolean;
}

export const TextMessageBox = ({
  onSendMessage,
  placeholder,
  enableCorrections = false,
}: IProps) => {
  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSendMessage(event.currentTarget.message.value);
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoCorrect={enableCorrections ? "on" : "off"}
            autoComplete={enableCorrections ? "on" : "off"}
            spellCheck={!!enableCorrections}
          />
        </div>
      </div>
      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
