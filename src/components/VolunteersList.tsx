import React from "react";
import type { Volunteer } from "../types";

interface VolunteersListProps {
  volunteers: Volunteer[];
  formatDate: (dateString: string) => string;
}

const VolunteersList: React.FC<VolunteersListProps> = ({
  volunteers,
  formatDate,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Available Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Signed Up
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {volunteers.map((v) => (
            <tr key={v.id}>
              <td className="px-6 py-4 whitespace-nowrap">{v.volunteerName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{v.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(v.availableDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(v.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default VolunteersList;
