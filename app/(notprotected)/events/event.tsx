"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import MagnetButton from "@/components/nurui/magnet-button";

type EventItem = {
  _id: string;
  name: string;
  price: number;
  poster?: string;
  category: "technical" | "cultural";
  branch: "cs" | "me" | "ec" | "ce" | "bsh" | "ds" | "eee";
  eventType: "competition" | "workshop" | "techtalk" | "expo";
  startDate: string;
  endDate: string;
  venue?: string;
  contactPersonName?: string;
  organizerContact?: string;
};

const BRANCHES = ["cs", "me", "ec", "ce", "bsh", "ds", "eee"] as const;
const TYPES = ["competition", "workshop", "techtalk", "expo"] as const;

// Sample data for demonstration
const SAMPLE_EVENTS: EventItem[] = [
  {
    _id: "1",
    name: "AI Workshop",
    price: 500,
    category: "technical",
    branch: "cs",
    eventType: "workshop",
    startDate: "2025-08-15T10:00:00Z",
    endDate: "2025-08-15T17:00:00Z",
    venue: "Computer Science Lab, Block A",
    contactPersonName: "John Doe",
    organizerContact: "ai-workshop@college.edu",
  },
  {
    _id: "2",
    name: "Cultural Dance Competition",
    price: 200,
    category: "cultural",
    branch: "bsh",
    eventType: "competition",
    startDate: "2025-08-20T18:00:00Z",
    endDate: "2025-08-20T22:00:00Z",
    venue: "Main Auditorium",
    contactPersonName: "Jane Smith",
    organizerContact: "dance@college.edu",
  },
  {
    _id: "3",
    name: "Tech Talk on Blockchain",
    price: 0,
    category: "technical",
    branch: "ec",
    eventType: "techtalk",
    startDate: "2025-08-25T14:00:00Z",
    endDate: "2025-08-25T16:00:00Z",
    venue: "Seminar Hall",
    contactPersonName: "Alice Johnson",
    organizerContact: "blockchain@college.edu",
  },
];

export default function EventPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string>("");

  const [category, setCategory] = useState<"technical" | "cultural">(
    "technical"
  );
  const [branch, setBranch] = useState<string>("all");
  const [eventType, setEventType] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Try to fetch from API first, fallback to sample data
        const res = await fetch("/api/events");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setEvents(data.events as EventItem[]);
          } else {
            // Use sample data if API fails
            setEvents(SAMPLE_EVENTS);
          }
        } else {
          // Use sample data if API fails
          setEvents(SAMPLE_EVENTS);
        }
      } catch (e) {
        // Use sample data if network fails
        setEvents(SAMPLE_EVENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = useMemo(() => {
    const byCategory = events.filter((e) => e.category === category);
    const byBranch =
      branch === "all"
        ? byCategory
        : byCategory.filter((e) => e.branch === branch);
    const byType =
      eventType === "all"
        ? byBranch
        : byBranch.filter((e) => e.eventType === eventType);
    const bySearch = !search
      ? byType
      : byType.filter((e) =>
          [e.name, e.branch, e.eventType].some((f) =>
            String(f).toLowerCase().includes(search.toLowerCase())
          )
        );
    return bySearch.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }, [events, category, branch, eventType, search]);

  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-white to-primary-50/60 dark:from-black dark:to-primary-950/20 py-10">
        <div className="mx-auto w-full max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            className="mb-8 text-center"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white pt-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Events
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-2 text-gray-600 dark:text-gray-300"
            >
              Discover and filter events by category, department, and type.
            </motion.p>
          </motion.div>

          {/* Enhanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {/* Category Slider */}
            <CategorySlider value={category} onChange={setCategory} />

            {/* Department filter */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[90px]">
                Department
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                suppressHydrationWarning={true}
              >
                <option value="all">All</option>
                {BRANCHES.map((b) => (
                  <option key={b} value={b} className="hover:bg-primary hover:text-white">
                    {b.toUpperCase()}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Type filter */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[90px]">
                Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                suppressHydrationWarning={true}
              >
                <option value="all">All</option>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </motion.div>
          </motion.div>

          {/* Enhanced Search */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              suppressHydrationWarning={true}
            />
          </motion.div>

          {/* Grid */}
          {loading ? (
            <SkeletonGrid />
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700"
              suppressHydrationWarning={true}
            >
              {error}
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((ev, index) => (
                  <motion.div
                    key={ev._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 120,
                    }}
                  >
                    <TiltEventCard event={ev} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Results count */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Showing {filtered.length} event
                {filtered.length !== 1 ? "s" : ""}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

function CategorySlider({
  value,
  onChange,
}: {
  value: "technical" | "cultural";
  onChange: (v: "technical" | "cultural") => void;
}) {
  const isTech = value === "technical";
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-sm rounded-full border border-gray-300 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="grid grid-cols-2 text-sm font-medium">
          <motion.button
            onClick={() => onChange("technical")}
            className={`relative z-10 rounded-full px-4 py-2 transition-colors duration-300 ${
              isTech
                ? "text-white bg-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            suppressHydrationWarning={true}
          >
            Technical
          </motion.button>
          <motion.button
            onClick={() => onChange("cultural")}
            className={`relative z-10 rounded-full px-4 py-2 transition-colors duration-300 ${
              !isTech
                ? "text-white bg-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            suppressHydrationWarning={true}
          >
            Cultural
          </motion.button>
        </div>
        <motion.div
          className="absolute inset-y-1 w-1/2 rounded-full bg-primary-600 shadow-lg"
          initial={false}
          animate={{ x: isTech ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </div>
    </div>
  );
}

function TiltEventCard({ event }: { event: EventItem }) {
  const clipId = `clip-${event._id}`;
  const pathD =
    "M0 0 H400 V240 c-60 -30 -120 30 -200 0 s-140 30 -200 0 V0 Z";

  // 3D tilt effect using Framer Motion
  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: transform,
      }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ring-1 ring-transparent transition-all duration-300 ease-out hover:shadow-xl hover:ring-primary-200 dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="relative">
        <svg
          viewBox="0 0 400 260"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-40"
        >
          <defs>
            <path id={`${clipId}-path`} d={pathD} />
            <clipPath id={`${clipId}-shape`}>
              <use href={`#${clipId}-path`} />
            </clipPath>
            <linearGradient
              id={`grad-${event._id}`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="rgb(59 130 246)" />
              <stop offset="100%" stopColor="rgb(147 197 253)" />
            </linearGradient>
          </defs>

          <g clipPath={`url(#${clipId}-shape)`}>
            {event.poster ? (
              <image
                href={event.poster}
                x="0"
                y="0"
                width="400"
                height="260"
                preserveAspectRatio="xMidYMid slice"
                className="transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <rect width="400" height="260" fill="#dbeafe" />
            )}
            {/* Overlay gradient */}
            <rect
              width="400"
              height="260"
              fill={`url(#grad-${event._id})`}
              opacity="0.1"
              className="transition-opacity duration-300 group-hover:opacity-20"
            />
          </g>
        </svg>

        {/* Enhanced Badges */}
        <div
          className="pointer-events-none absolute left-3 top-3 flex gap-2"
          style={{
            transform: "translateZ(40px)",
            transformStyle: "preserve-3d",
          }}
        >
          <Badge>{event.category}</Badge>
          <Badge>{event.branch.toUpperCase()}</Badge>
          <Badge>{event.eventType}</Badge>
        </div>
      </div>

      <div
        className="space-y-3 p-4"
        style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
      >
        <div className="flex items-start justify-between gap-3">
          <motion.h3
            className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 line-clamp-2"
            whileHover={{ scale: 1.02 }}
          >
            {event.name}
          </motion.h3>
          <motion.div
            className="shrink-0 rounded-full bg-[#ffdab8] text-primary px-2 py-1 text-sm font-semibold text-primary-700 dark:bg-primary dark:text-white transition-all duration-300 group-hover:bg-primary-100 dark:group-hover:bg-primary-900"
            whileHover={{ scale: 1.1 }}
          >
            ₹{event.price}
            {event.price === 0 && (
              <span className="ml-1 text-green-600">Free</span>
            )}
          </motion.div>
        </div>

        {/* Event Info */}
        <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">Event Date:</span>
            <span>{new Date(event.endDate).toLocaleDateString()}</span>
          </div>

          {event.venue && (
            <div className="flex items-start gap-2">
              <svg
                className="w-3.5 h-3.5 text-primary-500 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-medium shrink-0">Venue:</span>
              <span className="line-clamp-2">{event.venue}</span>
            </div>
          )}

          {event.contactPersonName && (
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-primary-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium">Contact:</span>
              <span className="truncate">{event.contactPersonName}</span>
            </div>
          )}

          {event.organizerContact && (
            <div className="flex items-start gap-2">
              <svg
                className="w-3.5 h-3.5 text-primary-500 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.2 3.6a1 1 0 01-.27 1.05l-1.6 1.6a16.001 16.001 0 006.586 6.586l1.6-1.6a1 1 0 011.05-.27l3.6 1.2a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                />
              </svg>
              <span className="font-medium shrink-0">Phone:</span>
              <a
                href={`tel:${event.organizerContact}`}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors truncate"
              >
                {event.organizerContact}
              </a>
            </div>
          )}
        </div>

        {/* Register Button */}
        <div className="pt-2">
          <MagnetButton href="/register" className="w-full" />
        </div>
      </div>
    </motion.div>
  );
}

function Badge({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const baseClasses =
    "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-md transition-all duration-300";
  const variantClasses =
    variant === "light"
      ? "bg-white/20 text-white hover:bg-white/30"
      : "bg-black/60 text-white hover:bg-black/70";

  return (
    <motion.span
      className={`${baseClasses} ${variantClasses}`}
      whileHover={{ scale: 1.1 }}
      style={{ transform: "translateZ(10px)" }}
    >
      {children}
    </motion.span>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="h-96 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
        />
      ))}
    </div>
  );
}