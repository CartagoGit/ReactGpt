import { UserMessage } from "../../components/chat-bubbles/UserMessage";
import {
    GptMessage,
    TextMessageBox,
    TypingLoader,
} from "../../components/index.components";

export const OrthographyPage = () => {
    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}
                    <GptMessage text="Hola, puedes escribir en español, y te ayudo con las correcciones" />
                    <UserMessage text="Mi mensaje" />

                    <TypingLoader className="fade-in" />
                </div>
            </div>

            <TextMessageBox
                onSendMessage={(message) => console.log(message)}
                placeholder="Escribe el texto a corregir"
                enableCorrections
            />
        </div>
    );
};
