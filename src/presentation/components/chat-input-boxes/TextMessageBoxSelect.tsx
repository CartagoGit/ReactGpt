import { FormEvent, useCallback, useState } from "react";
import {
    ISelectOption,
    ITextMessageBoxSelectProps,
} from "../../../shared/interfaces/chat-input-boxes.interface";

export const TextMessageBoxSelect = ({
    onSendMessage,
    placeholder,
    selectable,
    selectableByDefault,
    isLoading,
    fileToDownload,
    enableCorrections = false,
}: ITextMessageBoxSelectProps) => {
    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState<
        ISelectOption | undefined
    >(selectableByDefault);
    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim().length <= 0 || !selectedOption) return;
        onSendMessage({ text: message, selectedOption });
        setMessage("");
    };

    const handleOnChangeSelect = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const id = Number(event.target.value);
            if (isNaN(id)) {
                return setSelectedOption(undefined);
            }
            setSelectedOption({
                id,
                label: event.target.options[event.target.selectedIndex].text,
            });
        },
        []
    );
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
                        {Object.values(selectable).map(({ id, label }) => (
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
                    disabled={
                        isLoading ||
                        !selectedOption ||
                        message.trim().length <= 0
                    }
                >
                    <span className="mr-2">Enviar</span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>
            {!!fileToDownload && (
                <div className="ml-4">
                    <button
                        className="btn-secondary"
                        disabled={isLoading || !fileToDownload}
                    >
                        <i className="fa-solid fa-download"></i>
                    </button>
                </div>
            )}
        </form>
    );
};
