import { useState } from "react";
import {
    GptMessage,
    UserMessage,
    TypingLoader,
    TextMessageBox,
} from "../../components/index.components";

interface IMessage {
    text: string;
    isGpt: boolean;
}

const initMessage: IMessage = {
    text: "Hola, escribe  lo que deseas que compare, y te ayudaré a encontrar los pros y contras. Iré mostrando la respuesta en tiempo real.",
    isGpt: true,
};

export const ProConStreamPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([initMessage]);

    const handlePost = async (text: string) => {
        if (isLoading) return;
        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false, isError: true }]);
        // TODO UseCase
        setIsLoading(false);
        // TODO Añadir la respuesta con isGpt: true
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}

                    {messages.map((message, index) => {
                        const { isGpt, text } = message;
                        if (isGpt) {
                            return <GptMessage key={index} {...message} />;
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
                placeholder="Escribe pros y contras para compararlos."
                enableCorrections
            />
        </div>
    );
};
