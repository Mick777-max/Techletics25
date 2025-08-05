"use client";

import { useState } from "react";
import Payment from "@/components/payment";

type College = { name: string };

export default function RegisterPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [regId, setRegId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    event: "",
    gender: "",
    sem: "",
    branch: "",
  });

  const [collegeSuggestions, setCollegeSuggestions] = useState<string[]>([]);
  const [branchSuggestions, setBranchSuggestions] = useState<string[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const events = [
    "Hackathon",
    "Tech Talk",
    "Coding Contest",
    "Workshop",
    "Robotics Challenge",
  ];

  const genders = ["Male", "Female", "Not prefer to say"];

  const sem = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

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
                const collegeNames = data.colleges.map(
                  (item: College) => item.name
                );
                setCollegeSuggestions(collegeNames);
              } else {
                setCollegeSuggestions([]);
              }
            })
            .catch((error) => {
              console.error(
                "Fetch error:",
                error instanceof Error ? error.message : String(error)
              );
              setCollegeSuggestions([]);
            });
        } else {
          setCollegeSuggestions([]);
        }
      }, 500);
      setTypingTimeout(timeout);
    }

    if (name === "branch") {
      const timeout = setTimeout(() => {
        if (value.trim().length >= 2) {
          fetch(`/api/branch?search=${encodeURIComponent(value)}`)
            .then(async (res) => {
              if (!res.ok) throw new Error(`Error: ${res.status}`);
              const data = await res.json();
              if (Array.isArray(data.branches)) {
                const branchNames = data.branches.map(
                  (item: { name: string; abbr: string }) =>
                    `${item.name} (${item.abbr})`
                );
                setBranchSuggestions(branchNames);
              } else {
                setBranchSuggestions([]);
              }
            })
            .catch((error) => {
              console.error("Fetch error:", error);
              setBranchSuggestions([]);
            });
        } else {
          setBranchSuggestions([]);
        }
      }, 500);
      setTypingTimeout(timeout);
    }
  };

  const handleSelectCollege = (collegeName: string) => {
    setFormData((prev) => ({ ...prev, college: collegeName }));
    setCollegeSuggestions([]);
  };

  const handleSelectBranch = (branchEntry: string) => {
    const nameOnly = branchEntry.split(" (")[0];
    setFormData((prev) => ({ ...prev, branch: nameOnly }));
    setBranchSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (!isValid) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // First, save the registration data to MongoDB
      const response = await fetch("/api/formdb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Store the registration ID for payment update
        setRegId(result.id);
        setFormSubmitted(true);
        setShowPayment(true);
        console.log("Registration saved with ID:", result.id);
      } else {
        alert("Registration failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Accept payment details and update registration in DB
  const handlePaymentSuccess = async (paymentDetails: { transactionId: string; amount: number }) => {
    if (!regId) {
      console.error("No registration ID available for payment update");
      alert("Error: Registration ID not found. Please try registering again.");
      return;
    }

    try {
      console.log("Sending PATCH to /api/formdb", { id: regId, ...paymentDetails });
      const res = await fetch("/api/formdb", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: regId, ...paymentDetails }),
      });
      
      const data = await res.json();
      console.log("PATCH response:", data);
      
      if (data.success) {
        setIsPaymentComplete(true);
        console.log("Payment updated successfully");
      } else {
        alert(data.error || "Failed to update payment info");
      }
    } catch (err) {
      alert("Payment update error");
      console.error("Payment update error:", err);
    }
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
              placeholder="Phone (WhatsApp)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              required
              suppressHydrationWarning={true}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              required
              suppressHydrationWarning={true}
            >
              <option value="">Select your gender</option>
              {genders.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>

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
              name="sem"
              value={formData.sem}
              onChange={handleChange}
              className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
              required
              suppressHydrationWarning={true}
            >
              <option value="">Select your Current Semester</option>
              {sem.map((sem, index) => (
                <option key={index} value={sem}>
                  {sem}
                </option>
              ))}
            </select>

            <div className="relative">
              <input
                type="text"
                name="branch"
                placeholder="Branch Name or Abbreviation"
                value={formData.branch}
                onChange={handleChange}
                className="w-full p-2 rounded-md border-2 border-gray-300 text-primary"
                required
                autoComplete="on"
                suppressHydrationWarning={true}
              />
              {branchSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md max-h-48 overflow-y-auto shadow-md">
                  {branchSuggestions.map((branch, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectBranch(branch)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black border-b border-gray-100 last:border-b-0"
                    >
                      {branch}
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
              disabled={isSubmitting}
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              suppressHydrationWarning={true}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </form>

          {formSubmitted && showPayment && (
            <div className="mt-6 w-full max-w-md">
              <p className="text-green-600 font-semibold mb-2 text-center">
                Form submitted successfully! Please proceed to payment.
              </p>
              <Payment onSuccess={handlePaymentSuccess} userData={formData}/>
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