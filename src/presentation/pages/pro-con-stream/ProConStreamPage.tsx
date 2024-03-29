import {
    GptMessage,
    UserMessage,
    TypingLoader,
    TextMessageBox,
} from "../../components/index.components";
import { useChat } from "../../../shared/hooks/index.hooks";
import { proConStreamUseCase } from "../../../core/use-cases/index.use-cases";
import { IMessage } from "../../../shared/interfaces/index.interfaces";

const initMessage: IMessage = {
    text: "Hola, escribe  lo que deseas que compare, y te ayudaré a encontrar los pros y contras. Iré mostrando la respuesta en tiempo real.",
    isGpt: true,
};

export const ProConStreamPage = () => {
    const { chatRef, messages, isLoading, handlePost, handleAbortStream } =
        useChat({
            initMessage,
            request: proConStreamUseCase,
        });

    return (
        <div className="chat-container">
            <div className="chat-messages" ref={chatRef}>
                <div className="grid grid-cols-12 gap-y-2">
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
                isLoading={isLoading}
                onAbortStream={handleAbortStream}
                placeholder="Escribe pros y contras para compararlos."
                enableCorrections
            />
        </div>
    );
};
