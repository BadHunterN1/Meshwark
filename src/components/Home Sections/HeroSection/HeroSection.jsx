import SearchBox from "./SearchBox";

function HeroSection() {
    return (
        <div className="hero">
            <div className="holder">
                <div className="main-heading">
                    <h1>
                        اكتشف أفضل طريق <span>في المنصورة</span>
                    </h1>
                    <p>
                        تطبيق النقل العام الذكي يساعدك في العثور على أسرع الطرق والمواصلات المتاحة
                    </p>
                </div>
                <SearchBox />
                <p className="hero-info">
                    ✨ أكثر من 1000+ طريق متاح | 🚌 تغطية شاملة للمنصورة | ⚡ نتائج فورية
                </p>
            </div>
        </div>
        
    )
}

export default HeroSection;