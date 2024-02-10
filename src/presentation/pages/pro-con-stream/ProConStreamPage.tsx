import { useState } from "react";
import {
    GptMessage,
    UserMessage,
    TypingLoader,
    TextMessageBox,
} from "../../components/index.components";

import { useReadStream } from "../../../shared/hooks/index.hooks";
import { proConStreamUseCase } from "../../../core/use-cases/index.use-cases";

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
    const readStream = useReadStream(setMessages);

    const handlePost = async (text: string) => {
        if (isLoading) return;
        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false }]);
        const resp = await proConStreamUseCase(text);
        setIsLoading(false);
        if (!resp.ok) {
            return setMessages((prev) => [
                ...prev,
                { text: resp.message, isGpt: true, isError: true },
            ]);
        }
        const { stream } = resp;
        await readStream(stream);
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
