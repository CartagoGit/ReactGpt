import { FormEvent, useState } from "react";
import { ITextMessageBoxSelectProps } from "../../../shared/interfaces/chat-input-boxes.interface";

export const TextMessageBoxSelect = ({
    onSendMessage,
    placeholder,
    options,
    enableCorrections = false,
}: ITextMessageBoxSelectProps) => {
    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState<string>();
    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim().length <= 0 || !selectedOption) return;

        onSendMessage({ message, selectedOption });
        setMessage("");
    };
    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl"
        >
            <div className="flex-grow">
                <div className="flex">
                    <input
                        type="text"
                        autoFocus
                        name="message"
                        className="w-full h-10 pl-4 text-gray-800 border rounded-xl focus:outline-none focus:border-indigo-300"
                        placeholder={placeholder}
                        autoCorrect={enableCorrections ? "on" : "off"}
                        autoComplete={enableCorrections ? "on" : "off"}
                        spellCheck={!!enableCorrections}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <select
                        name="select"
                        className="w-2/5 h-10 pl-4 ml-5 text-gray-800 border rounded-xl focus:outline-none focus:border-indigo-300"
                        onChange={(event) =>
                            setSelectedOption(event.target.value)
                        }
                    >
                        <option
                            className="text-white bg-blue-600"
                            value={undefined}
                        >
                            Seleccionar
                        </option>
                        {options.map(({ id, text }) => (
                            <option key={id} value={id}>
                                {text}
                            </option>
                        ))}
                    </select>
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
