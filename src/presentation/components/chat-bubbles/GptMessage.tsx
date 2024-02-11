import Markdown from "react-markdown";
import { IMessage } from "../../../shared/interfaces/message.interface";

export const GptMessage = ({
    text,
    isError = false,
    errorMessage = undefined,
}: IMessage) => {
    return (
        <div className="col-start-1 col-end-9 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-600 rounded-full">
                    Gpt
                </div>
                <div className="relative px-4 py-2 ml-3 text-sm whitespace-pre-line bg-black bg-opacity-25 shadow rounded-xl">
                    <Markdown className={isError ? "text-red-700" : null}>
                        {text}
                    </Markdown>
                    {errorMessage && (
                        <div className="text-red-700">{errorMessage}</div>
                    )}
                </div>
            </div>
        </div>
    );
};
