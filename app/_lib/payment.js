"use server";

import { auth } from "./auth";
import { getBooking } from "./data-service"; // Ensure you have this function
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";

export async function getPaymentToken(bookingId, bookingData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Initialize Snap
  let snap = new midtransClient.Snap({
    isProduction: process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  // Calculate gross amount (must be integer)
  const grossAmount = Math.round(bookingData.totalPrice);

  // Create Parameter
  let parameter = {
    transaction_details: {
      // order_id must be unique. Combining bookingId with a UUID helps if they retry payment
      order_id: `BOOKING-${bookingId}-${uuidv4().split("-")[0]}`,
      gross_amount: grossAmount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: session.user.name,
      email: session.user.email,
    },
    item_details: [
      {
        id: bookingId,
        price: grossAmount,
        quantity: 1,
        name: `Cabin Reservation #${bookingId}`,
      },
    ],
    // Custom field to help us identify the booking ID in the webhook later
    custom_field1: bookingId, 
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return transaction.token;
  } catch (error) {
    console.error("Midtrans Error:", error);
    throw new Error("Failed to create payment token");
  }
}