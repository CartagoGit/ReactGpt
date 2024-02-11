import { UserMessage } from "../../components/chat-bubbles/UserMessage";
import {
    GptMessageOrthography,
    TextMessageBox,
    TypingLoader,
} from "../../components/index.components";
import { orthographyUseCase } from "../../../core/use-cases/index.use-cases";
import { useChat } from "../../../shared/hooks/index.hooks";
import { IMesssageOrthography } from "../../../shared/interfaces/message.interface";

const initMessage: IMesssageOrthography = {
    text: "Hola, puedes escribir en español, y te ayudo con las correcciones.",
    isGpt: true,
};

export const OrthographyPage = () => {
    const { chatRef, handlePost, isLoading, messages } = useChat({
        initMessage,
        request: orthographyUseCase,
    });

    return (
        <div className="chat-container">
            <div className="chat-messages" ref={chatRef}>
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
