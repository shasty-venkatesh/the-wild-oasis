import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const session = await auth();
  try {
    const [settings, bookingDates] = await Promise.all([
      getSettings(),
      getBookedDatesByCabinId(cabin.id),
    ]);
    console.log(bookingDates);

    return (
      <div className="flex flex-col-2 border border-primary-800 justify-between items-center p-4  w-[90rem] ml-[-9rem]">
        <DateSelector
          settings={settings}
          cabin={cabin}
          bookingDates={bookingDates}
        />
        {session?.user ? (
          <ReservationForm cabin={cabin} user={session.user} />
        ) : (
          <LoginMessage />
        )}
      </div>
    );
  } catch (error) {
    console.error("Failed to load reservation data:", error);
    return (
      <div className="text-red-500 font-semibold">
        Failed to load reservation data: {error.message || "Unknown error"}
      </div>
    );
  }
}

export default Reservation;
