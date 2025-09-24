import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Eye,
  XCircle,
  UserPlus,
  UserMinus,
  Users,
} from "lucide-react";

// Mock health records data
const mockHealthRecords = [
  {
    id: 1,
    title: "Annual Blood Test",
    date: "2025-08-10",
    summary: "Normal CBC, slightly elevated cholesterol.",
    details: `
      <b>Test:</b> Complete Blood Count, Lipid Profile<br/>
      <b>Findings:</b> All values within normal range except LDL cholesterol (borderline high).<br/>
  <b>Practitioner's Note:</b> Maintain current diet, increase physical activity, recheck in 6 months.`,
  },
  {
    id: 2,
    title: "X-Ray - Chest",
    date: "2025-06-22",
    summary: "No abnormalities detected.",
    details: `
      <b>Test:</b> Chest X-Ray<br/>
      <b>Findings:</b> Clear lungs, no signs of infection or mass.<br/>
  <b>Practitioner's Note:</b> No action needed.`,
  },
  {
    id: 3,
    title: "Blood Pressure Check",
    date: "2025-04-15",
    summary: "BP slightly elevated, advised lifestyle changes.",
    details: `
      <b>Test:</b> Blood Pressure<br/>
      <b>Findings:</b> 135/88 mmHg<br/>
  <b>Practitioner's Note:</b> Reduce salt intake, regular exercise, monitor weekly.`,
  },
  {
    id: 4,
    title: "COVID-19 RT-PCR",
    date: "2024-12-01",
    summary: "Negative.",
    details: `
      <b>Test:</b> RT-PCR for SARS-CoV-2<br/>
      <b>Findings:</b> Negative<br/>
  <b>Practitioner's Note:</b> Continue precautions.`,
  },
];

// Mock users (doctors/admins)
const mockUsers = [
  { id: "d1", name: "Dr. A. Sharma", role: "Doctor" },
  { id: "d2", name: "Dr. B. Singh", role: "Doctor" },
  { id: "a1", name: "Admin R. Patel", role: "Admin" },
];

// Initial access and view logs (simulate backend)
const initialAccess = {
  1: ["d1"], // recordId: [userIds with access]
  2: ["d2", "a1"],
  3: [],
  4: ["a1"],
};
const initialViewLogs = {
  1: [{ userId: "d1", date: "2025-09-18" }],
  2: [
    { userId: "d2", date: "2025-09-19" },
    { userId: "a1", date: "2025-09-20" },
  ],
  3: [],
  4: [{ userId: "a1", date: "2025-09-17" }],
};

export default function PatientHealthRecords() {
  const [selectedRecord, setSelectedRecord] = useState(
    null as null | (typeof mockHealthRecords)[0]
  );
  // Simulate backend state for access and view logs
  const [access, setAccess] = useState<{ [recordId: number]: string[] }>(
    initialAccess
  );
  const [viewLogs, setViewLogs] = useState<{
    [recordId: number]: { userId: string; date: string }[];
  }>(initialViewLogs);

  // Grant access to a user for a record
  const grantAccess = (recordId: number, userId: string) => {
    setAccess((prev) => ({
      ...prev,
      [recordId]: [...(prev[recordId] || []), userId],
    }));
  };
  // Revoke access
  const revokeAccess = (recordId: number, userId: string) => {
    setAccess((prev) => ({
      ...prev,
      [recordId]: (prev[recordId] || []).filter((id) => id !== userId),
    }));
  };

  // Simulate a user viewing a record (for demo, not triggered in UI)
  const logView = (recordId: number, userId: string) => {
    setViewLogs((prev) => ({
      ...prev,
      [recordId]: [
        ...(prev[recordId] || []),
        { userId, date: new Date().toISOString().slice(0, 10) },
      ],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-10 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-emerald-700 mb-8 flex items-center gap-2">
          <FileText className="w-7 h-7 text-emerald-500" /> Health Records
        </h1>
        <div className="space-y-6">
          {mockHealthRecords.map((rec, idx) => {
            const allowedUsers = access[rec.id] || [];
            const viewers = (viewLogs[rec.id] || [])
              .map((log) => {
                const user = mockUsers.find((u) => u.id === log.userId);
                return user ? { ...user, date: log.date } : null;
              })
              .filter(Boolean) as Array<{
              id: string;
              name: string;
              role: string;
              date: string;
            }>;
            return (
              <div
                key={rec.id}
                className={`relative bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-xl p-6 shadow flex flex-col md:flex-row items-center gap-4 transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl animate-fade-in-up`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-500 text-sm">{rec.date}</span>
                  </div>
                  <div className="font-semibold text-lg text-gray-900 mb-1">
                    {rec.title}
                  </div>
                  <div className="text-gray-700 text-sm mb-2">
                    {rec.summary}
                  </div>
                  {/* Viewers */}
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-gray-500">Viewed by:</span>
                    {viewers.length === 0 ? (
                      <span className="text-xs text-gray-400 ml-1">
                        No one yet
                      </span>
                    ) : (
                      viewers.map((v) => (
                        <span
                          key={v.id}
                          className="text-xs bg-emerald-100 text-emerald-700 rounded px-2 py-0.5 ml-1"
                        >
                          {v.name}{" "}
                          <span className="text-gray-400">({v.role})</span>{" "}
                          <span className="text-gray-400">on {v.date}</span>
                        </span>
                      ))
                    )}
                  </div>
                  {/* Access controls */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {mockUsers.map((user) =>
                      allowedUsers.includes(user.id) ? (
                        <button
                          key={user.id}
                          className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200 border border-red-200"
                          onClick={() => revokeAccess(rec.id, user.id)}
                        >
                          <UserMinus className="w-3 h-3" /> Revoke {user.name}
                        </button>
                      ) : (
                        <button
                          key={user.id}
                          className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs hover:bg-emerald-200 border border-emerald-200"
                          onClick={() => grantAccess(rec.id, user.id)}
                        >
                          <UserPlus className="w-3 h-3" /> Grant {user.name}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <button
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition-colors"
                  onClick={() => setSelectedRecord(rec)}
                >
                  <Eye className="w-5 h-5" /> View Details
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal for record details */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-slide-up">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => setSelectedRecord(null)}
                aria-label="Close"
              >
                <XCircle className="w-7 h-7" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-emerald-500" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedRecord.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-500 text-sm">
                  {selectedRecord.date}
                </span>
              </div>
              <div
                className="text-gray-700 text-base mb-4"
                dangerouslySetInnerHTML={{ __html: selectedRecord.details }}
              />
              {/* Viewers in modal */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-gray-500">Viewed by:</span>
                </div>
                {(viewLogs[selectedRecord.id] || []).length === 0 ? (
                  <span className="text-xs text-gray-400 ml-6">No one yet</span>
                ) : (
                  (viewLogs[selectedRecord.id] || []).map((log, i) => {
                    const user = mockUsers.find((u) => u.id === log.userId);
                    return user ? (
                      <div
                        key={user.id + log.date}
                        className="ml-6 text-xs bg-emerald-100 text-emerald-700 rounded px-2 py-0.5 my-0.5 inline-block"
                      >
                        {user.name}{" "}
                        <span className="text-gray-400">({user.role})</span>{" "}
                        <span className="text-gray-400">on {log.date}</span>
                      </div>
                    ) : null;
                  })
                )}
              </div>
              {/* Access controls in modal */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-gray-500">Access control:</span>
                </div>
                <div className="flex flex-wrap gap-2 ml-6 mt-1">
                  {mockUsers.map((user) =>
                    (access[selectedRecord.id] || []).includes(user.id) ? (
                      <button
                        key={user.id}
                        className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200 border border-red-200"
                        onClick={() => revokeAccess(selectedRecord.id, user.id)}
                      >
                        <UserMinus className="w-3 h-3" /> Revoke {user.name}
                      </button>
                    ) : (
                      <button
                        key={user.id}
                        className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs hover:bg-emerald-200 border border-emerald-200"
                        onClick={() => grantAccess(selectedRecord.id, user.id)}
                      >
                        <UserPlus className="w-3 h-3" /> Grant {user.name}
                      </button>
                    )
                  )}
                </div>
              </div>
              <button
                className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold shadow w-full transition-colors"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in-up { opacity: 0; transform: translateY(20px); animation: fadeInUp 0.5s forwards; }
        @keyframes fadeInUp { to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fadeIn 0.3s forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(.4,2,.6,1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
