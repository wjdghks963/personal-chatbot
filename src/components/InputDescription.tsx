interface InputDescriptionProps {
    title:string;
    description:string;
    cssClassName?:string;
}

export default function InputDescription({title,description,cssClassName}: InputDescriptionProps){

    return <div className={`w-2/3 absolute p-2 bg-white border-blue-300 border-2 rounded-md shadow-md ${cssClassName}`}>
            <div className={"flex gap-2"}>
                <svg className={"w-7 text-blue-600"} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"></path>
                </svg>
                <span className={"font-semibold"}>{title}이란?</span>
            </div>

            <span className={"block mt-1"}>{description}</span>
    </div>
}