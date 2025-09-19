import React from "react";
import {
  Heart,
  BarChart3,
  User,
  Award,
  Flame,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Star,
  Target,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const mockProfile = {
  name: "Priya Sharma",
  age: 34,
  gender: "Female",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  prakriti: "Pitta",
  bmi: 24.5,
  weight: 72,
  height: 165,
  email: "priya.sharma@example.com",
  phone: "+91-9000000000",
  dietary_habits: "Vegetarian",
  allergies: "Peanuts",
  chronic_conditions: ["None"],
  goals: ["Weight Management", "Better Digestion"],
  compliance: 85,
  streak: 12,
  doshaScores: [
    { dosha: "Vata", score: 60 },
    { dosha: "Pitta", score: 90 },
    { dosha: "Kapha", score: 40 },
  ],
  recentActivity: [
    {
      type: "meal",
      label: "Logged Lunch",
      date: "2025-09-16",
      status: "on-plan",
      icon: "Flame",
    },
    {
      type: "reminder",
      label: "Took Evening Snack",
      date: "2025-09-15",
      status: "on-plan",
      icon: "CheckCircle",
    },
    {
      type: "feedback",
      label: "Received feedback: Great compliance!",
      date: "2025-09-15",
      status: "positive",
      icon: "Award",
    },
    {
      type: "meal",
      label: "Logged Dinner",
      date: "2025-09-14",
      status: "off-plan",
      icon: "XCircle",
    },
  ],
  languages: ["English", "Hindi"],
};

// Icon mapping for activity timeline
const activityIcons = {
  Flame: Flame,
  CheckCircle: CheckCircle,
  Award: Award,
  XCircle: XCircle,
};

type ActivityIconKey = keyof typeof activityIcons;

export default function PatientProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-10 px-2">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={mockProfile.avatar}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-emerald-400 shadow-lg object-cover bg-white"
            />
            <span className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md">
              Patient
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-7 h-7 text-emerald-500" />
                {mockProfile.name}
              </h1>
            </div>
            <div className="flex gap-2 mb-2">
              {mockProfile.languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {lang}
                </span>
              ))}
            </div>
            <div className="flex gap-3 text-gray-600 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Age: {mockProfile.age}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> {mockProfile.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" /> {mockProfile.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
            <Flame className="w-8 h-8 text-orange-400 mb-2" />
            <div className="text-gray-600 text-sm">BMI</div>
            <div className="text-2xl font-bold text-gray-900">
              {mockProfile.bmi}
            </div>
            <div className="text-xs text-gray-400">Body Mass Index</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
            <Target className="w-8 h-8 text-emerald-500 mb-2" />
            <div className="text-gray-600 text-sm">Compliance</div>
            <div className="text-2xl font-bold text-gray-900">
              {mockProfile.compliance}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${mockProfile.compliance}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 mt-1">Weekly Compliance</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
            <Award className="w-8 h-8 text-purple-500 mb-2" />
            <div className="text-gray-600 text-sm">Streak</div>
            <div className="text-2xl font-bold text-gray-900">
              {mockProfile.streak} days
            </div>
            <div className="text-xs text-gray-400">Current streak</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
            <Star className="w-8 h-8 text-yellow-400 mb-2" />
            <div className="text-gray-600 text-sm">Prakriti</div>
            <div className="text-2xl font-bold text-gray-900">
              {mockProfile.prakriti}
            </div>
            <div className="text-xs text-gray-400">Ayurvedic Constitution</div>
          </div>
        </div>

        {/* Profile & Dosha Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Overview */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-700">Gender:</span>{" "}
                  {mockProfile.gender}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Weight:</span>{" "}
                  {mockProfile.weight} kg
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Height:</span>{" "}
                  {mockProfile.height} cm
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Dietary Habits:
                  </span>{" "}
                  {mockProfile.dietary_habits}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Allergies:
                  </span>{" "}
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold ml-1">
                    {mockProfile.allergies}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Chronic Conditions:
                  </span>{" "}
                  {mockProfile.chronic_conditions.map((c) => (
                    <span
                      key={c}
                      className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold ml-1"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Goals:</span>{" "}
                  {mockProfile.goals.map((g) => (
                    <span
                      key={g}
                      className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-semibold ml-1"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={mockProfile.doshaScores}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="dosha" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Dosha"
                        dataKey="score"
                        stroke="#fbbf24"
                        fill="#fbbf24"
                        fillOpacity={0.5}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Prakriti Dosha Profile
                </div>
              </div>
            </div>
          </div>
          {/* Activity Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Activity
              </h2>
            </div>
            {mockProfile.recentActivity.map((a, i) => {
              const Icon = activityIcons[a.icon as ActivityIconKey] || Flame;
              const statusColor =
                a.status === "on-plan"
                  ? "bg-emerald-400"
                  : a.status === "off-plan"
                  ? "bg-red-400"
                  : "bg-blue-400";
              return (
                <div key={i} className="flex items-start gap-3 relative">
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${statusColor} text-white shadow-lg`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    {i !== mockProfile.recentActivity.length - 1 && (
                      <span className="w-1 h-8 bg-gray-200 block mx-auto"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">
                      {a.label}
                    </div>
                    <div className="text-xs text-gray-500">{a.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
