import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  Truck,
  XOctagon,
  DollarSign,
  Home,
  FileText,
  User,
  LogOut,
  Menu,
  MailCheck
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [cancel, setCancel] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [name, setName] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countDelivery, getCount, myOrder, userProfile, monthWise] =
          await Promise.all([
            fetch("/api/v1/countDelivery").then((res) => res.json()),
            fetch("/api/v1/get-count").then((res) => res.json()),
            fetch("/api/v1/myorder").then((res) => res.json()),
            fetch("/api/v1/userProfile").then((res) => res.json()),
            fetch(
              `/api/v1/getMonthWise/${new Date().getFullYear()}/month-wise`
            ).then((res) => res.json()),
          ]);

        setCurrent(countDelivery.count);
        setCancel(getCount.getSave?.[0]?.cancelCounter || 0);
        setTotal(
          countDelivery.count + (getCount.getSave?.[0]?.cancelCounter || 0)
        );
        setTotalSpent(
          myOrder.order.reduce((acc, curr) => acc + curr.totalPrice, 0)
        );
        setName(userProfile.user.name);
        setMonthlyData(
          Object.keys(monthWise).map((key) => ({
            month: monthWise[key].month,
            orders: monthWise[key].count,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/v1/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuItems = [
    { icon: Home, text: "Ship", path: "/order" },
    { icon: FileText, text: "Orders", path: "/history" },
    { icon: Truck, text: "Tracking", path: "/tracking" },
    { icon: MailCheck, text: "Chats", path: "/chat" },
    { icon: User, text: "Profile", path: "/profile" },
  ];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div
      className={`bg-white rounded-xl shadow-md p-6 flex items-center ${color}`}
    >
      <div className="mr-4">
        <Icon size={48} className="text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`h-full bg-gradient-to-b from-purple-700 to-indigo-800 text-white transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          {!isCollapsed && <h2 className="text-2xl font-bold">Dashboard</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 mx-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-white text-purple-700"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${isCollapsed ? "mx-auto" : "mr-4"}`}
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.text}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          onClick={logout}
          className={`flex items-center p-3 mx-3 mt-auto mb-8 bg-red-500 rounded-xl hover:bg-red-600 transition-colors duration-200 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className={`w-6 h-6 ${isCollapsed ? "mx-auto" : "mr-4"}`} />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Welcome, {name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Orders"
              value={total}
              icon={Package}
              color="bg-blue-500"
            />
            <StatCard
              title="Current Orders"
              value={current}
              icon={Truck}
              color="bg-green-500"
            />
            <StatCard
              title="Cancelled Orders"
              value={cancel}
              icon={XOctagon}
              color="bg-red-500"
            />
            <StatCard
              title="Total Spent"
              value={`${totalSpent.toLocaleString()}`}
              icon={DollarSign}
              color="bg-purple-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Monthly Orders
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
