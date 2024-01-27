import { useState } from "react";
import {
    GptMessage,
    UserMessage,
    TypingLoader,
    TextMessageBox,
} from "../components/index.components";

interface IMessage {
    text: string;
    isGpt: boolean;
}

const initMessage: IMessage = {
    text: "Hola, puedes escribir en español, y te ayudo con las correcciones",
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
        setIsLoading(false);
        // TODO Añadir la respuesta con isGpt: true
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}

                    {messages.map(({ isGpt, text }, index) => {
                        if (isGpt) {
                            return <GptMessage key={index} text={text} />;
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
                enableCorrections
            />
        </div>
    );
};
