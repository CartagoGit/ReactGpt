import { FormEvent, useCallback, useState } from "react";
import {
    ISelectOption,
    ITextMessageBoxSelectProps,
} from "../../../shared/interfaces/chat-input-boxes.interface";

export const TextMessageBoxSelect = ({
    onSendMessage,
    placeholder,
    options,
    enableCorrections = false,
    isLoading,
}: ITextMessageBoxSelectProps) => {
    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState<ISelectOption>(
        options.Español
    );
    console.log("options", options, options.Español, selectedOption);
    const handleSendMessage = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (message.trim().length <= 0 || !selectedOption) return;

            onSendMessage({ text: message, selectedOption });
            setMessage("");
        },
        []
    );

    const handleOnChangeSelect = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const id = Number(event.target.value);
        setSelectedOption({
            id,
            label: event.target.options[event.target.selectedIndex].text,
            // label: options[id],
        });
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
                        value={selectedOption?.id}
                        onChange={handleOnChangeSelect}
                    >
                        <option
                            className="text-white bg-blue-600"
                            value={undefined}
                        >
                            Seleccionar
                        </option>
                        {Object.values(options).map(({ id, label }) => (
                            <option key={id} value={id}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="ml-4">
                <button
                    className="btn-primary"
                    disabled={isLoading || !selectedOption}
                >
                    <span className="mr-2">Enviar</span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </form>
    );
};
