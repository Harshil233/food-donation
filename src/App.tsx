import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import DonationForm from "./components/DonationForm";
import NeedForm from "./components/NeedForm";
import VolunteerForm from "./components/VolunteerForm";
import DonationsList from "./components/DonationsList";
import UrgentNeedsList from "./components/UrgentNeedsList";
import VolunteersList from "./components/VolunteersList";
import type { Donation, UrgentNeed, Volunteer } from "./types";
import { loadFromStorage, saveToStorage } from "./utils/localStorage";
import { Plus } from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [donations, setDonations] = useState<Donation[]>(
    loadFromStorage<Donation[]>("donations", [])
  );
  const [urgentNeeds, setUrgentNeeds] = useState<UrgentNeed[]>(
    loadFromStorage<UrgentNeed[]>("urgentNeeds", [])
  );
  const [volunteers, setVolunteers] = useState<Volunteer[]>(
    loadFromStorage<Volunteer[]>("volunteers", [])
  );
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showNeedForm, setShowNeedForm] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);

  useEffect(() => {
    saveToStorage("donations", donations);
  }, [donations]);
  useEffect(() => {
    saveToStorage("urgentNeeds", urgentNeeds);
  }, [urgentNeeds]);
  useEffect(() => {
    saveToStorage("volunteers", volunteers);
  }, [volunteers]);

  const addDonation = (donation: Omit<Donation, "id" | "createdAt">) => {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setDonations((prev) => [newDonation, ...prev]);
  };

  const addUrgentNeed = (
    need: Omit<UrgentNeed, "id" | "createdAt" | "fulfilled">
  ) => {
    const newNeed: UrgentNeed = {
      ...need,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      fulfilled: false,
    };
    setUrgentNeeds((prev) => [newNeed, ...prev]);
  };

  const addVolunteer = (volunteer: Omit<Volunteer, "id" | "createdAt">) => {
    const newVolunteer: Volunteer = {
      ...volunteer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setVolunteers((prev) => [newVolunteer, ...prev]);
  };

  const updateDonationStatus = (id: string, status: Donation["status"]) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const toggleNeedFulfillment = (id: string) => {
    setUrgentNeeds((prev) =>
      prev.map((n) => (n.id === id ? { ...n, fulfilled: !n.fulfilled } : n))
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "collected":
        return "bg-blue-100 text-blue-800";
      case "distributed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            </div>
            <DashboardStats
              donations={donations}
              urgentNeeds={urgentNeeds}
              isExpiringSoon={isExpiringSoon}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
                <div className="space-y-3">
                  {donations.slice(0, 3).map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {donation.donorName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {donation.foodType} - {donation.quantity}{" "}
                          {donation.unit}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          donation.status
                        )}`}
                      >
                        {donation.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Urgent Needs</h3>
                <div className="space-y-3">
                  {urgentNeeds
                    .filter((n) => !n.fulfilled)
                    .slice(0, 3)
                    .map((need) => (
                      <div
                        key={need.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {need.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {need.quantity} {need.unit} needed by{" "}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                            need.priority
                          )}`}
                        >
                          {need.priority}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "donations" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Donations</h2>
              <button
                onClick={() => setShowDonationForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Donation
              </button>
            </div>
            <DonationsList
              donations={donations}
              updateDonationStatus={updateDonationStatus}
              isExpiringSoon={isExpiringSoon}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
            />
          </div>
        )}

        {activeTab === "needs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Urgent Needs</h2>
              <button
                onClick={() => setShowNeedForm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Need
              </button>
            </div>
            <UrgentNeedsList
              urgentNeeds={urgentNeeds}
              toggleNeedFulfillment={toggleNeedFulfillment}
              formatDate={formatDate}
              getPriorityColor={getPriorityColor}
            />
          </div>
        )}

        {activeTab === "volunteers" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Volunteers</h2>
              <button
                onClick={() => setShowVolunteerForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Volunteer Signup
              </button>
            </div>
            <VolunteersList volunteers={volunteers} formatDate={formatDate} />
          </div>
        )}
      </main>

      {showDonationForm && (
        <DonationForm
          addDonation={addDonation}
          onClose={() => setShowDonationForm(false)}
        />
      )}
      {showNeedForm && (
        <NeedForm
          addUrgentNeed={addUrgentNeed}
          onClose={() => setShowNeedForm(false)}
        />
      )}
      {showVolunteerForm && (
        <VolunteerForm
          addVolunteer={addVolunteer}
          onClose={() => setShowVolunteerForm(false)}
        />
      )}
    </div>
  );
};

export default App;
