import db from "../../../db";
import { advocates } from "../../../db/schema";
import { AdvocateDB } from "../../../types/advocate";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('searchTerm') || '';

  const data: AdvocateDB[] = await db.select().from(advocates);
  
  if (!searchTerm.trim()) {
    return Response.json({ data });
  }

  const trimmedTerm: string = searchTerm.trim().toLowerCase();
  const filteredData: AdvocateDB[] = data.filter((advocate: AdvocateDB) => {
    const specialties = Array.isArray(advocate.specialties) ? advocate.specialties as string[] : [];
    return (
      advocate.firstName.toLowerCase().includes(trimmedTerm) ||
      advocate.lastName.toLowerCase().includes(trimmedTerm) ||
      advocate.city.toLowerCase().includes(trimmedTerm) ||
      advocate.degree.toLowerCase().includes(trimmedTerm) ||
      specialties.some((specialty: string) => specialty.toLowerCase().includes(trimmedTerm)) ||
      advocate.yearsOfExperience.toString().includes(trimmedTerm)
    );
  });

  return Response.json({ data: filteredData });
}
