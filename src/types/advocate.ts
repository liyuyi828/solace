export interface AdvocateDB {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: unknown;
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date | null;
}

export interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}