'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { eventList } from './eventsList';

type College = { name: string };

function RegisterPage() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    event: '',
    gender: '',
    sem: '',
    branch: '',
    teamMembers: [] as string[],
  });

  const [collegeSuggestions, setCollegeSuggestions] = useState<string[]>([]);
  const [branchSuggestions, setBranchSuggestions] = useState<string[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const [currentTeamCount, setCurrentTeamCount] = useState<number>(0);

  const genders = ['Male', 'Female', 'Not prefer to say'];
  const sem = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

  // ✅ Phone validation
  const validateIndianPhone = (
    phone: string,
  ): { isValid: boolean; error: string } => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10)
      return {
        isValid: false,
        error: 'Phone number must be exactly 10 digits',
      };
    const firstDigit = cleanPhone[0];
    if (!['6', '7', '8', '9'].includes(firstDigit))
      return {
        isValid: false,
        error: 'Phone number must start with 6, 7, 8, or 9',
      };
    return { isValid: true, error: '' };
  };

  // ✅ Name validation
  const validateName = (name: string): { isValid: boolean; error: string } => {
    if (!/^[A-Za-z\s]+$/.test(name))
      return {
        isValid: false,
        error: 'Name must only contain letters and spaces.',
      };
    if (name.trim().length > 50)
      return { isValid: false, error: 'Name cannot exceed 50 characters.' };
    return { isValid: true, error: '' };
  };

  // ✅ Team Members validation — uses validateName internally
  const validateTeamMembers = (members: string[]): string[] => {
    const errors: string[] = [];
    members.forEach((member, idx) => {
      const { isValid, error } = validateName(member);
      if (!isValid) errors.push(`Team member ${idx + 2}: ${error}`);
    });
    return errors;
  };

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'event') {
      const selected = eventList.find((e) => e.name === value);

      if (selected) {
        // If it's a team event
        if (selected.maxTeamSize && selected.maxTeamSize > 1) {
          setFormData((prev) => ({
            ...prev,
            event: value,
            teamMembers: [], // initially none
          }));
          setCurrentTeamCount(2); // min 2 by default
        } else {
          // Individual event
          setFormData((prev) => ({
            ...prev,
            event: value,
            teamMembers: [],
          }));
          setCurrentTeamCount(0);
        }
        return;
      }
    }

    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // 🏫 Fetch college suggestions
    if (name === 'college') {
      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => {
        if (value.trim().length >= 2) {
          fetch(`/api/colleges?search=${encodeURIComponent(value)}`)
            .then(async (res) => {
              if (!res.ok) throw new Error(`Error: ${res.status}`);
              const data = await res.json();
              if (Array.isArray(data.colleges)) {
                const collegeNames = data.colleges.map(
                  (item: College) => item.name,
                );
                setCollegeSuggestions(collegeNames);
              } else setCollegeSuggestions([]);
            })
            .catch(() => setCollegeSuggestions([]));
        } else setCollegeSuggestions([]);
      }, 500);
      setTypingTimeout(timeout);
    }

    // 🧠 Fetch branch suggestions
    if (name === 'branch') {
      const timeout = setTimeout(() => {
        if (value.trim().length >= 2) {
          fetch(`/api/branch?search=${encodeURIComponent(value)}`)
            .then(async (res) => {
              if (!res.ok) throw new Error(`Error: ${res.status}`);
              const data = await res.json();
              if (Array.isArray(data.branches)) {
                const branchNames = data.branches.map(
                  (item: { name: string; abbr: string }) =>
                    `${item.name} (${item.abbr})`,
                );
                setBranchSuggestions(branchNames);
              } else setBranchSuggestions([]);
            })
            .catch(() => setBranchSuggestions([]));
        } else setBranchSuggestions([]);
      }, 500);
      setTypingTimeout(timeout);
    }
  };

  const handleSelectCollege = (collegeName: string) => {
    setFormData((prev) => ({ ...prev, college: collegeName }));
    setCollegeSuggestions([]);
  };

  const handleSelectBranch = (branchEntry: string) => {
    const nameOnly = branchEntry.split(' (')[0];
    setFormData((prev) => ({ ...prev, branch: nameOnly }));
    setBranchSuggestions([]);
  };

  // ✅ Payment proof upload – clears related error immediately
  const handlePaymentProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPaymentProof(file);

    if (file) {
      setFormErrors((prev) =>
        prev.filter(
          (err) => err !== 'Please upload payment proof before submitting.',
        ),
      );
    }
  };

  // ✅ Validate phone on blur
  const handlePhoneBlur = () => {
    const { isValid, error } = validateIndianPhone(formData.phone);
    setFormErrors((prev) => {
      const filtered = prev.filter(
        (err) =>
          !err.includes('Phone number must be exactly') &&
          !err.includes('Phone number must start with'),
      );
      if (!isValid) return [...filtered, error];
      return filtered;
    });
  };

  // ✅ Validate name on blur
  const handleNameBlur = () => {
    const { isValid, error } = validateName(formData.name);
    setFormErrors((prev) => {
      const filtered = prev.filter(
        (err) =>
          !err.includes('Name must only contain letters') &&
          !err.includes('Name cannot exceed'),
      );
      if (!isValid) return [...filtered, error];
      return filtered;
    });
  };

  // ✅ Validate a specific teammate on blur
  const handleTeamMateBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const { isValid, error } = validateName(e.target.value);
    setFormErrors((prev) => {
      const filtered = prev.filter(
        (err) => !err.startsWith(`Team member ${idx + 2}:`),
      );

      if (!isValid) return [...filtered, `Team member ${idx + 2}: ${error}`];
      return filtered;
    });
  };

  // ✅ Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    const isValid = Object.entries(formData).every(([key, value]) => {
      if (key === 'teamMembers') {
        return (
          Array.isArray(value) && value.every((member) => member.trim() !== '')
        );
      }
      return typeof value === 'string' && value.trim() !== '';
    });
    if (!isValid) errors.push('Please fill in all fields.');

    const selectedEvent = eventList.find(
      (event) => event.name === formData.event,
    );

    // ✅ Only require payment proof if event has a fee
    if (selectedEvent && selectedEvent.registrationFee > 0 && !paymentProof) {
      errors.push('Please upload payment proof before submitting.');
    }

    // Validate phone & name again before final submit
    const phoneValidation = validateIndianPhone(formData.phone);
    if (!phoneValidation.isValid) errors.push(phoneValidation.error);

    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) errors.push(nameValidation.error);

    const teamErrors = validateTeamMembers(formData.teamMembers);
    if (teamErrors.length > 0) errors.push(...teamErrors);

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    setIsSubmitting(true);
    try {
      console.log('Registration data:', formData, paymentProof);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate upload
      setFormSubmitted(true);

      // ✅ Reset form fields after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        college: '',
        event: '',
        gender: '',
        sem: '',
        branch: '',
        teamMembers: [],
      });
      setPaymentProof(null);
      setIsChecked(false);
      setCurrentTeamCount(0);

      // ✅ Redirect after 3 seconds
      setTimeout(() => {
        router.push('/events');
      }, 3000);
    } catch {
      // ✅ Handle failure
      setFormErrors(['Registration failed. Please try again.']);
    } finally {
      // ✅ Always stop loading state
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-quarternary px-[1.8rem] py-[3.5rem]">
      <h1 className="mb-4 mt-16 font-orbitron text-3xl font-bold text-secondary">
        Register for Techletics &apos;25
      </h1>

      <form
        onSubmit={handleSubmit}
        className="shadow-secondary/30 flex w-full max-w-md flex-col gap-4 rounded-xl bg-[#1b1b1b] p-6 shadow-md"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Your Full Name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleNameBlur} // ✅ Validate on blur
          required
          className="rounded-md bg-tertiary px-3 py-2 font-orbitron text-quarternary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="rounded-md bg-tertiary px-3 py-2 font-orbitron text-quarternary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Enter Your Phone Number (WhatsApp)"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handlePhoneBlur} // ✅ Validate on blur
          required
          maxLength={10}
          className="w-full rounded-md bg-tertiary px-3 py-2 font-orbitron text-quarternary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        {/* Gender */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className={`rounded-md bg-tertiary px-3 py-2 font-orbitron focus:ring-2 focus:ring-secondary ${
            !formData.gender ? 'text-gray-400' : 'text-quarternary'
          }`}
        >
          <option value="" disabled hidden>
            Select your gender
          </option>
          {genders.map((gender, i) => (
            <option
              key={i}
              value={gender}
              className="font-orbitron text-quarternary"
            >
              {gender}
            </option>
          ))}
        </select>

        {/* College */}
        <div className="relative">
          <input
            type="text"
            name="college"
            placeholder="Select Your College"
            value={formData.college}
            onChange={handleChange}
            required
            className="w-full rounded-md bg-tertiary px-3 py-2 font-orbitron text-quarternary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          {collegeSuggestions.length > 0 && (
            <ul className="absolute z-50 max-h-48 w-full overflow-y-auto rounded-md border border-secondary bg-quarternary shadow-md">
              {collegeSuggestions.map((college, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectCollege(college)}
                  className="cursor-pointer px-4 py-2 font-mono text-tertiary hover:bg-secondary hover:text-quarternary"
                >
                  {college}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Semester */}
        <select
          name="sem"
          value={formData.sem}
          onChange={handleChange}
          required
          className={`rounded-md bg-tertiary px-3 py-2 font-orbitron focus:ring-2 focus:ring-secondary ${
            !formData.sem ? 'text-gray-400' : 'text-quarternary'
          }`}
        >
          <option value="">Current Semester</option>
          {sem.map((s, i) => (
            <option key={i} value={s} className="text-quarternary">
              {s}
            </option>
          ))}
        </select>

        {/* Branch */}
        <div className="relative">
          <input
            type="text"
            name="branch"
            placeholder="Branch Name or Abbreviation"
            value={formData.branch}
            onChange={handleChange}
            required
            className="w-full rounded-md bg-tertiary px-3 py-2 font-orbitron text-quarternary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          {branchSuggestions.length > 0 && (
            <ul className="absolute z-50 max-h-48 w-full overflow-y-auto rounded-md border border-secondary bg-quarternary shadow-md">
              {branchSuggestions.map((branch, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectBranch(branch)}
                  className="cursor-pointer px-4 py-2 font-mono text-tertiary hover:bg-secondary hover:text-quarternary"
                >
                  {branch}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Event */}
        <select
          name="event"
          value={formData.event}
          onChange={handleChange}
          required
          className={`rounded-md bg-tertiary px-3 py-2 font-orbitron ${
            formData.event ? 'text-quarternary' : 'text-gray-400'
          } focus:ring-2 focus:ring-secondary`}
        >
          <option value="" disabled>
            Select an Event
          </option>
          {eventList.map((event, index) => (
            <option key={index} value={event.name} className="text-quarternary">
              {event.name}
            </option>
          ))}
        </select>

        {/* Event Details (after selecting) */}
        {(() => {
          const currentEvent = eventList.find(
            (event) => event.name === formData.event,
          );

          if (!currentEvent) return null;

          return (
            <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
              <div className="flex w-full items-center justify-center">
                <Image
                  src={currentEvent?.src}
                  alt="Event Poster"
                  width={100}
                  height={100}
                  className="w-[80%]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center break-words text-center font-orbitron text-3xl font-bold text-secondary">
                <span className="whitespace-normal break-words text-center">
                  {currentEvent.name}
                </span>
              </div>

              <div className="font-orbitron text-3xl font-bold text-tertiary">
                <span>{currentEvent.date}</span>
              </div>

              <div className="rounded-full border border-secondary bg-secondary px-4 py-2 font-orbitron text-4xl font-bold text-quarternary transition-all duration-300 hover:scale-110 hover:brightness-125">
                {currentEvent.registrationFee === 0
                  ? 'Free'
                  : `₹ ${currentEvent.registrationFee}`}
              </div>

              <div className="font-orbitron text-xl font-bold text-tertiary">
                {currentEvent.maxTeamSize && currentEvent.maxTeamSize > 1 && (
                  <div className="flex flex-col items-center justify-center">
                    <div>
                      <span>Max Team Size:</span>{' '}
                      <span className="text-2xl text-secondary">
                        {currentEvent.maxTeamSize}
                      </span>
                    </div>

                    {/* Select actual team size */}
                    <div className="mt-2">
                      <label className="mr-2 font-orbitron text-xl text-tertiary">
                        Select Team Size:
                      </label>
                      <select
                        value={currentTeamCount || 2}
                        onChange={(e) => {
                          const count = parseInt(e.target.value);
                          setCurrentTeamCount(count);
                          setFormData((prev) => ({
                            ...prev,
                            teamMembers: Array(count - 1).fill(''),
                          }));
                        }}
                        className="rounded-md bg-secondary px-3 py-2 font-orbitron text-quarternary focus:ring-2 focus:ring-secondary"
                      >
                        {Array.from(
                          { length: currentEvent.maxTeamSize },
                          (_, i) => i + 1,
                        ).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Teammate inputs */}
                    <div className="mt-3 flex w-full flex-col gap-3">
                      {Array.from({ length: currentTeamCount - 1 }).map(
                        (_, idx) => (
                          <input
                            key={idx}
                            type="text"
                            name={`teamMember-${idx}`}
                            placeholder={`Team Member ${idx + 2} Name`}
                            value={formData.teamMembers[idx] || ''}
                            onChange={(e) => {
                              const updated = [...formData.teamMembers];
                              updated[idx] = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                teamMembers: updated,
                              }));
                            }}
                            onBlur={(e) => handleTeamMateBlur(e, idx)}
                            required
                            className="rounded-md bg-tertiary px-3 py-2 font-orbitron text-quarternary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                          />
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ✅ QR + Payment Proof Section */}
        {/* ✅ QR + Payment Proof Section */}
        {(() => {
          const selectedEvent = eventList.find(
            (event) => event.name === formData.event,
          );

          if (
            selectedEvent &&
            selectedEvent.registrationFee > 0 &&
            formData.name &&
            formData.email &&
            formData.phone &&
            formData.gender &&
            formData.college &&
            formData.branch &&
            formData.sem
          ) {
            return (
              <div className="bg-quarternary/40 rounded-md border border-secondary p-4 text-center">
                <h2 className="mb-3 font-orbitron text-lg font-semibold text-secondary">
                  Complete Your Payment
                </h2>

                <p className="mb-2 font-mono text-sm text-tertiary">
                  Registration Fee: ₹{selectedEvent.registrationFee}
                </p>

                <div className="mb-3 flex justify-center">
                  <Image
                    src="/image/qr-code.png"
                    alt="Payment QR Code"
                    width={150}
                    height={150}
                    className="rounded-md border border-secondary shadow-md"
                  />
                </div>

                <p className="mb-2 font-mono text-sm text-tertiary">
                  Scan the QR to make your payment. Then upload your proof
                  below.
                </p>

                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handlePaymentProofChange}
                  className="w-full cursor-pointer rounded-md border border-secondary bg-tertiary px-3 py-2 font-mono text-sm text-quarternary focus:ring-2 focus:ring-secondary"
                />

                {paymentProof && (
                  <p className="mt-2 font-mono text-xs font-semibold text-green-400">
                    ✓ {paymentProof.name} uploaded successfully
                  </p>
                )}
              </div>
            );
          }

          return null;
        })()}

        {/* Terms */}
        <div className="flex items-center space-x-2">
          <input
            id="terms"
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="h-4 w-4 rounded border-gray-400 text-secondary focus:ring-secondary"
            required={true}
          />
          <label
            htmlFor="terms"
            className="font-orbitron text-sm text-tertiary"
          >
            I agree to all{' '}
            <Link href="/terms" passHref>
              <span className="cursor-pointer text-secondary underline hover:brightness-150">
                terms and conditions
              </span>
            </Link>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || formSubmitted}
          className={`mt-3 rounded-md px-4 py-2 font-orbitron text-xl font-semibold text-quarternary transition-all duration-300 ${
            formSubmitted
              ? 'bg-gradient-to-tr from-green-700 via-green-900 to-green-700 text-white'
              : 'bg-gradient-to-tr from-secondary via-[#b3862c] to-secondary hover:brightness-150 active:scale-90 disabled:bg-gray-500'
          }`}
        >
          {isSubmitting
            ? 'Submitting...'
            : formSubmitted
              ? 'Registration Successful!'
              : 'Submit Registration'}
        </button>

        {/* ✅ Error display section */}
        {formErrors.length > 0 && (
          <div className="mt-4 w-full rounded-md border border-red-500 bg-red-100/10 p-4 font-orbitron text-red-400">
            <p className="mb-1 font-semibold">
              Please fix the following errors:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {formErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Success */}
        {formSubmitted && (
          <div className="mt-4 w-full rounded-md border border-green-300 bg-green-50 p-4 text-center text-green-700">
            <p className="font-orbitron font-semibold">
              Registration Successful! 🎉
            </p>
            <p className="font-orbitron text-sm">
              Thank you for registering. We&apos;ll contact you shortly.
            </p>
            <p className="font-orbitron text-sm">...Redirecting to Events</p>
          </div>
        )}
      </form>
    </section>
  );
}

export default RegisterPage;
