'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type College = { name: string };

function RegisterPage() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [phoneError, setPhoneError] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    event: '',
    gender: '',
    sem: '',
    branch: '',
  });

  const [collegeSuggestions, setCollegeSuggestions] = useState<string[]>([]);
  const [branchSuggestions, setBranchSuggestions] = useState<string[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const genders = ['Male', 'Female', 'Not prefer to say'];
  const sem = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

  // Phone validation function for Indian mobile numbers
  const validateIndianPhone = (
    phone: string,
  ): { isValid: boolean; error: string } => {
    // Remove any spaces, dashes, or other non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');

    // Check if exactly 10 digits
    if (cleanPhone.length !== 10) {
      return {
        isValid: false,
        error: 'Phone number must be exactly 10 digits',
      };
    }

    // Check if it starts with valid Indian mobile prefixes (6, 7, 8, 9)
    const firstDigit = cleanPhone[0];
    if (!['6', '7', '8', '9'].includes(firstDigit)) {
      return {
        isValid: false,
        error: 'Indian mobile numbers must start with 6, 7, 8, or 9',
      };
    }

    return { isValid: true, error: '' };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Special handling for phone input
    if (name === 'phone') {
      // Allow only digits and limit to 10 characters
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));

      // Validate phone number
      if (numericValue.length > 0) {
        const validation = validateIndianPhone(numericValue);
        setPhoneError(validation.error);
      } else {
        setPhoneError('');
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'college') {
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
                  (item: College) => item.name,
                );
                setCollegeSuggestions(collegeNames);
              } else {
                setCollegeSuggestions([]);
              }
            })
            .catch((error) => {
              console.error(
                'Fetch error:',
                error instanceof Error ? error.message : String(error),
              );
              setCollegeSuggestions([]);
            });
        } else {
          setCollegeSuggestions([]);
        }
      }, 500);
      setTypingTimeout(timeout);
    }

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
              } else {
                setBranchSuggestions([]);
              }
            })
            .catch((error) => {
              console.error('Fetch error:', error);
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
    const nameOnly = branchEntry.split(' (')[0];
    setFormData((prev) => ({ ...prev, branch: nameOnly }));
    setBranchSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== '',
    );
    if (!isValid) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate phone number
    const phoneValidation = validateIndianPhone(formData.phone);
    if (!phoneValidation.isValid) {
      alert(
        'Please enter a valid Indian mobile number: ' + phoneValidation.error,
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission (since no backend API exists)
      console.log('Registration data:', formData);

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormSubmitted(true);
      console.log('Registration completed locally');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-black p-6">
      <h1 className="mb-4 mt-16 text-2xl font-bold text-white">
        Registration for Techletics CCE Events
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          suppressHydrationWarning={true}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          suppressHydrationWarning={true}
        />

        <div className="relative">
          <input
            type="tel"
            name="phone"
            placeholder="Phone (WhatsApp)"
            value={formData.phone}
            onChange={handleChange}
            className={`${phoneError ? 'border-red-500' : ''}`}
            required
            maxLength={10}
            pattern="[6-9][0-9]{9}"
            title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
            suppressHydrationWarning={true}
          />
          {phoneError && (
            <p className="mt-1 text-xs text-red-500">{phoneError}</p>
          )}
          {formData.phone.length > 0 &&
            !phoneError &&
            formData.phone.length === 10 && (
              <p className="mt-1 text-xs text-green-500">
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

        <select
          name="gender"
          // placeholder="Select your gender"
          value={formData.gender}
          onChange={handleChange}
          required
          suppressHydrationWarning={true}
        >
          {/* <ShinyOption value="">Select your gender</ShinyOption> */}
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
            required
            autoComplete="on"
            suppressHydrationWarning={true}
          />
          {collegeSuggestions.length > 0 && (
            <ul className="absolute z-50 max-h-48 w-full overflow-y-auto rounded-md border bg-[#0d0e1e] shadow-md">
              {collegeSuggestions.map((college, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectCollege(college)}
                  className="cursor-pointer px-4 py-2 text-white last:border-b-0 hover:bg-blue-600"
                >
                  {college}
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
          name="sem"
          // placeholder="Select your Current Semester"
          value={formData.sem}
          onChange={handleChange}
          required
          suppressHydrationWarning={true}
          className="z-10"
        >
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
            required
            autoComplete="on"
            suppressHydrationWarning={true}
          />
          {branchSuggestions.length > 0 && (
            <ul className="absolute z-50 max-h-48 w-full overflow-y-auto rounded-md border bg-[#0d0e1e] shadow-md">
              {branchSuggestions.map((branch, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectBranch(branch)}
                  className="cursor-pointer px-4 py-2 text-white last:border-b-0 hover:bg-blue-600"
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
          required
          suppressHydrationWarning={true}
          className="z-10"
        >
          <option value="">Select an Event</option>
          <option value="Coding Competition">Coding Competition</option>
          <option value="Web Development">Web Development</option>
          <option value="App Development">App Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Data Science">Data Science</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Robotics">Robotics</option>
          <option value="Game Development">Game Development</option>
          <option value="Tech Quiz">Tech Quiz</option>
        </select>

        {/* Show event name when selected */}
        {formData.event && (
          <div className="relative rounded-md bg-gradient-to-br from-slate-950 via-blue-950 to-black p-3">
            <p className="text-center font-semibold text-blue-400">
              Selected: {formData.event}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-2 p-4">
          <input
            id="terms"
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required={true}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I have read and agree to all{' '}
            <Link href="/terms" passHref>
              <span className="cursor-pointer text-blue-600 underline hover:text-blue-800">
                terms and conditions
              </span>
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || formSubmitted || phoneError !== ''}
          className={`mt-4 rounded-md p-2 transition-colors duration-200 disabled:cursor-not-allowed ${
            formSubmitted
              ? 'bg-gradient-to-tr from-slate-900 via-green-900 to-slate-900 text-white'
              : 'bg-gradient-to-tr from-slate-900 via-blue-900 to-slate-900 text-white hover:bg-blue-600 disabled:bg-gray-400'
          }`}
          suppressHydrationWarning={true}
        >
          {isSubmitting
            ? 'Submitting...'
            : formSubmitted
              ? 'Registration Successful!'
              : 'Submit Registration'}
        </button>

        {/* Show success message */}
        {formSubmitted && (
          <div className="mt-6 w-full max-w-md">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
              <p className="mb-2 font-semibold text-green-800">
                Registration Successful! 🎉
              </p>
              <p className="text-sm text-green-600">
                Thank you for registering. We will contact you shortly with
                further details.
              </p>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}

export default RegisterPage;
