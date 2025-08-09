import { Quote } from 'lucide-react';
import { Star } from 'lucide-react';
import MotionFadeIn from '../UI/MotionFadeIn';

const TestmonialCard = ({
    p,
    emoji,
    name,
    title,
    record,
    description,
    index,
}) => {
    return (
        <MotionFadeIn delay={0.15 + index * 0.2}>
            <div className="testmonial-card p-2 rounded-lg bg-white/30 backdrop-invert backdrop-opacity-10 my-2 mx-4">
                <Quote
                    size={40}
                    color="#ffffff"
                    className="bg-white/30 backdrop-invert backdrop-opacity-10 p-1 rounded-lg"
                />
                <div className="flex justify-center yellow p-5 stars">
                    <Star fill="yellow" />
                    <Star fill="yellow" />
                    <Star fill="yellow" />
                    <Star fill="yellow" />
                    <Star fill="yellow" />
                </div>
                <p className="p-3 text-xl">{p}</p>
                <p className="text-2xl">{emoji}</p>
                <h6 className="font-bold text-2xl">{name}</h6>
                <p className="grey">{title}</p>
                <h6>{record}</h6>
                <p>{description}</p>
            </div>
        </MotionFadeIn>
    );
};

export default TestmonialCard;
