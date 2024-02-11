import {
    GptMessage,
    UserMessage,
    TypingLoader,
    TextMessageBoxSelect,
} from "../../components/index.components";
import { proConDicusserUseCase } from "../../../core/use-cases/index.use-cases";
import { IMessage } from "../../../shared/interfaces/index.interfaces";
import { useChat } from "../../../shared/hooks/index.hooks";
import { langsOptions } from "../../../core/constants/index.constants";


const initMessage: IMessage = {
    text: "Hola, escribe un texto que desees que traduzca.",
    isGpt: true,
};

export const TranslatePage = () => {
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
            <TextMessageBoxSelect
                onSendMessage={handlePost}
                placeholder="Escribe un texto a traducir."
                enableCorrections
                isLoading={isLoading}
                options={langsOptions}
            />
        </div>
    );
};
