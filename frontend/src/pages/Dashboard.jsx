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
  Menu,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col md:flex-row font-sans">
      {/* --- SIDEBAR (Desktop Only) --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-lg tracking-tight leading-tight">
            Avyukt Core <br />{" "}
            <span className="text-indigo-600">Technology</span>
          </span>
        </div>

        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 p-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold cursor-pointer">
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
          className="mt-auto flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold group">
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      </aside>

      {/* --- MOBILE TOP BAR --- */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <span className="font-black text-indigo-600 tracking-tighter">
          ACT
        </span>
        <button onClick={handleLogout} className="text-red-500">
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 pb-24 md:pb-10">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Hi, {username}! 👋
            </h1>
            <p className="text-gray-500 font-medium text-sm mt-1">
              Avyukt Core Tech Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all w-full lg:w-64"
              />
            </div>
          </div>
        </header>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
          {[
            { label: "Total Leads", val: "1,284", color: "text-gray-900" },
            { label: "Active Tasks", val: "42", color: "text-indigo-600" },
            { label: "Conversion", val: "12%", color: "text-green-500" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-gray-100">
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <h3 className={`text-3xl font-black ${stat.color}`}>
                {stat.val}
              </h3>
            </div>
          ))}
        </div>

        {/* Table Area - Responsive Scroll */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">
                    Client
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-50 text-indigo-600 uppercase">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 flex justify-around p-4 z-50">
        <button className="flex flex-col items-center gap-1 text-indigo-600">
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-bold">Leads</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Briefcase className="w-6 h-6" />
          <span className="text-[10px] font-bold">Tasks</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <CheckCircle className="w-6 h-6" />
          <span className="text-[10px] font-bold">Done</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <UserCircle className="w-6 h-6" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
