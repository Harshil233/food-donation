import React from "react";
import type { UrgentNeed } from "../types";
import { Package, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface UrgentNeedsListProps {
  urgentNeeds: UrgentNeed[];
  toggleNeedFulfillment: (id: string) => void;
  formatDate: (dateString: string) => string;
  getPriorityColor: (priority: string) => string;
}

const UrgentNeedsList: React.FC<UrgentNeedsListProps> = ({
  urgentNeeds,
  toggleNeedFulfillment,
  formatDate,
  getPriorityColor,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {urgentNeeds.map((need) => (
      <div
        key={need.id}
        className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
          need.fulfilled ? "opacity-60" : ""
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <h3
            className={`text-lg font-semibold ${
              need.fulfilled ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {need.title}
          </h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
              need.priority
            )}`}
          >
            {need.priority}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{need.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Package className="h-4 w-4 mr-2" />
            {need.quantity} {need.unit}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Deadline: {formatDate(need.deadline)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {need.location}
          </div>
        </div>
        <button
          onClick={() => toggleNeedFulfillment(need.id)}
          className={`w-full py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 ${
            need.fulfilled
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500"
              : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
          } flex items-center justify-center gap-2`}
        >
          <CheckCircle2 className="h-4 w-4" />
          {need.fulfilled ? "Mark as Needed" : "Mark as Fulfilled"}
        </button>
      </div>
    ))}
  </div>
);

export default UrgentNeedsList;
