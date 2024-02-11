import { useState } from "react";
import { UserMessage } from "../components/chat-bubbles/UserMessage";
import {
    GptMessageOrthography,
    TextMessageBox,
    TypingLoader,
} from "../components/index.components";

import { IMessage } from "../../shared/interfaces/message.interface";

const initMessage: IMessage = {
    text: "Hola, puedes escribir en español, y te ayudo con las correcciones.",
    isGpt: true,
};

export const ChatTemplate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([initMessage]);

    const handlePost = async (text: string) => {
        if (isLoading) return;
        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false }]);
        // TODO UseCase
        // const resp = await useCase(text);
        setIsLoading(false);
        // TODO Añadir la respuesta con isGpt: true, e isError: true si es necesario
        // if (!resp.ok) {
        //     return setMessages((prev) => [
        //         ...prev,
        //         { text: resp.message, isGpt: true, isError: true },
        //     ]);
        // }

        // const { result } = resp;
        // setMessages((prev) => [
        //     ...prev,
        //     { text: result, isGpt: true, info: resp },
        // ]);
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}
                    {messages.map((message, index) => {
                        const { isGpt, text } = message;
                        if (isGpt) {
                            return (
                                <GptMessageOrthography
                                    key={index}
                                    {...message}
                                />
                            );
                        } else {
                            return <UserMessage key={index} text={text} />;
                        }
                    })}
                    {isLoading && (
                        <div className="col-start-1 col-end-13 fade-in">
                            <TypingLoader />
                        </div>
                    )}
                </div>
            </div>
            <TextMessageBox
                onSendMessage={handlePost}
                placeholder="Escribe el texto a corregir"
                enableCorrections={false}
                isLoading={isLoading}
            />
        </div>
    );
};
