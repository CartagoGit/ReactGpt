import { useState } from "react";
import { UserMessage } from "../../components/chat-bubbles/UserMessage";
import {
    GptMessageOrthography,
    TextMessageBox,
    TypingLoader,
} from "../../components/index.components";
import { orthographyUseCase } from "../../../core/use-cases/index.use-cases";
import { IOrthographyResponse } from "../../../interfaces/orthography.interface";

interface IMessage {
    text: string;
    isGpt: boolean;
    info?: IOrthographyResponse["data"];
}

const initMessage: IMessage = {
    text: "Hola, puedes escribir en español, y te ayudo con las correcciones.",
    isGpt: true,
};

export const OrthographyPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([initMessage]);

    const handlePost = async (text: string) => {
        if (isLoading) return;
        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false }]);
        const resp = await orthographyUseCase(text);
        console.log(resp);
        setIsLoading(false);
        if (!resp.ok)
            return setMessages((prev) => [
                ...prev,
                { text: resp.message, isGpt: true },
            ]);

        const { result } = resp;
        setMessages((prev) => [
            ...prev,
            { text: result, isGpt: true, info: resp },
        ]);
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}
                    {messages.map(({ isGpt, text, info }, index) => {
                        if (isGpt) {
                            return (
                                <GptMessageOrthography
                                    key={index}
                                    text={text}
                                    info={info}
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
            />
        </div>
    );
};
