import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Fetch dummy data (you can replace with API calls later)
    setLeads([
      { id: 1, name: "Lead 1", email: "lead1@example.com" },
      { id: 2, name: "Lead 2", email: "lead2@example.com" },
    ]);
    setTasks([
      { id: 1, title: "Task 1", status: "Pending" },
      { id: 2, title: "Task 2", status: "Completed" },
    ]);
    setUsers([
      { id: 1, name: "User 1", email: "user1@example.com" },
      { id: 2, name: "User 2", email: "user2@example.com" },
    ]);
  }, [token, navigate]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user ? user.name : "User"}
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      {/* Dummy Data Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leads */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-2">
          <h2 className="text-xl font-semibold">Leads</h2>
          {leads.map((lead) => (
            <p key={lead.id}>
              {lead.name} - {lead.email}
            </p>
          ))}
        </div>

        {/* Tasks */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-2">
          <h2 className="text-xl font-semibold">Tasks</h2>
          {tasks.map((task) => (
            <p key={task.id}>
              {task.title} - {task.status}
            </p>
          ))}
        </div>

        {/* Users */}
        <div className="bg-white p-4 rounded-2xl shadow space-y-2">
          <h2 className="text-xl font-semibold">Users</h2>
          {users.map((u) => (
            <p key={u.id}>
              {u.name} - {u.email}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
