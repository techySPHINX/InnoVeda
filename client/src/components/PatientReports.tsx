import React, { useState } from "react";
import { FileText, Calendar, User, Eye, XCircle, Award } from "lucide-react";

// Mock reports data
const mockReports = [
  {
    id: 1,
    title: "Comprehensive Health Report",
    date: "2025-09-10",
    doctor: {
      name: "Dr. Anjali Verma",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      specialty: "Ayurvedic Physician",
    },
    summary:
      "All vitals normal. Continue current lifestyle. Minor vitamin D deficiency detected.",
    details: `
      <b>Vitals:</b> All within normal range.<br/>
      <b>Deficiency:</b> Vitamin D (mild)<br/>
      <b>Recommendations:</b> Increase sun exposure, supplement if needed.<br/>
      <b>Doctor's Note:</b> Excellent progress. Keep up the good work!<br/>
      <b>Next Steps:</b> <span style='color:#059669'>No action required</span>`,
    actionable: false,
  },
  {
    id: 2,
    title: "Quarterly Diabetes Review",
    date: "2025-06-15",
    doctor: {
      name: "Dr. Vikram Patel",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      specialty: "Endocrinologist",
    },
    summary: "HbA1c slightly above target. Adjust medication and diet.",
    details: `
      <b>Test:</b> HbA1c<br/>
      <b>Result:</b> 7.2% (target: < 7%)<br/>
      <b>Recommendations:</b> Reduce sugar intake, increase physical activity.<br/>
      <b>Doctor's Note:</b> Medication adjusted. Follow up in 3 months.<br/>
      <b>Next Steps:</b> <span style='color:#f59e42'>Book follow-up appointment</span>`,
    actionable: true,
    actionLabel: "Book Follow-up",
    action: () => alert("Booking follow-up with Dr. Vikram Patel..."),
  },
  {
    id: 3,
    title: "Annual Eye Checkup",
    date: "2024-12-20",
    doctor: {
      name: "Dr. Riya Sethi",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      specialty: "Ophthalmologist",
    },
    summary: "No vision changes. Mild dryness noted.",
    details: `
      <b>Test:</b> Visual Acuity, Eye Pressure<br/>
      <b>Findings:</b> Normal vision, mild dryness.<br/>
      <b>Recommendations:</b> Use lubricating drops, reduce screen time.<br/>
      <b>Doctor's Note:</b> No major concerns.<br/>
      <b>Next Steps:</b> <span style='color:#059669'>No action required</span>`,
    actionable: false,
  },
  {
    id: 4,
    title: "Cardiac Risk Assessment",
    date: "2024-10-05",
    doctor: {
      name: "Dr. Suresh Menon",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      specialty: "Cardiologist",
    },
    summary:
      "Mildly elevated cholesterol. Advised dietary changes and exercise.",
    details: `
      <b>Test:</b> Lipid Profile, ECG<br/>
      <b>Findings:</b> LDL cholesterol slightly high, ECG normal.<br/>
      <b>Recommendations:</b> Start daily walks, reduce saturated fats.<br/>
      <b>Doctor's Note:</b> No medication needed at this time.<br/>
      <b>Next Steps:</b> <span style='color:#f59e42'>Update diet plan</span>`,
    actionable: true,
    actionLabel: "Update Diet Plan",
    action: () => alert("Redirecting to diet plan update..."),
  },
  {
    id: 5,
    title: "Allergy Panel Results",
    date: "2024-07-18",
    doctor: {
      name: "Dr. Meera Joshi",
      image: "https://randomuser.me/api/portraits/women/47.jpg",
      specialty: "Immunologist",
    },
    summary: "Mild allergy to peanuts and dust mites detected.",
    details: `
      <b>Test:</b> IgE Allergy Panel<br/>
      <b>Findings:</b> Mild reaction to peanuts, dust mites.<br/>
      <b>Recommendations:</b> Avoid exposure, carry antihistamines.<br/>
      <b>Doctor's Note:</b> Inform school/workplace.<br/>
      <b>Next Steps:</b> <span style='color:#f59e42'>Add to allergy list</span>`,
    actionable: true,
    actionLabel: "Add to Allergy List",
    action: () => alert("Adding to allergy list..."),
  },
  {
    id: 6,
    title: "Physical Therapy Progress",
    date: "2024-05-12",
    doctor: {
      name: "Dr. Rajeev Kumar",
      image: "https://randomuser.me/api/portraits/men/61.jpg",
      specialty: "Physiotherapist",
    },
    summary: "Improved mobility in left knee. Continue exercises.",
    details: `
      <b>Session:</b> 8/12 completed<br/>
      <b>Progress:</b> Range of motion improved by 20%.<br/>
      <b>Recommendations:</b> Continue home exercises, next review in 2 weeks.<br/>
      <b>Doctor's Note:</b> Great effort!<br/>
      <b>Next Steps:</b> <span style='color:#f59e42'>Book next session</span>`,
    actionable: true,
    actionLabel: "Book Next Session",
    action: () => alert("Booking next physical therapy session..."),
  },
];

export default function PatientReports() {
  const [selectedReport, setSelectedReport] = useState(
    null as null | (typeof mockReports)[0]
  );
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [bookedIds, setBookedIds] = useState<number[]>([]);

  // Helper to handle booking and show message
  const handleAction = (report: (typeof mockReports)[0]) => {
    setBookedIds((ids) => [...ids, report.id]);
    setSuccessMsg(`Booked follow-up with ${report.doctor.name} successfully!`);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-10 px-2">
      {/* Success alert */}
      {successMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-800 px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          <svg
            className="w-6 h-6 text-emerald-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-700 mb-8 flex items-center gap-2">
          <Award className="w-7 h-7 text-emerald-500" /> Reports
        </h1>
        {/* Highlight most recent report */}
        {mockReports.length > 0 && (
          <div className="mb-10 animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-200 p-8 flex flex-col md:flex-row gap-6 items-center relative">
              <div className="flex-shrink-0">
                <img
                  src={mockReports[0].doctor.image}
                  alt={mockReports[0].doctor.name}
                  className="w-24 h-24 rounded-full border-4 border-emerald-400 shadow-lg object-cover mb-2"
                />
                <div className="text-center mt-2">
                  <div className="font-semibold text-emerald-700">
                    {mockReports[0].doctor.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {mockReports[0].doctor.specialty}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-500 text-sm">
                    {mockReports[0].date}
                  </span>
                </div>
                <div className="font-bold text-2xl text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-emerald-400" />{" "}
                  {mockReports[0].title}
                </div>
                <div className="text-gray-700 text-base mb-3">
                  {mockReports[0].summary}
                </div>
                <button
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold shadow transition-colors"
                  onClick={() => setSelectedReport(mockReports[0])}
                >
                  <Eye className="w-5 h-5" /> View Details
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Other reports as cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
          {mockReports.slice(1).map((rep, idx) => (
            <div
              key={rep.id}
              className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6 flex flex-col gap-3 relative hover:scale-[1.02] hover:shadow-xl transition-transform duration-200"
              style={{ animationDelay: `${(idx + 1) * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={rep.doctor.image}
                  alt={rep.doctor.name}
                  className="w-12 h-12 rounded-full border-2 border-emerald-300 object-cover"
                />
                <div>
                  <div className="font-semibold text-emerald-700">
                    {rep.doctor.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {rep.doctor.specialty}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-500 text-xs">{rep.date}</span>
              </div>
              <div className="font-bold text-lg text-gray-900 mb-1 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" /> {rep.title}
              </div>
              <div className="text-gray-700 text-sm mb-2">{rep.summary}</div>
              <div className="flex-1 flex flex-col justify-end">
                <div className="flex justify-center mt-4">
                  <button
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition-colors"
                    onClick={() => setSelectedReport(rep)}
                  >
                    <Eye className="w-5 h-5" /> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal for report details */}
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-slide-up">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => setSelectedReport(null)}
                aria-label="Close"
              >
                <XCircle className="w-7 h-7" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-emerald-500" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedReport.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-500 text-sm">
                  {selectedReport.date}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={selectedReport.doctor.image}
                  alt={selectedReport.doctor.name}
                  className="w-10 h-10 rounded-full border-2 border-emerald-300 object-cover"
                />
                <div>
                  <div className="font-semibold text-emerald-700">
                    {selectedReport.doctor.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {selectedReport.doctor.specialty}
                  </div>
                </div>
              </div>
              <div
                className="text-gray-700 text-base mb-4"
                dangerouslySetInnerHTML={{ __html: selectedReport.details }}
              />
              {selectedReport.actionable && (
                <button
                  className={`mb-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow w-full transition-colors ${
                    bookedIds.includes(selectedReport.id)
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() =>
                    !bookedIds.includes(selectedReport.id) &&
                    handleAction(selectedReport)
                  }
                  disabled={bookedIds.includes(selectedReport.id)}
                >
                  {bookedIds.includes(selectedReport.id) ? (
                    <span className="flex items-center gap-2 justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Booked
                    </span>
                  ) : (
                    selectedReport.actionLabel
                  )}
                </button>
              )}
              <button
                className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold shadow w-full transition-colors"
                onClick={() => setSelectedReport(null)}
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
