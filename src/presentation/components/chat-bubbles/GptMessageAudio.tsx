import { useEffect, useRef, useState } from "react";
import { IMessage } from "../../../shared/interfaces/message.interface";
import { ITextToAudioResponse } from "../../../shared/interfaces/responses.interface";

export const GptMessageAudio = ({
    text,
    errorMessage = undefined,
    info: resp,
    isError = false,
}: IMessage<ITextToAudioResponse["data"]>) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying]);
    // const togglePlay = () => {
    //     setIsPlaying(!isPlaying);
    // };

    return (
        <div className="col-start-1 col-end-9 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-600 rounded-full">
                    Gpt
                </div>
                <div className="relative flex flex-col gap-3 px-4 py-2 ml-3 text-sm whitespace-pre-line bg-black bg-opacity-25 shadow rounded-xl">
                    <div className={isError ? "text-red-700" : ""}>{text}</div>
                    {!!resp && (
                        <div className="flex items-center gap-4">
                            <audio
                                className="h-[40px]"
                                ref={audioRef}
                                controls
                            />
                            <i className="text-2xl text-pink-700 transition ease-out cursor-pointer transitio-colors fa-solid fa-download hover:text-pink-900"></i>
                            {/* <button onClick={togglePlay}>
                            {isPlaying ? "Pause" : "Play"}
                        </button> */}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="text-red-700">{errorMessage}</div>
                    )}
                </div>
            </div>
        </div>
    );
};
