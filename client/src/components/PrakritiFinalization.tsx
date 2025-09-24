import React from "react";

const PrakritiFinalization: React.FC = () => {
  // Example: Replace with real API data
  const pendingAssessments = [
    {
      id: 1,
      patient: "John Doe",
      practitioner: "Dr. Sharma",
      status: "Verified",
      prakritiType: "Vata-Pitta",
      submittedAt: "2025-09-18 14:32",
      age: 34,
      gender: "Male",
      notes: "Patient shows strong Vata dominance with mild Pitta.",
    },
    {
      id: 2,
      patient: "Jane Smith",
      practitioner: "Dr. Patel",
      status: "Verified",
      prakritiType: "Kapha",
      submittedAt: "2025-09-19 10:15",
      age: 28,
      gender: "Female",
      notes: "Kapha prakriti confirmed. No conflicting symptoms.",
    },
  ];

  const handleFinalize = (id: number) => {
    // TODO: API call to finalize and publish
    alert(`Finalized assessment ${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        Prakriti Assessment Finalization
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-white p-2">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="p-3 font-semibold">Patient</th>
              <th className="p-3 font-semibold">Age</th>
              <th className="p-3 font-semibold">Gender</th>
              <th className="p-3 font-semibold">Practitioner</th>
              <th className="p-3 font-semibold">Prakriti Type</th>
              <th className="p-3 font-semibold">Submitted</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Notes</th>
              <th className="p-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingAssessments.map((a, idx) => (
              <tr
                key={a.id}
                className={
                  idx % 2 === 0
                    ? "bg-white hover:bg-blue-50 transition"
                    : "bg-blue-50 hover:bg-blue-100 transition"
                }
              >
                <td className="p-3 font-medium text-blue-900">{a.patient}</td>
                <td className="p-3">{a.age}</td>
                <td className="p-3">{a.gender}</td>
                <td className="p-3 text-blue-700 font-semibold">
                  {a.practitioner}
                </td>
                <td className="p-3">
                  <span className="inline-block px-2 py-1 rounded bg-blue-200 text-blue-900 font-semibold">
                    {a.prakritiType}
                  </span>
                </td>
                <td className="p-3 text-gray-600">{a.submittedAt}</td>
                <td className="p-3">
                  <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 font-bold border border-green-300">
                    {a.status}
                  </span>
                </td>
                <td className="p-3 max-w-xs text-gray-700">{a.notes}</td>
                <td className="p-3">
                  <button
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded shadow font-semibold transition"
                    onClick={() => handleFinalize(a.id)}
                  >
                    Finalize & Publish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-gray-600 text-xs text-right">
        Showing {pendingAssessments.length} pending assessments
      </div>
    </div>
  );
};

export default PrakritiFinalization;
