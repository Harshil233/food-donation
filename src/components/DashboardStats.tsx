import React, { useMemo } from "react";
import { Package, Clock, AlertCircle, Calendar } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Donation, UrgentNeed } from "../types";

interface DashboardStatsProps {
  donations: Donation[];
  urgentNeeds: UrgentNeed[];
  isExpiringSoon: (expiryDate: string) => boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  donations,
  urgentNeeds,
  isExpiringSoon,
}) => {
  const totalDonations = donations.length;
  const pendingPickups = donations.filter((d) => d.status === "pending").length;
  const urgentCount = urgentNeeds.filter(
    (n) => !n.fulfilled && n.priority === "high"
  ).length;
  const expiringSoon = donations.filter((d) =>
    isExpiringSoon(d.expiryDate)
  ).length;

  const chartData = useMemo(() => {
    const statusData = [
      {
        name: "Pending",
        value: donations.filter((d) => d.status === "pending").length,
        color: "#FCD34D",
      },
      {
        name: "Collected",
        value: donations.filter((d) => d.status === "collected").length,
        color: "#60A5FA",
      },
      {
        name: "Distributed",
        value: donations.filter((d) => d.status === "distributed").length,
        color: "#34D399",
      },
    ];

    const priorityData = [
      {
        name: "High",
        value: urgentNeeds.filter((n) => n.priority === "high").length,
        color: "#F87171",
      },
      {
        name: "Medium",
        value: urgentNeeds.filter((n) => n.priority === "medium").length,
        color: "#FBBF24",
      },
      {
        name: "Low",
        value: urgentNeeds.filter((n) => n.priority === "low").length,
        color: "#10B981",
      },
    ];

    const foodTypeMap = donations.reduce((acc, donation) => {
      acc[donation.foodType] = (acc[donation.foodType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const foodTypeData = Object.entries(foodTypeMap).map(([type, count]) => ({
      name: type,
      value: count,
    }));

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split("T")[0];
    });

    const donationsOverTime = last7Days.map((date) => {
      const count = donations.filter(
        (d) => d.createdAt.split("T")[0] === date
      ).length;
      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        donations: count,
      };
    });

    const monthlyData = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const month = date.toISOString().slice(0, 7);

      const monthDonations = donations.filter((d) =>
        d.createdAt.startsWith(month)
      ).length;

      const monthNeeds = urgentNeeds.filter((n) =>
        n.createdAt.startsWith(month)
      ).length;

      const monthFulfilled = urgentNeeds.filter(
        (n) => n.createdAt.startsWith(month) && n.fulfilled
      ).length;

      return {
        month: date.toLocaleDateString("en-US", { month: "short" }),
        donations: monthDonations,
        needs: monthNeeds,
        fulfilled: monthFulfilled,
      };
    });

    return {
      statusData,
      priorityData,
      foodTypeData,
      donationsOverTime,
      monthlyData,
    };
  }, [donations, urgentNeeds]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Total Donations
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalDonations}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Pending Pickups
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {pendingPickups}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Urgent Needs</p>
              <p className="text-2xl font-semibold text-gray-900">
                {urgentCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-semibold text-gray-900">
                {expiringSoon}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">
            Donation Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Urgent Needs Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">
            Food Types Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.foodTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Donations This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.donationsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="donations"
              stackId="1"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.6}
              name="Donations"
            />
            <Area
              type="monotone"
              dataKey="needs"
              stackId="2"
              stroke="#F59E0B"
              fill="#F59E0B"
              fillOpacity={0.6}
              name="Urgent Needs"
            />
            <Area
              type="monotone"
              dataKey="fulfilled"
              stackId="3"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.6}
              name="Fulfilled Needs"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DashboardStats;
