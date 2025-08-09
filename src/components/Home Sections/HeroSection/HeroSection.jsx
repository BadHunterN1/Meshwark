import { lazy, Suspense } from 'react';
import heroBg from '../../../assets/Images/HomePage/background.webp';
const SearchBox = lazy(() => import('./SearchBox'));

function HeroSection() {
    return (
        <div className="hero relative">
            {/* Preload hero background image with high priority without affecting layout */}
            <img
                src={heroBg}
                fetchpriority="high"
                alt=""
                aria-hidden="true"
                className="hidden"
            />
            <div className="holder p-2 sm:p-7 max-sm:min-h-[calc(100vh-60px)] flex justify-center items-center flex-col w-full min-h-[calc(100vh-72px)]">
                <div className="main-heading">
                    <div className="w-fit text-center rounded-2xl p-1.5 mx-auto border mb-4">
                        <span>اهلا بك في مشوارك</span>
                        <span className="wave-animation inline-block">👋</span>
                    </div>
                    <h1 className="text-7xl font-bold max-w-[17ch] text-wrap text-center m-auto leading-none max-lg:text-[2rem]">
                        اكتشف أفضل طريق{' '}
                        <span className="text-[var(--h1-text-glow)]">
                            في المنصورة
                        </span>
                    </h1>
                    <p className="text-2xl w-fit mt-8 mb-8 ml-auto mr-auto max-lg:text-[1rem] max-lg:text-center max-lg:mt-[10px]">
                        تطبيق النقل العام الذكي يساعدك في العثور على أسرع الطرق
                        والمواصلات المتاحة
                    </p>
                </div>
                <Suspense
                    fallback={
                        <div className=" w-[50%] h-[200px]">
                            <div className="flex justify-center items-center w-full h-full bg-(--glass-bg) animate-pulse rounded-2xl">
                                جاري التحميل...
                            </div>
                        </div>
                    }
                >
                    <SearchBox />
                </Suspense>
                <p className="hero-info mt-14 max-lg:text-center max-lg:mt-[40px] max-lg:ml-2.5 max-lg:mr-2.5">
                    ✨ أكثر من 1000+ طريق متاح | 🚌 تغطية شاملة للمنصورة | ⚡
                    نتائج فورية{' '}
                </p>
            </div>
        </div>
    );
}

export default HeroSection;
