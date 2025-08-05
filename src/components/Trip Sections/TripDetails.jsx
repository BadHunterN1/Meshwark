import { Footprints, MapPin, Bus, Star } from "lucide-react";

const stations = ["محطة المستشفى", "محطة التحرير", "محطة البنك الأهلي"];

export default function TripDetails() {
  return (
    <section className="p-4">
      <div className="container  p-4 shadow-2xl rounded-2xl ">
        <h3 className="font-semibold  text-xl md:text-2xl leading-none p-6 ">
          تفاصيل المسار خطوة بخطوة
        </h3>

        <Box active num={1} />
        <Box num={2} stations={stations} />
        <Box active num={3} />
      </div>
      <div className="container ">
        <div className="mt-8 flex flex-row gap-4 ">
          <button className="inline-flex items-center justify-center gap-4 whitespace-nowrap cursor-pointer text-sm text-white font-medium bg-[var(--main-color)] h-11 rounded-md px-8 flex-1">
            <MapPin />
            عرض على الخريطة
          </button>
        </div>
      </div>
    </section>
  );
}

const Box = ({ active, num, stations }) => {
  return (
    <>
      <div
        className={`box my-4   overflow-hidden  border-2 rounded-2xl  p-2  ${
          active
            ? "bg-[var(--secondary-color)]/20 border-[var(--secondary-color)]"
            : "border-[#eaeef6] bg-[#eaeef6]/20"
        } `}
      >
        <div className="sm:m-auto px-4 py-4 flex flex-col  items-start gap-4  ">
          <div
            className={` sm:flex-row  w-12 h-12 rounded-full bg-white border-2 border-[var(--main-color)] flex items-center justify-center text-[var(--main-color)]  `}
          >
            {active ? (
              <Footprints className=" w-20" />
            ) : (
              <Bus className="w-20" />
            )}
          </div>
          <div className="">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full border border-gray-300  px-2.5 py-0.5 text-xs font-semibold      ">
                {active ? "مشي" : "ميكروباص"}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 text-sm text-gray-400   ">
                الخطوة {num}
              </span>
            </div>
            <h3 className="font-bold flex flex-wrap items-center gap-2 mb-2">
              امشِ إلى محطة الجامعة الرئيسية
            </h3>
            <div className="flex  gap-4 text-sm mb-3">
              <span className=" text-xm text-gray-400 ">
                المدة:
                <span className=" text-black inline-flex items-center px-0.5 py-0.5 text-xs font-semibold ">
                  دقائق
                </span>
              </span>

              <div className="mx-4 ">
                <span className=" text-xm text-gray-400 ">
                  المسافة:
                  <span className=" text-black inline-flex items-center px-0.5 py-0.5 text-xs font-semibold ">
                    متر
                  </span>
                </span>
              </div>
            </div>
            <div className="text-l text-gray-500 ">
              اتجه شمالاً من بوابة الجامعة
            </div>

            <div>
              {active ? null : (
                <>
                  <h3 className="font-semibold flex flex-wrap items-center gap-2  py-2   ">
                    المحطات في الطريق:
                  </h3>
                  <div className="flex  gap-2 flex-wrap">
                    {stations.map((station) => (
                      <span className="text-xs inline-flex items-center rounded-full text-white px-2.5 py-0.5 font-semibold bg-[var(--secondary-color)]">
                        {station}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
