"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// const MotionLink = motion(Link);

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
  contactPersonPhone?: string; // Added this field
  organizerContact?: string;
};

const BRANCHES = ["cs", "me", "ec", "ce", "bsh", "ds", "eee"] as const;
const TYPES = ["competition", "workshop", "techtalk" , "expo"] as const;

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
        // Explicitly request ALL events including inactive/expired ones
        const res = await fetch("/api/events?includeExpired=true&includeInactive=true");
        console.log("Fetching events with URL:", "/api/events?includeExpired=true&includeInactive=true");
        
        if (res.ok) {
          const data = await res.json();
          console.log("API response:", data);
          
          if (data.success) {
            // Log all events to check if expired ones are included
            console.log("Events from API:", data.events);
            setEvents(data.events as EventItem[]);
          } else {
            console.log("API success false, using sample data");
            setEvents(SAMPLE_EVENTS);
          }
        } else {
          console.log("API request failed with status:", res.status);
          setEvents(SAMPLE_EVENTS);
        }
      } catch (e) {
        console.error("Error fetching events:", e);
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
    
    // Sort events: upcoming events first, then expired events
    return bySearch.sort((a, b) => {
      const now = new Date().getTime();
      const aEnd = new Date(a.endDate).getTime();
      const bEnd = new Date(b.endDate).getTime();
      
      // Check if events are expired
      const aExpired = aEnd < now;
      const bExpired = bEnd < now;
      
      // First sort by expired status (non-expired first)
      if (aExpired !== bExpired) {
        return aExpired ? 1 : -1;
      }
      
      // Then sort by end date (sooner first)
      return aEnd - bEnd;
    });
  }, [events, category, branch, eventType, search]);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Subtle Dark Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gray-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-96 h-96 bg-gray-800/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-900/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          className="mb-12 text-center"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent pt-10 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Events
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-gray-600 to-gray-400 mx-auto mb-6 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Discover and explore cutting-edge events across departments
          </motion.p>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <CategorySlider value={category} onChange={setCategory} />

          <motion.div
            className="group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-semibold text-gray-400 mb-3">
              Department
            </label>
            <div className="relative">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full appearance-none bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/80"
                suppressHydrationWarning={true}
              >
                <option value="all" className="bg-black">
                  All Departments
                </option>
                {BRANCHES.map((b) => (
                  <option key={b} value={b} className="bg-black">
                    {b.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-semibold text-gray-400 mb-3">
              Event Type
            </label>
            <div className="relative">
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full appearance-none bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/80"
                suppressHydrationWarning={true}
              >
                <option value="all" className="bg-black">
                  All Types
                </option>
                {TYPES.map((t) => (
                  <option key={t} value={t} className="bg-black">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Search */}
        <motion.div
          className="mb-10 relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-2xl blur opacity-75"></div>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, departments, or types..."
              className="w-full bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl px-6 py-4 pl-14 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/80"
              suppressHydrationWarning={true}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <SkeletonGrid />
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-red-900/50 bg-red-950/50 backdrop-blur-xl p-6 text-red-400 text-center"
          >
            <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z"
                />
              </svg>
            </div>
            {error}
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((ev, index) => (
                <motion.div
                  key={ev._id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
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
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 backdrop-blur-xl rounded-full border border-gray-800/50">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
              <p className="text-gray-400 text-sm font-medium">
                Showing {filtered.length} event
                {filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
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
    <div className="flex flex-col">
      <label className="block text-sm font-semibold text-gray-400 mb-3">
        Category
      </label>
      <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-800/40 opacity-50"></div>
        <div className="grid grid-cols-2 relative z-10">
          <motion.button
            onClick={() => onChange("technical")}
            className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isTech ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            suppressHydrationWarning={true}
          >
            Technical
          </motion.button>
          <motion.button
            onClick={() => onChange("cultural")}
            className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              !isTech ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            suppressHydrationWarning={true}
          >
            Cultural
          </motion.button>
        </div>
        <motion.div
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl shadow-lg shadow-gray-800/50"
          initial={false}
          animate={{
            x: isTech ? 0 : "calc(100% + 8px)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </div>
    </div>
  );
}

function TiltEventCard({ event }: { event: EventItem }) {
  const ROTATION_RANGE = 15;
  const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  // Check if event is expired - comparing with endDate (which is one day after event)
  const isExpired = new Date(event.endDate).getTime() < new Date().getTime();
  
  // Display date shows the actual event date (one day before endDate)
  const displayEndDate = new Date(event.endDate);
  displayEndDate.setDate(displayEndDate.getDate() - 1);

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
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative overflow-hidden rounded-2xl bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 shadow-2xl transition-all duration-300 hover:border-gray-700/80 hover:shadow-gray-900/20 ${
        isExpired ? 'opacity-75' : ''
      }`}
    >
      {/* Expired overlay */}
      {isExpired && (
        <div className="absolute inset-0 bg-black/30 z-20 flex items-center justify-center">
          {/* <div className="bg-red-600/90 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            EXPIRED
          </div> */}
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-transparent to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header Image Area */}
      <div className="relative h-48 overflow-hidden">
        {event.poster ? (
          <img
            src={event.poster}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <div className="text-6xl text-gray-600">
              {event.category === "technical" ? "⚡" : "🎭"}
            </div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Enhanced Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge>{event.category}</Badge>
          <Badge>{event.branch.toUpperCase()}</Badge>
          <Badge>{event.eventType}</Badge>
          {/* {isExpired && <Badge>EXPIRED</Badge>} */}
        </div>
      </div>

      {/* Content */}
      <div
        className="p-6 space-y-4"
        style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
      >
        <motion.h3
          className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors duration-300 line-clamp-2"
          whileHover={{ scale: 1.02 }}
        >
          {event.name}
        </motion.h3>

        <motion.div
          className="absolute top-4 right-4 px-2 py-1 bg-white backdrop-blur-md rounded-xl border border-gray-800/50"
          whileHover={{ scale: 1.1 }}
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="text-sm font-bold text-black">
            {event.price === 0 ? (
              <span className="text-green-400">FREE</span>
            ) : (
              <>₹{event.price}</>
            )}
          </div>
        </motion.div>

        {/* Event Info */}
        <div className="space-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-500"
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
            </div>
            <span className="text-gray-500">Date:</span>
            <span className={`font-medium ${isExpired ? 'text-red-400' : 'text-white'}`}>
              {displayEndDate.toLocaleDateString()}
            </span>
          </div>

          {event.venue && (
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                <svg
                  className="w-4 h-4 text-gray-500"
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
              </div>
              <span className="text-gray-500">Venue:</span>
              <span className="font-medium text-white flex-1">
                {event.venue}
              </span>
            </div>
          )}

          {(event.contactPersonName || event.contactPersonPhone) && (
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                <svg
                  className="w-4 h-4 text-gray-500"
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
              </div>
              <span className="text-gray-500">Contact:</span>
              <div className="font-medium text-white flex flex-col">
                {event.contactPersonName && <span>{event.contactPersonName}</span>}
                {event.contactPersonPhone && (
                  <div className="text-gray-300 flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {event.contactPersonPhone}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add organizerContact as phone if available and contactPersonPhone isn't */}
          {!event.contactPersonPhone && event.organizerContact && (
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <span className="text-gray-500">Contact:</span>
              <span className="font-medium text-white">
                {/* Check if it looks like a phone number */}
                {event.organizerContact.match(/[\d+\s()-]{7,}/) ? (
                  <Link href={`tel:${event.organizerContact.replace(/[^\d+]/g, '')}`}>
                    {event.organizerContact}
                  </Link>
                ) : (
                  event.organizerContact
                )}
              </span>
            </div>
          )}
        </div>

        {/* Register Button */}
        <motion.div className="pt-4">
          <Link href="/register">
            <motion.div
              className={`w-full block relative overflow-hidden px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 border cursor-pointer ${
                isExpired
                  ? 'bg-red-600 text-gray-300 border-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-black/50 hover:shadow-black/70 hover:shadow-xl border-gray-700/50'
              }`}
              whileHover={!isExpired ? { scale: 1.02 } : {}}
              whileTap={!isExpired ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10 w-full flex items-center justify-center">
                {isExpired ? 'Event Expired' : 'Register Now'}
              </span>
              {!isExpired && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-gray-300 rounded-full border border-gray-800/50 hover:border-gray-700/80 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      style={{ transform: "translateZ(10px)" }}
    >
      {children}
    </motion.span>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="h-96 bg-gray-900/30 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden"
        >
          <div className="animate-pulse">
            <div className="h-48 bg-gray-800/50"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-800/50 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800/50 rounded w-1/2"></div>
              </div>
              <div className="h-10 bg-gray-800/50 rounded"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}


