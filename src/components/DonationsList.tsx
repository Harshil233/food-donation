import React from "react";
import type { Donation } from "../types";
import { Phone, MapPin } from "lucide-react";

interface DonationsListProps {
  donations: Donation[];
  updateDonationStatus: (id: string, status: Donation["status"]) => void;
  isExpiringSoon: (expiryDate: string) => boolean;
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => string;
}

const DonationsList: React.FC<DonationsListProps> = ({
  donations,
  updateDonationStatus,
  isExpiringSoon,
  formatDate,
  getStatusColor,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Donor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Food Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {donations.map((donation) => (
            <tr
              key={donation.id}
              className={isExpiringSoon(donation.expiryDate) ? "bg-red-50" : ""}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {donation.donorName}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {donation.donorContact}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {donation.location}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{donation.foodType}</div>
                {donation.notes && (
                  <div className="text-sm text-gray-500">{donation.notes}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {donation.quantity} {donation.unit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  className={
                    isExpiringSoon(donation.expiryDate)
                      ? "text-red-600 font-medium"
                      : ""
                  }
                >
                  {formatDate(donation.expiryDate)}
                  {isExpiringSoon(donation.expiryDate) && (
                    <span className="ml-1 text-xs">(Expiring Soon!)</span>
                  )}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    donation.status
                  )}`}
                >
                  {donation.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {donation.status === "pending" && (
                  <button
                    onClick={() =>
                      updateDonationStatus(donation.id, "collected")
                    }
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Mark Collected
                  </button>
                )}
                {donation.status === "collected" && (
                  <button
                    onClick={() =>
                      updateDonationStatus(donation.id, "distributed")
                    }
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Mark Distributed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DonationsList;
