import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import midtransClient from "midtrans-client";

export async function POST(request) {
  const body = await request.json();

  // 1. Verify Signature Key (Security)
  const apiClient = new midtransClient.Snap({
    isProduction: process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  const statusResponse = await apiClient.transaction.notification(body);
  const orderId = statusResponse.order_id;
  const transactionStatus = statusResponse.transaction_status;
  const fraudStatus = statusResponse.fraud_status;
  
  // Retrieve the booking ID we sent in custom_field1
  // Note: Midtrans might return this in different places depending on payment type
  // Or parse it from order_id if you formatted it like BOOKING-123-UUID
  const bookingId = orderId.split('-')[1]; 

  console.log(`Transaction notification received. Order ID: ${orderId}. Transaction Status: ${transactionStatus}. Fraud Status: ${fraudStatus}`);

  // 2. Initialize Supabase Admin (Bypasses RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // You need to add this to .env.local
  );

  // 3. Update Logic
  if (transactionStatus == 'capture' || transactionStatus == 'settlement') {
    if (fraudStatus == 'challenge') {
      // Handle challenge
    } else if (fraudStatus == 'accept') {
      // Update DB to Paid
      const { error } = await supabase
        .from("bookings")
        .update({ isPaid: true, status: "confirmed" }) // Adjust column names
        .eq("id", bookingId);
        
      if(error) console.error("Supabase Update Error", error);
    }
  } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
      // Update DB to Cancelled
      await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId);
  }

  return NextResponse.json({ status: "success" });
}