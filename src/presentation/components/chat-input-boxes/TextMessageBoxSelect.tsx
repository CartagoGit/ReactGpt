import { FormEvent, useState } from "react";

interface IProps {
    onSendMessage: (props: { message: string; selectedOption: string }) => void;
    options: IOption[];
    placeholder?: string;
    enableCorrections?: boolean;
}

interface IOption {
    id: string;
    text: string;
}

export const TextMessageBoxSelect = ({
    onSendMessage,
    placeholder,
    options,
    enableCorrections = false,
}: IProps) => {
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
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
        >
            <div className="flex-grow">
                <div className="flex">
                    <input
                        type="text"
                        autoFocus
                        name="message"
                        className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        placeholder={placeholder}
                        autoCorrect={enableCorrections ? "on" : "off"}
                        autoComplete={enableCorrections ? "on" : "off"}
                        spellCheck={!!enableCorrections}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <select
                        name="select"
                        className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        onChange={(event) =>
                            setSelectedOption(event.target.value)
                        }
                    >
                        <option
                            className="bg-blue-500 text-white"
                            value={undefined}
                        >
                            Seleccione una opción
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
