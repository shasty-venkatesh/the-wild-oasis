"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("invalid user");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(nationalID)) throw new Error("invalid nationID");

  const updatedGuest = { nationalID, nationality, countryFlag };
  console.log(session);
  const { data, error } = await supabase
    .from("guests")
    .update(updatedGuest)
    .eq("id", session.user.guestID);
  //   console.log("updated");
  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingID) {
  const session = await auth();
  if (!session) throw new Error("invalid user");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingID);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("invalid user");
  const id = formData.get("id");
  const numGuests = formData.get("numGuests");
  const observation = formData.get("observation");
  const updatedData = { id, numGuests, observation };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  // revalidatePath("/account/reservations/edit");
  redirect("/account/reservations");
}

export async function createBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("invalid user");
  const bookingDateRaw = formData.get("bookingData");
  const bookingDateData = JSON.parse(bookingDateRaw);
  const bookingData = {
    numGuests: formData.get("numGuests"),
    observation: formData.get("observations"),
    ...bookingDateData,
    extraPrice: 0,
    totalPrice: bookingDateData.cabinPrice,
    status: "unconfirmed",
    isPaid: false,
    hasBreakfast: false,
    guestId: session.user.guestID,
  };
  const { error } = await supabase.from("bookings").insert([bookingData]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath("/cabin");
  redirect("/cabins/thanks");
}
