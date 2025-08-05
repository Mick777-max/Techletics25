"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: {
      new (options: Record<string, unknown>): {
        open: () => void;
      };
    };
  }
}

type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type UserData = {
  name: string;
  email: string;
  phone: string;
};

type PaymentProps = {
  onSuccess: (details: { transactionId: string; amount: number }) => void;
  userData: UserData;
  eventPrice: number; // Fixed price from event selection
};

export default function Payment({ onSuccess, userData, eventPrice }: PaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setIsRazorpayReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handlePayment = async () => {
    if (!isRazorpayReady || !window.Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    if (!eventPrice || eventPrice <= 0) {
      alert("Invalid event price");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: eventPrice }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        alert("Server error: Invalid response from payment API");
        setIsProcessing(false);
        return;
      }

      if (!data.paymentId) {
        alert(data.error || "Failed to create payment order");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "",
        amount: eventPrice * 100, // Convert to paise
        currency: "INR",
        name: "Techletics CCE",
        description: "Event Registration",
        order_id: data.paymentId,
        handler: function (response: RazorpayHandlerResponse) {
          setToast("Payment done successfully");
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          console.log("Payment successful, calling onSuccess with:", {
            transactionId: response.razorpay_payment_id,
            amount: eventPrice
          });
          if (onSuccess) onSuccess({ transactionId: response.razorpay_payment_id, amount: eventPrice });
        },
        prefill: {
          name: userData.name || "",
          email: userData.email || "",
          contact: userData.phone ? (userData.phone.startsWith('+91') ? userData.phone : `+91${userData.phone}`) : "",
        },
        theme: {
          color: "#F37254",
        },
      };

      console.log("Razorpay options:", options);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Error processing payment: " + error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4">
      {toast && (
        <div className="mb-2 px-4 py-2 bg-green-500 text-white rounded shadow">
          {toast}
        </div>
      )}
      
      {/* Display user info and payment amount */}
      <div className="mb-4 p-4 bg-gray-50 rounded-md border">
        <h3 className="font-semibold text-gray-700 mb-3">Payment Details</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600"><strong>Name:</strong> {userData.name}</p>
          <p className="text-sm text-gray-600"><strong>Email:</strong> {userData.email}</p>
          <p className="text-sm text-gray-600"><strong>Phone:</strong> {userData.phone}</p>
          <div className="border-t pt-2 mt-3">
            <p className="text-lg font-bold text-blue-600">
              <strong>Amount to Pay: ₹{eventPrice}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handlePayment}
          disabled={isProcessing || !isRazorpayReady}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg w-full"
        >
          {isProcessing ? "Processing..." : `Pay ₹${eventPrice}`}
        </button>
      </div>
    </div>
  );
}