import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeednackContentStepPops{
    feedbackType: FeedbackType;
    onFeedbackRestartRequested:() => void;
    onFeedbackSent:() => void;
}

export function FeedbackContentStep({
    feedbackType, 
    onFeedbackRestartRequested,
    onFeedbackSent
}: FeednackContentStepPops){   

    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('');

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleSubmitFeedback(event: FormEvent){
        event.preventDefault();
        console.log({
            screenshot,
            comment
        })

        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button 
                    type="button" 
                    onClick={onFeedbackRestartRequested}
                    className=" top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft width="bold" className="w-4 h-4"></ArrowLeft>
                </button>
                <span className="text-xl items-center leading-6 flex items-center gap-2">
                    <img className="w-6 h-6 " src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-sinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:right-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="flex gap-3 mt-2">

                   <ScreenshotButton
                        screnshot={screenshot}
                        onScreenshotTook ={setScreenshot}
                   />

                    <button
                        type="submit"
                        disabled={comment.length === 0}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        Enviar feedback
                    </button>
                </footer>
            </form>
        </>

    )
}