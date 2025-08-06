"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
  });
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated using sessionStorage
    const isAuthenticated = sessionStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      router.push("/admin");
      return;
    }
    
    fetchRegistrations();
  }, [router]);

  const fetchRegistrations = async () => {
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
  };

  const calculateStats = (data: Registration[]) => {
    const total = data.length;
    const paid = data.filter(reg => reg.payment.status === "paid").length;
    const pending = total - paid;
    const totalRevenue = data
      .filter(reg => reg.payment.status === "paid")
      .reduce((sum, reg) => sum + (reg.payment.amount || 0), 0);

    setStats({ total, paid, pending, totalRevenue });
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

  const filteredRegistrations = registrations.filter(reg => {
    const matchesEvent = !filter.event || reg.event === filter.event;
    const matchesPayment = !filter.paymentStatus || reg.payment.status === filter.paymentStatus;
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
      new Date(reg.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading registrations...</div>
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
            <p className="text-gray-600">Techletics CCE Event Registrations</p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-600">Total Registrations</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
            <div className="text-gray-600">Paid</div>
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

        {/* Filters */}
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
              <option value="Hackathon">Hackathon</option>
              <option value="Tech Talk">Tech Talk</option>
              <option value="Coding Contest">Coding Contest</option>
              <option value="Workshop">Workshop</option>
              <option value="Robotics Challenge">Robotics Challenge</option>
            </select>
            <select
              name="paymentStatus"
              value={filter.paymentStatus}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">All Payment Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Registrations Table */}
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
                  <tr key={reg._id} className="hover:bg-gray-50">
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
                          reg.payment.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {reg.payment.status}
                        </span>
                        {reg.payment.amount && (
                          <div className="text-xs text-gray-500 mt-1">₹{reg.payment.amount}</div>
                        )}
                        {reg.payment.transactionId && (
                          <div className="text-xs text-gray-400 font-mono">{reg.payment.transactionId.slice(0, 10)}...</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(reg.createdAt).toLocaleDateString()}
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
      </div>
    </div>
  );
}