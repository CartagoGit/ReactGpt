import {
    GptMessage,
    UserMessage,
    TypingLoader,
    TextMessageBox,
} from "../../components/index.components";
import { proConDicusserUseCase } from "../../../core/use-cases/index.use-cases";
import { IMessage } from "../../../shared/interfaces/index.interfaces";
import { useChat } from "../../../shared/hooks/index.hooks";

const initMessage: IMessage = {
    text: "Hola, escribe  lo que deseas que compare, y te ayudaré a encontrar los pros y contras.",
    isGpt: true,
};

export const ProConDicusserPage = () => {
    const { chatRef, handlePost, isLoading, messages } = useChat({
        initMessage,
        request: proConDicusserUseCase,
    });

    return (
        <div className="chat-container">
            <div className="chat-messages" ref={chatRef}>
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
