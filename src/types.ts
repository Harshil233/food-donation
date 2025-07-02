export interface Donation {
  id: string;
  donorName: string;
  donorContact: string;
  foodType: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  status: "pending" | "collected" | "distributed";
  location: string;
  createdAt: string;
  notes?: string;
}

export interface UrgentNeed {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  priority: "high" | "medium" | "low";
  deadline: string;
  location: string;
  createdAt: string;
  fulfilled: boolean;
}

export interface Volunteer {
  id: string;
  volunteerName: string;
  contact: string;
  availableDate: string;
  createdAt: string;
}
