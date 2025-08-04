import { Quote } from "lucide-react"
import { Star } from "lucide-react"
const TestmonialCard = ({ p, emoji, name, title, record, description }) => {
    return (
        <section className='testmonial-card p-2 rounded-lg container bg-white/30 backdrop-invert backdrop-opacity-10 sm:my-2 md:my-2 md:mx-auto lg:mx-2'>
            <Quote size={40} color="#ffffff" className="bg-white/30 backdrop-invert backdrop-opacity-10 p-1 rounded-lg"/>
            <section className="flex justify-center yellow p-5 stars">
                <Star /><Star /><Star /><Star /><Star />
            </section>
            <p className="p-3">
                {p}
            </p>
            <p className="text-2xl">
                {emoji}
            </p>
            <h6 className="font-bold text-2xl">
                {name}
            </h6>
            <p className="grey">
                {title}
            </p>
            <h6>
                {record}
            </h6>
            <p>
                {description}
            </p>
        </section>
    )
}

export default TestmonialCard