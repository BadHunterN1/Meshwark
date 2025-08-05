import TripDetails from "../components/Trip Sections/TripDetails";
import TripSummary from "../components/Trip Sections/TripSummary";
export default function TripPage() {
  return (
    <section>
      <div>
        <TripSummary />
        <TripDetails />
      </div>
    </section>
  );
}
