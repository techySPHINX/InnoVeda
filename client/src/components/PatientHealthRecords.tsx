import React, { useState } from "react";
import { FileText, Calendar, Eye, XCircle } from "lucide-react";

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
      <b>Doctor's Note:</b> Maintain current diet, increase physical activity, recheck in 6 months.`,
  },
  {
    id: 2,
    title: "X-Ray - Chest",
    date: "2025-06-22",
    summary: "No abnormalities detected.",
    details: `
      <b>Test:</b> Chest X-Ray<br/>
      <b>Findings:</b> Clear lungs, no signs of infection or mass.<br/>
      <b>Doctor's Note:</b> No action needed.`,
  },
  {
    id: 3,
    title: "Blood Pressure Check",
    date: "2025-04-15",
    summary: "BP slightly elevated, advised lifestyle changes.",
    details: `
      <b>Test:</b> Blood Pressure<br/>
      <b>Findings:</b> 135/88 mmHg<br/>
      <b>Doctor's Note:</b> Reduce salt intake, regular exercise, monitor weekly.`,
  },
  {
    id: 4,
    title: "COVID-19 RT-PCR",
    date: "2024-12-01",
    summary: "Negative.",
    details: `
      <b>Test:</b> RT-PCR for SARS-CoV-2<br/>
      <b>Findings:</b> Negative<br/>
      <b>Doctor's Note:</b> Continue precautions.`,
  },
];

export default function PatientHealthRecords() {
  const [selectedRecord, setSelectedRecord] = useState(
    null as null | (typeof mockHealthRecords)[0]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-10 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-emerald-700 mb-8 flex items-center gap-2">
          <FileText className="w-7 h-7 text-emerald-500" /> Health Records
        </h1>
        <div className="space-y-6">
          {mockHealthRecords.map((rec, idx) => (
            <div
              key={rec.id}
              className={`relative bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-xl p-6 shadow flex flex-col md:flex-row items-center gap-4 transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl animate-fade-in-up`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-500 text-sm">{rec.date}</span>
                </div>
                <div className="font-semibold text-lg text-gray-900 mb-1">
                  {rec.title}
                </div>
                <div className="text-gray-700 text-sm mb-2">{rec.summary}</div>
              </div>
              <button
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition-colors"
                onClick={() => setSelectedRecord(rec)}
              >
                <Eye className="w-5 h-5" /> View Details
              </button>
            </div>
          ))}
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
