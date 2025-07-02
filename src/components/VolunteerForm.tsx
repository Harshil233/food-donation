import React, { useState } from "react";
import type { Volunteer } from "../types";

interface VolunteerFormProps {
  addVolunteer: (volunteer: Omit<Volunteer, "id" | "createdAt">) => void;
  onClose: () => void;
}

const VolunteerForm: React.FC<VolunteerFormProps> = ({
  addVolunteer,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    volunteerName: "",
    contact: "",
    availableDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVolunteer(formData);
    setFormData({
      volunteerName: "",
      contact: "",
      availableDate: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Volunteer Signup</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.volunteerName}
              onChange={(e) =>
                setFormData({ ...formData, volunteerName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              required
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Date
            </label>
            <input
              type="date"
              required
              value={formData.availableDate}
              onChange={(e) =>
                setFormData({ ...formData, availableDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
