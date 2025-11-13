import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "@/app/_components/DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
        <div className="flex flex-col md:flex-row border border-primary-800 rounded-lg overflow-hidden">
      
       <div className="relative w-full h-40 md:w-32 md:h-auto md:aspect-square md:shrink-0">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover w-full h-full"
        />
      </div>

       <div className="flex-grow p-4 md:px-6 md:py-3 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg md:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

   <p className="text-base md:text-lg text-primary-300 mt-1">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        {/* Info Harga & Waktu Booking */}
        {/* Dibuat flex-wrap agar aman di mobile */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-auto items-baseline pt-2">
          <p className="text-lg md:text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-base md:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          {/* Dibuat full-width di mobile agar rapi, dan kembali ke ml-auto di desktop */}
          <p className="text-sm text-primary-400 w-full text-left md:w-auto md:ml-auto md:text-right">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* TOMBOL AKSI (EDIT & DELETE) */}
      {/* Mobile: Menjadi baris horizontal di bawah (border-t) */}
      {/* Desktop: Menjadi kolom vertikal di kanan (border-l) */}
      <div className="flex md:flex-col border-t md:border-t-0 md:border-l border-primary-800 md:w-[100px] md:shrink-0">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              // Dibuat rata tengah di mobile, rata kiri di desktop
              className="group flex flex-grow items-center justify-center md:justify-start gap-2 uppercase text-xs font-bold text-primary-300 border-r md:border-r-0 md:border-b border-primary-800 px-3 py-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            {/* PENTING: Komponen DeleteReservation Anda harus dibuat
              agar bisa menerima 'className' agar bisa responsif.
              Jika tidak bisa, bungkus dengan <div>.
              Saya asumsikan 'DeleteReservation' bisa di-style.
            */}
            <DeleteReservation 
              bookingId={id} 
              className="group flex flex-grow items-center justify-center md:justify-start gap-2 uppercase text-xs font-bold text-primary-300 px-3 py-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            />
          </>
        ) : (
          // Sediakan placeholder jika tidak ada aksi, agar layout desktop tetap konsisten
          <div className="hidden md:flex flex-grow"></div>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
