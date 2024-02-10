import Markdown from "react-markdown";
import { IMesssageOrthography } from "../../../shared/interfaces/message.interface";

export const GptMessageOrthography = ({
    text,
    info,
    isError = false,
}: IMesssageOrthography) => {
    const { accuracy, errors, message } = info || {};
    return (
        <div className="col-start-1 col-end-9 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                    Gpt
                </div>
                <div className="relative ml-3 text-sm bg-black bg-opacity-25 py-2 px-4 shadow rounded-xl whitespace-pre-line">
                    {!info ? (
                        <Markdown className={isError ? "text-red-700" : null}>
                            {text}
                        </Markdown>
                    ) : (
                        <>
                            <h3 className="text-xl">Corrección:</h3>
                            <p>{text}</p>
                            <h3 className="text-xl mt-4">
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
                </div>
            </div>
        </div>
    );
};
