import Markdown from "react-markdown";
import { IMesssageOrthography } from "../../../shared/interfaces/message.interface";

export const GptMessageOrthography = ({
    text,
    info,
    isError = false,
    adviceMessage = undefined,
}: IMesssageOrthography) => {
    const { accuracy, errors, message } = info || {};
    return (
        <div className="col-start-1 col-end-9 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-600 rounded-full">
                    Gpt
                </div>
                <div className="relative px-4 py-2 ml-3 text-sm whitespace-pre-line bg-black bg-opacity-25 shadow rounded-xl">
                    {!info ? (
                        <Markdown className={isError ? "text-red-700" : null}>
                            {text}
                        </Markdown>
                    ) : (
                        <>
                            <h3 className="text-xl">Corrección:</h3>
                            <p>{text}</p>
                            <h3 className="mt-4 text-xl">
                                Precisión: {accuracy}%
                            </h3>
                            <p>{message}</p>
                            {errors?.length !== 0 && (
                                <>
                                    <h3 className="mt-4 text-xl">
                                        Errores encontrados:
                                    </h3>
                                    <ul>
                                        {errors?.map((error, index) => {
                                            return <li key={index}>{error}</li>;
                                        })}
                                    </ul>
                                </>
                            )}
                        </>
                    )}
                    {!!adviceMessage && (
                        <div className="text-xs text-pink-700">
                            {adviceMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
