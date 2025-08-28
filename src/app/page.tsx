"use client";

import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { Advocate } from "../types/advocate";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const formatPhoneNumber = (phone: number): string => {
    const phoneStr = phone.toString();
    return `(${phoneStr.slice(0, 3)})-${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  };

  const fetchAdvocates = useCallback(async (searchTerm: string) => {
    const url = searchTerm.trim() 
      ? `/api/advocates?searchTerm=${encodeURIComponent(searchTerm)}` 
      : '/api/advocates';
      
    try {
      const response = await fetch(url);
      const jsonResponse = await response.json();
      setAdvocates(jsonResponse.data);
    } catch (error) {
      console.error('Error fetching advocates:', error);
    }
  }, []);

  const debouncedFetch = useCallback(
    debounce((term: string) => fetchAdvocates(term), 600),
    [fetchAdvocates]
  );

  useEffect(() => {
    fetchAdvocates("");
  }, [fetchAdvocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedFetch(newSearchTerm);
  };

  const onClick = () => {
    setSearchTerm("");
    fetchAdvocates("");
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-center mb-8 text-3xl font-bold">Solace Advocates</h1>
      <div className="text-center mb-8 flex gap-4 justify-center items-center">
        <span className="font-medium">Search</span>
        <input 
          className="border border-black px-3 py-2 rounded"
          placeholder="Search for Advocates"
          value={searchTerm}
          onChange={onChange} 
        />
        <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200" onClick={onClick}>Reset</button>
      </div>
      <table className="mx-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">City</th>
            <th className="table-header">Degree</th>
            <th className="table-header">Specialties</th>
            <th className="table-header w-20">Experience (Years)</th>
            <th className="table-header w-32">Phone</th>
          </tr>
        </thead>
        <tbody>
          {advocates.length === 0 ? (
            <tr>
              <td colSpan={6} className="table-cell text-center">No Advocates found, please search again</td>
            </tr>
          ) : (
            advocates.map((advocate, index) => {
              return (
                <tr key={`${advocate.lastName}-${index}`} className="even:bg-gray-50">
                  <td className="table-cell">{advocate.firstName} {advocate.lastName}</td>
                  <td className="table-cell">{advocate.city}</td>
                  <td className="table-cell">{advocate.degree}</td>
                  <td className="table-cell">
                    <ul className="list-disc list-inside">
                      {advocate.specialties.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="table-cell w-20 text-center">{advocate.yearsOfExperience}</td>
                  <td className="table-cell w-32 whitespace-nowrap">{formatPhoneNumber(advocate.phoneNumber)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </main>
  );
}
