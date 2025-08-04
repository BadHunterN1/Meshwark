import { MapPin } from "lucide-react";

export default function TripDetails() {
  return (
    <section className="p-2">
      <div className="container">
        <h3 className="font-semibold text-2xl leading-none p-6 ">
          تفاصيل المسار خطوة بخطوة
        </h3>
        <div className=" rounded overflow-hidden shadow-lg border-2 rounded-l-2xlg  p-4 bg-[var(--secondary-color)]/20 border-[var(--secondary-color)]">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
