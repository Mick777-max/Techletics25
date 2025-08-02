"use client";

import { useState } from "react";
import Payment from "@/components/payment";

type College = { name: string };

export default function RegisterPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    event: "",
  });

  const [collegeSuggestions, setCollegeSuggestions] = useState<string[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const events = [
    "Hackathon",
    "Tech Talk",
    "Coding Contest",
    "Workshop",
    "Robotics Challenge",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "college") {
      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => {
        if (value.trim().length >= 2) {
          fetch(`/api/colleges?search=${encodeURIComponent(value)}`)
            .then(async (res) => {
              if (!res.ok) throw new Error(`Error: ${res.status}`);
              const data = await res.json();
              // Expecting { colleges: [{ name: string }] }
              if (Array.isArray(data.colleges)) {
                const collegeNames = data.colleges.map((item: College) => item.name);
                setCollegeSuggestions(collegeNames);
              } else {
                setCollegeSuggestions([]);
              }
            })
            .catch((error) => {
              console.error("Fetch error:", error instanceof Error ? error.message : String(error));
              setCollegeSuggestions([]);
            });
        } else {
          setCollegeSuggestions([]);
        }
      }, 500);
      setTypingTimeout(timeout);
    }
  };

  const handleSelectCollege = (collegeName: string) => {
    setFormData((prev) => ({ ...prev, college: collegeName }));
    setCollegeSuggestions([]);
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
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-3"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              required
              suppressHydrationWarning={true}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              required
              suppressHydrationWarning={true}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              required
              suppressHydrationWarning={true}
            />

            <div className="relative">
              <input
                type="text"
                name="college"
                placeholder="College Name"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
                required
                autoComplete="on"
                suppressHydrationWarning={true}
              />
              {collegeSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md max-h-48 overflow-y-auto shadow-md">
                  {collegeSuggestions.map((college, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectCollege(college)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black border-b border-gray-100 last:border-b-0"
                    >
                      {college}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <select
              name="event"
              value={formData.event}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              required
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
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
              suppressHydrationWarning={true}
            >
              Submit Registration
            </button>
          </form>

          {formSubmitted && showPayment && (
            <div className="mt-6 w-full max-w-md">
              <p className="text-green-600 font-semibold mb-2 text-center">
                Form submitted successfully! Please proceed to payment.
              </p>
              <Payment onSuccess={handlePaymentSuccess} />
            </div>
          )}
        </>
      )}

      {isPaymentComplete && (
        <div className="text-green-700 font-bold text-xl mt-6 text-center">
          ✅ Registration Complete! Thank you for registering.
          <p className="text-sm text-gray-600 mt-2 font-normal">
            We will contact you shortly.
          </p>
        </div>
      )}
    </section>
  );
}