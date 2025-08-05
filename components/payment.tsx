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

// Add the userData type and update PaymentProps
type UserData = {
  name: string;
  email: string;
  phone: string;
};

type PaymentProps = {
  onSuccess: (details: { transactionId: string; amount: number }) => void;
  userData: UserData; // Add this line
};

export default function Payment({ onSuccess, userData }: PaymentProps) {
  const [amount, setAmount] = useState("");
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

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
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
        amount: Number(amount) * 100,
        currency: "INR",
        name: "Techletics CCE",
        description: "Event Registration",
        order_id: data.paymentId,
        handler: function (response: RazorpayHandlerResponse) {
          setToast("Payment done successfully");
          setAmount("");
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          console.log("Payment successful, calling onSuccess with:", {
            transactionId: response.razorpay_payment_id,
            amount: Number(amount)
          });
          if (onSuccess) onSuccess({ transactionId: response.razorpay_payment_id, amount: Number(amount) });
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
      
      {/* Display user info for confirmation */}
      <div className="mb-4 p-3 bg-gray-50 rounded-md">
        <h3 className="font-semibold text-gray-700 mb-2">Payment Details for:</h3>
        <p className="text-sm text-gray-600"><strong>Name:</strong> {userData.name}</p>
        <p className="text-sm text-gray-600"><strong>Email:</strong> {userData.email}</p>
        <p className="text-sm text-gray-600"><strong>Phone:</strong> {userData.phone}</p>
      </div>

      <div className="flex flex-col sm:flex-col md:flex-row items-center justify-center gap-5">
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded px-4 py-2 mr-2 text-primary"
          placeholder="Enter amount"
          disabled={isProcessing}
          suppressHydrationWarning
        /> 
        <button
          onClick={handlePayment}
          disabled={isProcessing || !isRazorpayReady}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:w-fit sm:w-full w-full"
        >
          {isProcessing ? "Processing..." : `Pay ₹${amount || ""}`}
        </button>
      </div>
    </div>
  );
}