import { MapPin } from "lucide-react";

export default function TripDetails() {
  return (
    <div className="container p-6 h-50 w-50]">
      <section className="details">
        <h3 className="font-semibold text-2xl leading-none p-6">
          تفاصيل المسار خطوة بخطوة
        </h3>
        <div class="max-w-sm rounded overflow-hidden shadow-lg border-2 rounded-l-2xlg  p-4 bg-[var(--secondary-color)]/20 border-[var(--secondary-color)]">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
