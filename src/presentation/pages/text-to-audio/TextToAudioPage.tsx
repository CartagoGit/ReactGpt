import { useState } from "react";
import { UserMessage } from "../../components/chat-bubbles/UserMessage";
import {
    GptMessageOrthography,
    TextMessageBoxSelect,
    TypingLoader,
} from "../../components/index.components";

import { IMessage } from "../../../shared/interfaces/message.interface";
import {
    voices,
    voicesSelectables,
} from "../../../core/constants/index.constants";
import { textToAudioUseCase } from "../../../core/use-cases/text-to-audio.use-case";
import { useError } from "../../../shared/hooks/index.hooks";

const initMessage: IMessage = {
    text: "Hola, escribe un texto y te lo dire oralmente.",
    isGpt: true,
};

export const TextToAudioPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([initMessage]);
    const setError = useError(setMessages);

    const handlePost = async (props: {
        text: string;
        voice: (typeof voices)[number];
    }) => {
        if (isLoading) return;
        const { text, voice } = props;
        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false }]);
        try {
            const resp = await textToAudioUseCase(text, { voice });
            if (!resp.ok) return setError(resp);
            const { stream } = resp;
            // TODO Añadir la respuesta con audio al que se pueda pulsar en el play y guardar el archivo para que se pueda descargar
        } catch (error: any) {
            let errorMessage =
                "Ocurrió un error leyendo la respuesta del servidor.";
            if (error?.name === "AbortError")
                errorMessage = "Se ha cancelado la petición.";
            setError({ message: errorMessage, error, ok: false });
        } finally {
            setIsLoading(false);
        }
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
            <TextMessageBoxSelect
                onSendMessage={handlePost}
                placeholder="Escribe el texto a convertir en audio."
                enableCorrections={false}
                isLoading={isLoading}
                selectable={voicesSelectables}
                selectableByDefault={voicesSelectables.onyx}
            />
        </div>
    );
};
