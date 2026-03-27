import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Users,
  Briefcase,
  CheckCircle,
  Search,
  UserCircle,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

  // Dummy Data for Leads/Tasks
  const [data] = useState([
    {
      id: 1,
      name: "Nishant Choudhary",
      email: "nishant@example.com",
      status: "Hot Lead",
      date: "Mar 26, 2026",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@test.com",
      status: "Contacted",
      date: "Mar 25, 2026",
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya@dev.com",
      status: "Closed",
      date: "Mar 24, 2026",
    },
    {
      id: 4,
      name: "Amit Kumar",
      email: "amit@hr.com",
      status: "New",
      date: "Mar 23, 2026",
    },
  ]);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex font-sans">
      {/* Sidebar - Optional but looks professional */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">Crevonx</span>
        </div>

        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 p-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold">
            <Users className="w-5 h-5" /> Leads
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
            <Briefcase className="w-5 h-5" /> Tasks
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
            <CheckCircle className="w-5 h-5" /> Analytics
          </div>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome back, {username}! 👋
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Here's what's happening with your leads today.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search leads..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all w-64"
              />
            </div>
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center">
              <UserCircle className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">
              Total Leads
            </p>
            <h3 className="text-4xl font-black text-gray-900">1,284</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">
              Active Tasks
            </p>
            <h3 className="text-4xl font-black text-indigo-600">42</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">
              Conversion
            </p>
            <h3 className="text-4xl font-black text-green-500">12%</h3>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Leads</h2>
            <button className="text-indigo-600 font-bold text-sm hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Client Name
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Email
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Date Added
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5 font-bold text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-8 py-5 text-gray-500 font-medium">
                      {item.email}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-tighter ${
                          item.status === "Hot Lead"
                            ? "bg-orange-100 text-orange-600"
                            : item.status === "Closed"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                        }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-gray-400 text-sm font-medium">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
