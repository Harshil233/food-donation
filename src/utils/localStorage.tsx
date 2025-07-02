import type { Donation, UrgentNeed, Volunteer } from "../types";

export const DEFAULT_DONATIONS: Donation[] = [
  {
    id: "1",
    donorName: "Fresh Market Store",
    donorContact: "+91 98765 43210",
    foodType: "Fresh Vegetables",
    quantity: 50,
    unit: "kg",
    expiryDate: "2025-07-04",
    status: "pending",
    location: "Koramangala, Bangalore",
    createdAt: "2025-07-02T10:30:00Z",
    notes: "Mixed seasonal vegetables, good quality",
  },
  {
    id: "2",
    donorName: "City Bakery",
    donorContact: "+91 87654 32109",
    foodType: "Bread & Pastries",
    quantity: 100,
    unit: "pieces",
    expiryDate: "2025-07-03",
    status: "collected",
    location: "Indiranagar, Bangalore",
    createdAt: "2025-07-01T15:20:00Z",
    notes: "Fresh bread and assorted pastries",
  },
  {
    id: "3",
    donorName: "Rajesh Restaurant",
    donorContact: "+91 99887 76543",
    foodType: "Cooked Rice",
    quantity: 30,
    unit: "kg",
    expiryDate: "2025-07-03",
    status: "distributed",
    location: "BTM Layout, Bangalore",
    createdAt: "2025-07-01T12:45:00Z",
    notes: "Freshly cooked basmati rice",
  },
  {
    id: "4",
    donorName: "Metro Supermarket",
    donorContact: "+91 88776 65432",
    foodType: "Canned Foods",
    quantity: 200,
    unit: "pieces",
    expiryDate: "2025-12-31",
    status: "pending",
    location: "Electronic City, Bangalore",
    createdAt: "2025-07-02T08:15:00Z",
    notes: "Assorted canned vegetables and fruits",
  },
];

export const DEFAULT_URGENT_NEEDS: UrgentNeed[] = [
  {
    id: "1",
    title: "Rice for Shelter Residents",
    description: "Need 200kg rice for 150 residents at homeless shelter",
    quantity: 200,
    unit: "kg",
    priority: "high",
    deadline: "2025-07-05",
    location: "Whitefield Shelter, Bangalore",
    createdAt: "2025-07-02T09:00:00Z",
    fulfilled: false,
  },
  {
    id: "2",
    title: "Cooking Oil for Community Kitchen",
    description:
      "Urgent need for cooking oil to prepare meals for 300 families",
    quantity: 20,
    unit: "liters",
    priority: "medium",
    deadline: "2025-07-06",
    location: "Jayanagar Community Center",
    createdAt: "2025-07-01T14:30:00Z",
    fulfilled: false,
  },
  {
    id: "3",
    title: "Fresh Vegetables for Orphanage",
    description: "Weekly vegetables needed for 80 children at local orphanage",
    quantity: 100,
    unit: "kg",
    priority: "high",
    deadline: "2025-07-04",
    location: "Shanti Orphanage, Mysore Road",
    createdAt: "2025-07-02T11:20:00Z",
    fulfilled: false,
  },
  {
    id: "4",
    title: "Milk Powder for Nutrition Center",
    description: "Monthly supply of milk powder for malnourished children",
    quantity: 50,
    unit: "packets",
    priority: "low",
    deadline: "2025-07-10",
    location: "Anganwadi Center, Banashankari",
    createdAt: "2025-07-01T16:45:00Z",
    fulfilled: true,
  },
];

export const DEFAULT_VOLUNTEERS: Volunteer[] = [
  {
    id: "1",
    volunteerName: "Harshil Rathod",
    contact: "+91 12345 67890",
    availableDate: "2025-07-07",
    createdAt: "2025-07-02T05:20:00Z",
  },
];

export const STORAGE_KEYS = {
  DONATIONS: "donations",
  URGENT_NEEDS: "urgentNeeds",
  VOLUNTEERS: "volunteers",
} as const;

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error(`Error loading from localStorage for key "${key}":`, error);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage for key "${key}":`, error);
  }
}

export function loadDonations(): Donation[] {
  const stored = loadFromStorage<Donation[]>(STORAGE_KEYS.DONATIONS, []);
  return stored.length > 0 ? stored : DEFAULT_DONATIONS;
}

export function saveDonations(donations: Donation[]): void {
  saveToStorage(STORAGE_KEYS.DONATIONS, donations);
}

export function loadUrgentNeeds(): UrgentNeed[] {
  const stored = loadFromStorage<UrgentNeed[]>(STORAGE_KEYS.URGENT_NEEDS, []);
  return stored.length > 0 ? stored : DEFAULT_URGENT_NEEDS;
}

export function saveUrgentNeeds(urgentNeeds: UrgentNeed[]): void {
  saveToStorage(STORAGE_KEYS.URGENT_NEEDS, urgentNeeds);
}

export function loadVolunteers(): Volunteer[] {
  const stored = loadFromStorage<Volunteer[]>(STORAGE_KEYS.VOLUNTEERS, []);
  return stored.length > 0 ? stored : DEFAULT_VOLUNTEERS;
}

export function saveVolunteers(volunteers: Volunteer[]): void {
  saveToStorage(STORAGE_KEYS.VOLUNTEERS, volunteers);
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.DONATIONS);
  localStorage.removeItem(STORAGE_KEYS.URGENT_NEEDS);
  localStorage.removeItem(STORAGE_KEYS.VOLUNTEERS);
}
if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
  localStorage.setItem(
    STORAGE_KEYS.DONATIONS,
    JSON.stringify(DEFAULT_DONATIONS)
  );
}
if (!localStorage.getItem(STORAGE_KEYS.URGENT_NEEDS)) {
  localStorage.setItem(
    STORAGE_KEYS.URGENT_NEEDS,
    JSON.stringify(DEFAULT_URGENT_NEEDS)
  );
}
if (!localStorage.getItem(STORAGE_KEYS.VOLUNTEERS)) {
  localStorage.setItem(
    STORAGE_KEYS.VOLUNTEERS,
    JSON.stringify(DEFAULT_VOLUNTEERS)
  );
}
