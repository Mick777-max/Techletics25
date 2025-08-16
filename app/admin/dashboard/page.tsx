"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Registration = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  event: string;
  gender: string;
  sem: string;
  branch: string;
  payment: {
    transactionId?: string;
    amount?: number;
    status: string;
  };
  createdAt: string;
  updatedAt: string;
};

type Event = {
  _id: string;
  name: string;
  price: number;
  poster?: string;
  isActive: boolean;
  category: 'technical' | 'cultural';
  branch: 'cs' | 'me' | 'ec' | 'ce' | 'bsh' | 'ds' | 'eee';
  eventType: 'competition' | 'workshop' | 'techtalk' | 'expo';
  startDate: string;
  endDate: string;
  venue?: string;
  contactPersonName?: string;
  organizerContact?: string;
  createdAt: string;
};

type EventFormData = {
  name: string;
  price: string;
  poster: File | null;
  category: 'technical' | 'cultural';
  branch: 'cs' | 'me' | 'ec' | 'ce' | 'bsh' | 'ds' | 'eee';
  eventType: 'competition' | 'workshop' | 'techtalk' | 'expo';
  startDate: string;
  endDate: string;
  venue: string;
  contactPersonName: string;
  organizerContact: string;
};

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"registrations" | "events">("registrations");
  const [filter, setFilter] = useState({
    event: "",
    paymentStatus: "",
    search: "",
  });
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    totalRevenue: 0,
    free: 0,
    failed: 0,
  });
  
  // Modal states
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Event form states
  const [eventForm, setEventForm] = useState<EventFormData>({
    name: "",
    price: "",
    poster: null,
    category: "technical",
    branch: "cs",
    eventType: "competition",
    startDate: "",
    endDate: "",
    venue: "",
    contactPersonName: "",
    organizerContact: "",
  });
  const [isUploadingEvent, setIsUploadingEvent] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string>("");
  
  const router = useRouter();

  const fetchRegistrations = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/registrations", {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
      });

      if (response.status === 401) {
        sessionStorage.removeItem("adminAuth");
        sessionStorage.removeItem("adminToken");
        router.push("/admin");
        return;
      }

      const data = await response.json();
      
      if (data.success) {
        setRegistrations(data.registrations);
        calculateStats(data.registrations);
      } else {
        setError(data.error || "Failed to fetch registrations");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/events", {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setEvents(data.events);
        }
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }, []);

  useEffect(() => {
    // Check if admin is authenticated using sessionStorage
    const isAuthenticated = sessionStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      router.push("/admin");
      return;
    }
    fetchRegistrations();
    fetchEvents();
  }, [router, fetchRegistrations, fetchEvents]);

  const calculateStats = (data: Registration[]) => {
    const total = data.length;
    const paid = data.filter(reg => reg.payment.status === "completed" || reg.payment.status === "paid").length;
    const free = data.filter(reg => reg.payment.status === "free").length;
    const pending = data.filter(reg => reg.payment.status === "pending").length;
    const failed = data.filter(reg => reg.payment.status === "failed").length;
    
    // Calculate total revenue from paid registrations only
    const totalRevenue = data
      .filter(reg => reg.payment.status === "completed" || reg.payment.status === "paid")
      .reduce((sum, reg) => sum + (reg.payment.amount || 0), 0);

    setStats({ 
      total, 
      paid, 
      pending, 
      totalRevenue,
      free, // Add free count to stats
      failed // Add failed count to stats
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("adminToken");
    router.push("/admin");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleRowClick = (registration: Registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRegistration(null);
  };

  const handleEventFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof EventFormData, value: string) => {
    setEventForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        alert("File size must be less than 20MB");
        return;
      }

      // Check file type - allow any image format
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file");
        return;
      }

      setEventForm(prev => ({ ...prev, poster: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventForm.name || !eventForm.price || !eventForm.startDate || !eventForm.endDate) {
      alert("Please fill in name, price, start and end dates");
      return;
    }

    if (isNaN(Number(eventForm.price)) || Number(eventForm.price) < 0) {
      alert("Please enter a valid price");
      return;
    }

    setIsUploadingEvent(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('name', eventForm.name);
      formData.append('price', eventForm.price);
      formData.append('category', eventForm.category);
      formData.append('branch', eventForm.branch);
      formData.append('eventType', eventForm.eventType);
      formData.append('startDate', eventForm.startDate);
      formData.append('endDate', eventForm.endDate);
      if (eventForm.venue) {
        formData.append('venue', eventForm.venue);
      }
      if (eventForm.contactPersonName) {
        formData.append('contactPersonName', eventForm.contactPersonName);
      }
      if (eventForm.organizerContact) {
        formData.append('organizerContact', eventForm.organizerContact);
      }
      if (eventForm.poster) {
        formData.append('poster', eventForm.poster);
      }

      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Event created successfully!");
        setEventForm({ 
          name: "", 
          price: "", 
          poster: null, 
          category: 'technical', 
          branch: 'cs', 
          eventType: 'competition', 
          startDate: '', 
          endDate: '', 
          venue: '', 
          contactPersonName: '', 
          organizerContact: '' 
        });
        setPreviewImage("");
        fetchEvents(); // Refresh events list
        
        // Reset file input
        const fileInput = document.getElementById('poster') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        alert(data.error || "Failed to create event");
      }
    } catch (error) {
      console.error("Event creation error:", error);
      alert("Failed to create event");
    } finally {
      setIsUploadingEvent(false);
      setUploadProgress(0);
    }
  };

  const toggleEventStatus = async (event: Event, currentStatus: boolean) => {
    // Prevent activating an expired event on client with explicit alert
    if (!currentStatus && new Date(event.endDate) < new Date()) {
      alert("The event is over; can't update");
      return;
    }
    try {
      const response = await fetch(`/api/admin/events/${event._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      const data = await response.json();
      if (data.success) {
        fetchEvents(); // Refresh events list
      } else {
        alert(data.error || "Failed to update event status");
      }
    } catch (error) {
      console.error("Toggle event status error:", error);
      alert("Failed to update event status");
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert("Event deleted successfully!");
        fetchEvents(); // Refresh events list
      } else {
        alert(data.error || "Failed to delete event");
      }
    } catch (error) {
      console.error("Delete event error:", error);
      alert("Failed to delete event");
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesEvent = !filter.event || reg.event === filter.event;
    
    // Updated payment filter logic to handle all statuses including free
    const matchesPayment = !filter.paymentStatus || 
      filter.paymentStatus === 'all' ||
      reg.payment.status === filter.paymentStatus;
    
    const matchesSearch = !filter.search || 
      reg.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      reg.email.toLowerCase().includes(filter.search.toLowerCase()) ||
      reg.college.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesEvent && matchesPayment && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "College", "Event", "Gender", "Semester", "Branch", "Payment Status", "Transaction ID", "Amount", "Registration Date"];
    const csvData = filteredRegistrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.college,
      reg.event,
      reg.gender,
      reg.sem,
      reg.branch,
      reg.payment.status,
      reg.payment.transactionId || "",
      reg.payment.amount || "",
      new Date(reg.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Techletics_Registrations_${new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Techletics CCE Management Portal</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("registrations")}
              className={`pb-2 px-1 font-medium text-sm ${
                activeTab === "registrations"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Registrations ({registrations.length})
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`pb-2 px-1 font-medium text-sm ${
                activeTab === "events"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Event Management ({events.length})
            </button>
          </div>
        </div>

        {/* Stats Cards - Updated to include free registrations */}
        {activeTab === "registrations" && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-gray-600">Total Registrations</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
              <div className="text-gray-600">Paid</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-500">{stats.free || 0}</div>
              <div className="text-gray-600">Free</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">₹{stats.totalRevenue}</div>
              <div className="text-gray-600">Total Revenue</div>
            </div>
          </div>
        )}

        {/* Registration Details Modal */}
        {showModal && selectedRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Registration Details</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Registration Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="mt-1 text-sm text-gray-900 font-semibold">{selectedRegistration.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.gender}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">College</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedRegistration.college}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Semester</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.sem}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Branch</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.branch}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event</label>
                    <span className="mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                      {selectedRegistration.event}
                    </span>
                  </div>

                  {/* Payment Information */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                        <span className={`mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                          selectedRegistration.payment.status === 'completed' || selectedRegistration.payment.status === 'paid'
                            ? 'bg-green-100 text-green-800' 
                            : selectedRegistration.payment.status === 'free'
                            ? 'bg-blue-100 text-blue-800'
                            : selectedRegistration.payment.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {selectedRegistration.payment.status === 'completed' ? 'paid' : selectedRegistration.payment.status}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <p className="mt-1 text-sm text-gray-900 font-semibold">
                          ₹{selectedRegistration.payment.amount || 0}
                          {selectedRegistration.payment.status === 'free' && (
                            <span className="ml-2 text-blue-600 text-xs">(Free Event)</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {selectedRegistration.payment.transactionId && selectedRegistration.payment.transactionId !== 'FREE_EVENT' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                        <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded border">
                          {selectedRegistration.payment.transactionId}
                        </p>
                      </div>
                    )}

                    {selectedRegistration.payment.status === 'free' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Note</label>
                        <p className="mt-1 text-sm text-blue-600 bg-blue-50 p-2 rounded border">
                          This is a free event registration. No payment was required.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Registration Dates */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Registration Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedRegistration.createdAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedRegistration.updatedAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end mt-6 pt-4 border-t">
                  <button
                    onClick={closeModal}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === "registrations" && (
          <>
            {/* Updated Filters */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  name="search"
                  placeholder="Search by name, email, or college..."
                  value={filter.search}
                  onChange={handleFilterChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <select
                  name="event"
                  value={filter.event}
                  onChange={handleFilterChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">All Events</option>
                  {events.filter(event => event.isActive).map(event => (
                    <option key={event._id} value={event.name}>
                      {event.name}
                    </option>
                  ))}
                </select>
                <select
                  name="paymentStatus"
                  value={filter.paymentStatus}
                  onChange={handleFilterChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">All Payment Status</option>
                  {/* <option value="completed">Paid</option> */}
                  <option value="paid">Paid</option>
                  <option value="free">Free</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <button
                  onClick={exportToCSV}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Export CSV
                </button>
              </div>
            </div>

            {/* Info Text */}
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md mb-6">
              <p className="text-sm">💡 Click on any row to view detailed registration information</p>
            </div>

            {/* Updated Registrations Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRegistrations.map((reg) => (
                      <tr 
                        key={reg._id} 
                        className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                        onClick={() => handleRowClick(reg)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{reg.name}</div>
                            <div className="text-sm text-gray-500">{reg.gender} • {reg.sem} • {reg.branch}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {reg.event}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.college}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              reg.payment.status === 'completed' || reg.payment.status === 'paid'
                                ? 'bg-green-100 text-green-800' 
                                : reg.payment.status === 'free'
                                ? 'bg-blue-100 text-blue-800'
                                : reg.payment.status === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {reg.payment.status === 'completed' ? 'paid' : reg.payment.status}
                            </span>
                            {reg.payment.amount !== undefined && reg.payment.amount > 0 && (
                              <div className="text-xs text-gray-500 mt-1">₹{reg.payment.amount}</div>
                            )}
                            {reg.payment.status === 'free' && (
                              <div className="text-xs text-blue-500 mt-1">₹0</div>
                            )}
                            {reg.payment.transactionId && reg.payment.transactionId !== 'FREE_EVENT' && (
                              <div className="text-xs text-gray-400 font-mono">{reg.payment.transactionId.slice(0, 10)}...</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(reg.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredRegistrations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No registrations found matching your criteria.
                </div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-gray-600 text-center">
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </div>
          </>
        )}

        {/* Modal - Updated to show free status properly */}
        {showModal && selectedRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Registration Details</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Registration Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="mt-1 text-sm text-gray-900 font-semibold">{selectedRegistration.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.gender}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">College</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedRegistration.college}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Semester</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.sem}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Branch</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedRegistration.branch}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event</label>
                    <span className="mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                      {selectedRegistration.event}
                    </span>
                  </div>

                  {/* Payment Information - Updated */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                        <span className={`mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                          selectedRegistration.payment.status === 'completed' || selectedRegistration.payment.status === 'paid'
                            ? 'bg-green-100 text-green-800' 
                            : selectedRegistration.payment.status === 'free'
                            ? 'bg-blue-100 text-blue-800'
                            : selectedRegistration.payment.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {selectedRegistration.payment.status === 'completed' ? 'paid' : selectedRegistration.payment.status}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <p className="mt-1 text-sm text-gray-900 font-semibold">
                          ₹{selectedRegistration.payment.amount || 0}
                          {selectedRegistration.payment.status === 'free' && (
                            <span className="ml-2 text-blue-600 text-xs">(Free Event)</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {selectedRegistration.payment.transactionId && selectedRegistration.payment.transactionId !== 'FREE_EVENT' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                        <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded border">
                          {selectedRegistration.payment.transactionId}
                        </p>
                      </div>
                    )}

                    {selectedRegistration.payment.status === 'free' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Note</label>
                        <p className="mt-1 text-sm text-blue-600 bg-blue-50 p-2 rounded border">
                          This is a free event registration. No payment was required.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Registration Dates */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Registration Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedRegistration.createdAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedRegistration.updatedAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end mt-6 pt-4 border-t">
                  <button
                    onClick={closeModal}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <>
            {/* Add New Event Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Event</h2>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={eventForm.name}
                      onChange={handleEventFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Enter event name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={eventForm.price}
                      onChange={handleEventFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Enter price"
                      min="0"
                      step="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={eventForm.category}
                      onChange={(e) => handleSelectChange('category', e.target.value as 'technical' | 'cultural')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      required
                    >
                      <option value="technical">Technical</option>
                      <option value="cultural">Cultural</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
                    <select
                      name="branch"
                      value={eventForm.branch}
                      onChange={(e) => handleSelectChange('branch', e.target.value as EventFormData['branch'])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      required
                    >
                      <option value="cs">CS</option>
                      <option value="me">ME</option>
                      <option value="ec">EC</option>
                      <option value="ce">CE</option>
                      <option value="bsh">BSH</option>
                      <option value="ds">DS</option>
                      <option value="eee">EEE</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
                    <select
                      name="eventType"
                      value={eventForm.eventType}
                      onChange={(e) => handleSelectChange('eventType', e.target.value as EventFormData['eventType'])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      required
                    >
                      <option value="competition">Competition</option>
                      <option value="workshop">Workshop</option>
                      <option value="techtalk">Tech Talk</option>
                      <option value="expo">Expo</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Created Date *</label>
                      <input
                        type="date"
                        name="startDate"
                        value={eventForm.startDate}
                        onChange={(e) => handleSelectChange('startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">One day after the actual event date*</label>
                      <input
                        type="date"
                        name="endDate"
                        value={eventForm.endDate}
                        onChange={(e) => handleSelectChange('endDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Venue, Contact Person & Organizer Contact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Venue (Optional)</label>
                    <input
                      type="text"
                      name="venue"
                      value={eventForm.venue}
                      onChange={handleEventFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Auditorium / Lab / Hall name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name (Optional)</label>
                    <input
                      type="text"
                      name="contactPersonName"
                      value={eventForm.contactPersonName}
                      onChange={handleEventFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Person's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organizer Contact (Optional)</label>
                    <input
                      type="tel"
                      name="organizerContact"
                      value={eventForm.organizerContact}
                      onChange={handleEventFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Phone or email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Poster (Optional - Max 20MB)
                  </label>
                  <input
                    type="file"
                    id="poster"
                    accept="image/*"
                    onChange={handlePosterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: All image formats (JPG, PNG, GIF, WEBP, BMP, SVG, etc.). Maximum file size: 20MB
                  </p>
                </div>

                {previewImage && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poster Preview
                    </label>
                    <div className="relative w-48 h-64 border border-gray-300 rounded-md overflow-hidden">
                      <Image
                        src={previewImage}
                        alt="Event poster preview"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                )}

                {isUploadingEvent && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploadingEvent}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isUploadingEvent ? "Creating Event..." : "Create Event"}
                </button>
              </form>
            </div>

            {/* Events List */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Existing Events</h2>
              </div>
              
              {events.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No events created yet. Add your first event above.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {events.map((event) => (
                    <div key={event._id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {event.poster && (
                            <div className="relative w-16 h-20 border border-gray-300 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={event.poster}
                                alt={`${event.name} poster`}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
                            <p className="text-sm text-gray-600">Price: ₹{event.price}</p>
                            <div className="text-xs text-gray-700 mt-1 flex flex-wrap gap-2">
                              <span className="px-2 py-0.5 rounded bg-gray-100">{event.category}</span>
                              <span className="px-2 py-0.5 rounded bg-gray-100">{event.branch}</span>
                              <span className="px-2 py-0.5 rounded bg-gray-100">{event.eventType}</span>
                              <span className="px-2 py-0.5 rounded bg-gray-100">
                                {new Date(event.startDate).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })} → {new Date(event.endDate).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Created: {new Date(event.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                event.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {event.isActive ? 'Active' : 'Inactive'}
                              </span>
                              {new Date(event.endDate) < new Date() && (
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                                  Expired
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {new Date(event.endDate) < new Date() && !event.isActive ? (
                            <span className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-700 cursor-not-allowed">
                              Expired
                            </span>
                          ) : !event.isActive ? (
                            <button
                              onClick={() => toggleEventStatus(event, event.isActive)}
                              className="px-3 py-1 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
                            >
                              Activate
                            </button>
                          ) : null}
                          <button
                            onClick={() => deleteEvent(event._id)}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}