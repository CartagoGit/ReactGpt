import Markdown from "react-markdown";
import { IOrthographyResponse } from "../../../interfaces/index.interfaces";

export const GptMessageOrthography = ({
    text,
    info,
}: {
    text: string;
    info?: IOrthographyResponse["data"];
}) => {
    const { accuracy, errors, message } = info || {};
    return (
        <div className="col-start-1 col-end-9 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                    Gpt
                </div>
                <div className="relative ml-3 text-sm bg-black bg-opacity-25 py-2 px-4 shadow rounded-xl whitespace-pre-line">
                    {!info ? (
                        <Markdown>{text}</Markdown>
                    ) : (
                        <>
                            <h3 className="text-2xl">Corrección:</h3>
                            <p>{text}</p>
                            <h3 className="text-2xl mt-4">
                                Precisión: {accuracy}%
                            </h3>
                            <p>{message}</p>
                            {errors?.length !== 0 && (
                                <>
                                    <h3 className="mt-4 text-2xl">
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
