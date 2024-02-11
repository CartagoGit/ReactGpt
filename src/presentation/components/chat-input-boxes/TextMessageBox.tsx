import { FormEvent, useState } from "react";

interface IProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    placeholder?: string;
    enableCorrections?: boolean;
    onAbortStream?: () => void;
}

export const TextMessageBox = ({
    onSendMessage,
    placeholder,
    enableCorrections = false,
    onAbortStream = undefined,
    isLoading,
}: IProps) => {
    const [message, setMessage] = useState("");
    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim().length <= 0) return;
        onSendMessage(message);
        setMessage("");
    };
    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl"
        >
            <div className="flex-grow">
                <div className="relative w-full">
                    <input
                        type="text"
                        autoFocus
                        name="message"
                        className="flex w-full h-10 pl-4 text-gray-800 border rounded-xl focus:outline-none focus:border-indigo-300"
                        placeholder={placeholder}
                        autoCorrect={enableCorrections ? "on" : "off"}
                        autoComplete={enableCorrections ? "on" : "off"}
                        spellCheck={!!enableCorrections}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                </div>
            </div>
            {!!onAbortStream && (
                <div className="ml-4">
                    <button
                        className="btn-secondary"
                        onClick={onAbortStream}
                        disabled={!isLoading}
                        type="button"
                    >
                        <span className="mr-2">Abortar</span>
                        <i className="fa-solid fa-eject"></i>
                    </button>
                </div>
            )}

            <div className="ml-4">
                <button
                    className="btn-primary"
                    disabled={isLoading}
                    type="submit"
                >
                    <span className="mr-2">Enviar</span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </form>
    );
};
