import Markdown from "react-markdown";
import { IMessage } from "../../../interfaces/message.interface";

export const GptMessage = ({ text, isError = false }: IMessage) => {
    return (
        <div className="col-start-1 col-end-9 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                    Gpt
                </div>
                <div className="relative ml-3 text-sm bg-black bg-opacity-25 py-2 px-4 shadow rounded-xl whitespace-pre-line">
                    <Markdown className={isError ? "text-red-700" : null}>
                        {text}
                    </Markdown>
                </div>
            </div>
        </div>
    );
};
