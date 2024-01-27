interface IProps {
    text: string;
}
export const UserMessage = ({ text }: IProps) => {
    return (
        <div className="col-start-5 col-end-13 p-3 rounded-lg">
            <div className="flex flex-row-reverse items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    User
                </div>
                <div className="relative mr-3 text-sm bg-indigo-700 bg-opacity-75 py-2 px-4 shadow rounded-xl">
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};
