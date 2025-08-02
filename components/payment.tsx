'use client';

import React, { useEffect, useState } from 'react';

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

export default function Payment() {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setIsRazorpayReady(true);
    document.body.appendChild(script);
  }, []);

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
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || '',
        amount: Number(amount) * 100,
        currency: "INR",
        name: "Techletics",
        description: "Test Transaction",
        order_id: data.paymentId,
        handler: function (response: RazorpayHandlerResponse) {
          setToast('Payment done successfully');
          setAmount('');
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          // TODO: Send response to backend for verification
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
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
      <input
        type="number"
        min="1"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="border rounded px-2 py-1 mr-2"
        placeholder="Enter amount"
        disabled={isProcessing}
        suppressHydrationWarning
      />
      <button
        onClick={handlePayment}
        disabled={isProcessing || !isRazorpayReady}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isProcessing ? "Processing..." : `Pay ₹${amount || ''}`}
      </button>
    </div>
  );
}
