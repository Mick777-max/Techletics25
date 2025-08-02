"use client";

import { useState } from "react";
import Payment from "@/components/payment";

export default function RegisterPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    // address: "",
    event: "",
  });

  const events = [
    "Hackathon",
    "Tech Talk",
    "Coding Contest",
    "Workshop",
    "Robotics Challenge",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!isValid) {
      alert("Please fill in all fields.");
      return;
    }

    setFormSubmitted(true);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentComplete(true);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">
        Registration for Techletics CCE Events
      </h1>

      {!isPaymentComplete && (
        <>
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3" suppressHydrationWarning={true}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              suppressHydrationWarning={true}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              suppressHydrationWarning={true}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              suppressHydrationWarning={true}
            />
            <input
              type="text"
              name="college"
              placeholder="College Name"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              suppressHydrationWarning={true}
            />
            {/* <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              rows={4}
              suppressHydrationWarning={true}
            /> */}
            <select
              name="event"
              value={formData.event}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              suppressHydrationWarning={true}
            >
              <option value="">Select an Event</option>
              {events.map((event, index) => (
                <option key={index} value={event}>
                  {event}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
              suppressHydrationWarning={true}
            >
              Submit
            </button>
          </form>

          {formSubmitted && showPayment && (
            <div className="mt-6">
              <p className="text-green-600 font-semibold mb-2">
                Form submitted! Please proceed to payment.
              </p>
              <Payment onSuccess={handlePaymentSuccess} />
            </div>
          )}
        </>
      )}

      {isPaymentComplete && (
        <div className="text-green-700 font-bold text-xl mt-6">
          ✅ Registration complete! Thank you.
        </div>
      )}
    </section>
  );
}
