import HeroInfo from "./HeroInfo";
import MainHeader from "./MainHeader";
import SearchBox from "./SearchBox";

function HeroSection() {
    return (
        <div className="hero">
            <div className="container">
                <MainHeader />
                <SearchBox />
                <HeroInfo />
            </div>
        </div>
        
    )
}

export default HeroSection;