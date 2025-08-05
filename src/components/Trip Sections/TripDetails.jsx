import { Footprints, MapPin } from "lucide-react";

export default function TripDetails() {
  return (
    <section className="p-2">
      <div className="container">
        <h3 className="font-semibold text-2xl leading-none p-6 ">
          تفاصيل المسار خطوة بخطوة
        </h3>
        <div className=" rounded overflow-hidden shadow-lg border-2 rounded-l-2xlg  p-4 bg-[var(--secondary-color)]/20 border-[var(--secondary-color)]">
          <div className="px-6 py-4 flex items-start gap-4">
            <div className=" w-12 h-12 rounded-full bg-white border-2 border-[var(--main-color)] flex items-center justify-center text-[var(--main-color)]">
              <Footprints className=" " />
            </div>

            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
