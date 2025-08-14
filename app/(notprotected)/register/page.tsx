"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Payment from "@/components/payment";
import Image from "next/image";
import Link from "next/link";
import ShinyInput from "@/components/nurui/shiny-input";
import ShinySelect, { ShinyOption } from "@/components/nurui/shiny-select";

type College = { name: string };

type Event = {
  _id: string;
  name: string;
  price: number;
  poster?: string;
};

function RegisterPage() {
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [regId, setRegId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEventPrice, setSelectedEventPrice] = useState<number>(0);
  const [isChecked, setIsChecked] = useState(false);
  const [phoneError, setPhoneError] = useState<string>("");
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

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

  const genders = ["Male", "Female", "Not prefer to say"];
  const sem = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();

      if (data.success) {
        setEvents(data.events);
      } else {
        console.error("Failed to fetch events:", data.error);
        // Fallback to empty array if events can't be loaded
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  // Phone validation function for Indian mobile numbers
  const validateIndianPhone = (
    phone: string
  ): { isValid: boolean; error: string } => {
    // Remove any spaces, dashes, or other non-digit characters
    const cleanPhone = phone.replace(/\D/g, "");

    // Check if exactly 10 digits
    if (cleanPhone.length !== 10) {
      return {
        isValid: false,
        error: "Phone number must be exactly 10 digits",
      };
    }

    // Check if it starts with valid Indian mobile prefixes (6, 7, 8, 9)
    const firstDigit = cleanPhone[0];
    if (!["6", "7", "8", "9"].includes(firstDigit)) {
      return {
        isValid: false,
        error: "Indian mobile numbers must start with 6, 7, 8, or 9",
      };
    }

    return { isValid: true, error: "" };
  };

  // Play success audio when payment is completed and start redirect countdown
  useEffect(() => {
    if (isPaymentComplete) {
      const audio = new Audio("/audio/mohanlal .mp3"); // Adjust path as needed

      // Optional: Set volume (0.0 to 1.0)
      audio.volume = 0.7;

      // Play the audio with error handling
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
        // This is normal if user hasn't interacted with the page yet
      });

      // Start countdown timer for redirect
      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Use setTimeout to move router.push out of the render cycle
            setTimeout(() => {
              router.push("/");
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(countdownInterval);
    }
  }, [isPaymentComplete, router]);

  // Separate useEffect to handle redirect when countdown reaches 0
  useEffect(() => {
    if (redirectCountdown === 0 && isPaymentComplete) {
      router.push("/");
    }
  }, [redirectCountdown, isPaymentComplete, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Special handling for phone input
    if (name === "phone") {
      // Allow only digits and limit to 10 characters
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));

      // Validate phone number
      if (numericValue.length > 0) {
        const validation = validateIndianPhone(numericValue);
        setPhoneError(validation.error);
      } else {
        setPhoneError("");
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Handle event selection to show payment
    if (name === "event" && value) {
      const selectedEvent = events.find((event) => event.name === value);
      if (selectedEvent) {
        setSelectedEventPrice(selectedEvent.price);
        setShowPayment(true);
      }
    } else if (name === "event" && !value) {
      setShowPayment(false);
      setSelectedEventPrice(0);
    }

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

    // Check if all fields are filled
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (!isValid) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate phone number
    const phoneValidation = validateIndianPhone(formData.phone);
    if (!phoneValidation.isValid) {
      alert(
        "Please enter a valid Indian mobile number: " + phoneValidation.error
      );
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
  const handlePaymentSuccess = async (paymentDetails: {
    transactionId: string;
    amount: number;
  }) => {
    if (!regId) {
      console.error("No registration ID available for payment update");
      alert("Error: Registration ID not found. Please try registering again.");
      return;
    }

    try {
      console.log("Sending PATCH to /api/formdb", {
        id: regId,
        ...paymentDetails,
      });
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
    <section className="flex flex-col items-center justify-center min-h-screen p-6 bg-black">
      <h1 className="text-2xl font-bold mb-4 text-white mt-16">
        Registration for Techletics CCE Events
      </h1>

      {!isPaymentComplete && (
        <>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-3"
          >
            <ShinyInput
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              suppressHydrationWarning={true}
            />
            <ShinyInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              suppressHydrationWarning={true}
            />

            <div className="relative">
              <ShinyInput
                type="tel"
                name="phone"
                placeholder="Phone (WhatsApp)"
                value={formData.phone}
                onChange={handleChange}
                className={`${phoneError ? "border-red-500" : ""}`}
                required
                maxLength={10}
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
                suppressHydrationWarning={true}
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
              {formData.phone.length > 0 &&
                !phoneError &&
                formData.phone.length === 10 && (
                  <p className="text-green-500 text-xs mt-1">
                    ✓ Valid phone number
                  </p>
                )}
            </div>

            {/* <select
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
            </select> */}

            <ShinySelect
              name="gender"
              placeholder="Select your gender"
              value={formData.gender}
              onChange={handleChange}
              required
              suppressHydrationWarning={true}
            >
              {/* <ShinyOption value="">Select your gender</ShinyOption> */}
              {genders.map((gender, index) => (
                <ShinyOption key={index} value={gender}>
                  {gender}
                </ShinyOption>
              ))}
            </ShinySelect>

            <div className="relative">
              <ShinyInput
                type="text"
                name="college"
                placeholder="College Name"
                value={formData.college}
                onChange={handleChange}
                required
                autoComplete="on"
                suppressHydrationWarning={true}
              />
              {collegeSuggestions.length > 0 && (
                <ul className="absolute z-50 w-full bg-[#0d0e1e] border rounded-md max-h-48 overflow-y-auto shadow-md">
                  {collegeSuggestions.map((college, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectCollege(college)}
                      className="px-4 py-2 hover:bg-blue-600 cursor-pointer text-white last:border-b-0"
                    >
                      {college}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ShinySelect
              name="sem"
              placeholder="Select your Current Semester"
              value={formData.sem}
              onChange={handleChange}
              required
              suppressHydrationWarning={true}
              className="z-10"
            >
              {sem.map((sem, index) => (
                <ShinyOption key={index} value={sem}>
                  {sem}
                </ShinyOption>
              ))}
            </ShinySelect>

            <div className="relative">
              <ShinyInput
                type="text"
                name="branch"
                placeholder="Branch Name or Abbreviation"
                value={formData.branch}
                onChange={handleChange}
                required
                autoComplete="on"
                suppressHydrationWarning={true}
              />
              {branchSuggestions.length > 0 && (
                <ul className="absolute z-50 w-full bg-[#0d0e1e] border rounded-md max-h-48 overflow-y-auto shadow-md">
                  {branchSuggestions.map((branch, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectBranch(branch)}
                      className="px-4 py-2 hover:bg-blue-600 cursor-pointer text-white last:border-b-0"
                    >
                      {branch}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ShinySelect
              name="event"
              placeholder="Select an Event"
              value={formData.event}
              onChange={handleChange}
              required
              disabled={eventsLoading}
              suppressHydrationWarning={true}
              className="z-10"
            >
              {/* <ShinyOption value="">
                {eventsLoading ? "Loading events..." : "Select an Event"}
              </ShinyOption> */}
              {events.map((event) => (
                <ShinyOption key={event._id} value={event.name}>
                  {event.name} - ₹{event.price}
                </ShinyOption>
              ))}
            </ShinySelect>

            {eventsLoading && (
              <div className="text-center text-sm text-gray-500">
                Loading available events...
              </div>
            )}

            {events.length === 0 && !eventsLoading && (
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <p className="text-yellow-800 text-sm text-center">
                  No events are currently available for registration.
                </p>
              </div>
            )}

            {/* Show price and poster when event is selected */}
            {formData.event && (
              <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-black relative p-3 rounded-md">
                <p className="text-blue-400 font-semibold text-center">
                  Selected: {formData.event} - ₹{selectedEventPrice}
                </p>

                {/* Show event poster if available */}
                {events.find((e) => e.name === formData.event)?.poster && (
                  <div className="mt-3 flex justify-center">
                    <div className="relative w-32 h-40 border border-blue-300 rounded-md overflow-hidden">
                      <Image
                        src={
                          events.find((e) => e.name === formData.event)
                            ?.poster || ""
                        }
                        alt={`${formData.event} poster`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center space-x-2 p-4">
              <input
                id="terms"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required={true}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I have read and agree to all{" "}
                <Link href="/terms" passHref>
                  <span className="text-blue-600 underline hover:text-blue-800 cursor-pointer">
                    terms and conditions
                  </span>
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                formSubmitted ||
                phoneError !== "" ||
                eventsLoading ||
                events.length === 0
              }
              className={`mt-4 p-2 rounded-md transition-colors duration-200 disabled:cursor-not-allowed ${
                formSubmitted
                  ? "bg-gradient-to-tr from-slate-900 via-green-900 to-slate-900 text-white"
                  : "bg-gradient-to-tr from-slate-900 via-blue-900 to-slate-900 text-white hover:bg-blue-600 disabled:bg-gray-400"
              }`}
              suppressHydrationWarning={true}
            >
              {isSubmitting
                ? "Submitting..."
                : formSubmitted
                ? "For Payment Scroll Down ↓"
                : "Submit Registration"}
            </button>
          </form>

          {/* Show payment immediately when event is selected and form is submitted */}
          {showPayment && formSubmitted && (
            <div className="mt-6 w-full max-w-md">
              <p className="text-green-600 font-semibold mb-2 text-center">
                Form submitted successfully! Please proceed to payment.
              </p>
              <Payment
                onSuccess={handlePaymentSuccess}
                userData={{
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                }}
                eventPrice={selectedEventPrice}
              />
            </div>
          )}
        </>
      )}

      {isPaymentComplete && (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/image/mohanlal.png"
            alt="Success"
            width={300}
            height={300}
          />
          <div className="flex flex-row items-center justify-center mt-4 gap-2">
            <div className="ring-2 ring-green-500 rounded-full">
              <Image
                src="/icons/tick.gif"
                alt="Success"
                width={25}
                height={25}
                unoptimized={true}
              />
            </div>
            <h1 className="text-green-700 font-bold text-xl text-center">
              Registration Complete! Thank you for registering.
            </h1>
          </div>
          <p className="text-sm text-white mt-2 font-normal">
            We will contact you shortly
          </p>

          {/* Redirect countdown */}
          <div className="mt-4 text-center">
            <p className="text-sm text-blue-600 font-medium">
              Redirecting to home page in {redirectCountdown} seconds...
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm"
            >
              Go to Home Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default RegisterPage;
