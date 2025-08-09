import MotionFadeIn from '../UI/MotionFadeIn';

const Record = ({ h4, p, index }) => {
    return (
        <MotionFadeIn
            delay={0.6 + index * 0.2}
            className="record sm:grid-cols-1"
        >
            <h4 className="text-4xl font-extrabold">{h4}</h4>
            <p>{p}</p>
        </MotionFadeIn>
    );
};

export default Record;
