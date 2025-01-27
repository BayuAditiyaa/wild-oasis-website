"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  createReservations,
  deleteBooking,
  updateBooking,
  updateGuest,
} from "@/app/_lib/data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  createReservations(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  updateGuest(session.user.guestId, updateData);

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  const guestId = session.user.guestId;
  if (!session) throw new Error("You must be logged in");

  deleteBooking(bookingId, guestId);

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  const guestId = session.user.guestId;
  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingId"));
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  updateBooking(bookingId, updateData, guestId);
  revalidatePath(`/account/reservations`);
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
