"use client";

import { useState } from "react";
import { getPaymentToken } from "@/app/_lib/payment";
import { useRouter } from "next/navigation";

export default function PaymentButton({ booking }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlePayment() {
    setLoading(true);
    try {
      // 1. Get the Snap Token from Server Action
      const token = await getPaymentToken(booking.id, booking);

      // 2. Open Midtrans Popup
      if (window.snap) {
        window.snap.pay(token, {
          onSuccess: function (result) {
            alert("Payment success!");
            router.refresh(); // Refresh to update status
          },
          onPending: function (result) {
            alert("Waiting for your payment!");
          },
          onError: function (result) {
            alert("Payment failed!");
          },
          onClose: function () {
            alert("You closed the popup without finishing the payment");
          },
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to initialize payment");
    } finally {
      setLoading(false);
    }
  }

  // Only show button if unpaid
  if (booking.status === "checked-out" || booking.isPaid) return null; 
  // Note: You need to ensure your DB has an 'isPaid' boolean or rely on 'status'

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-accent-500 text-primary-800 px-4 py-2 font-bold hover:bg-accent-600 transition-colors disabled:bg-gray-500"
    >
      {loading ? "Processing..." : `Pay $${booking.totalPrice}`}
    </button>
  );
}