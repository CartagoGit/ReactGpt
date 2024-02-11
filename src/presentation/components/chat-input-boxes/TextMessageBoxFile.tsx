import { FormEvent, useRef, useState } from "react";
import { ITextMessageBoxFileProps } from "../../../shared/interfaces/chat-input-boxes.interface";

export const TextMessageBoxFile = ({
    onSendMessage,
    placeholder,
    enableCorrections = false,
    accept = "image/*",
}: ITextMessageBoxFileProps) => {
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null | undefined>();
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim().length <= 0) return;

        onSendMessage({ text: message });
        setMessage("");
    };
    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl"
        >
            <div className="mr-3">
                <button
                    type="button"
                    className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                    onClick={() => inputFileRef.current?.click()}
                >
                    <i className="text-xl fa-solid fa-paperclip"></i>
                </button>
                <input
                    type="file"
                    ref={inputFileRef}
                    accept={accept}
                    onChange={(event) =>
                        setSelectedFile(event.target.files?.item(0))
                    }
                    hidden
                />
            </div>
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
            <div className="ml-4">
                <button className="btn-primary" disabled={!selectedFile}>
                    <span className="mr-2">
                        {!selectedFile
                            ? "Enviar"
                            : selectedFile.name.length > 10
                            ? selectedFile.name.substring(0, 10) + "..."
                            : selectedFile.name}
                    </span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </form>
    );
};
