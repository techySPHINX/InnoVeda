import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Heart,
  Activity,
  Bell,
  MessageSquare,
  BarChart3,
  Pill,
  Utensils,
  Target,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Leaf,
  Sun,
  Moon,
  Droplets,
  Wind,
  Edit3,
  Trash2,
  Plus,
  Eye,
  Star,
  Award,
} from "lucide-react";

// Mock Data
const initialPatient = {
  name: "Priya Sharma",
  id: "AYU12345",
  age: 45,
  condition: "Pitta Imbalance",
  constitution: "Vata-Pitta",
  avatar: "PS",
  lastVisit: "2025-09-15",
};

const initialDietChart = {
  date: "2025-09-17",
  meals: {
    breakfast: ["Warm Oat Porridge", "Fresh Berries", "Herbal Tea"],
    lunch: ["Quinoa Bowl", "Steamed Vegetables", "Turmeric Rice"],
    dinner: ["Lentil Soup", "Sautéed Greens", "Chamomile Tea"],
  },
};

const initialAppointments = [
  {
    id: 1,
    doctor: "Dr. Ayesha Kumar",
    specialty: "Ayurvedic Physician",
    time: "10:00 AM",
    date: "2025-09-20",
    type: "Consultation",
  },
  {
    id: 2,
    doctor: "Dr. Rajesh Patel",
    specialty: "Panchakarma Specialist",
    time: "02:30 PM",
    date: "2025-09-22",
    type: "Therapy",
  },
  {
    id: 3,
    doctor: "Dr. Meera Singh",
    specialty: "Nutritionist",
    time: "11:15 AM",
    date: "2025-09-23",
    type: "Diet Review",
  },
  {
    id: 4,
    doctor: "Dr. Suresh Iyer",
    specialty: "Yoga Therapist",
    time: "09:00 AM",
    date: "2025-09-24",
    type: "Yoga Session",
  },
  {
    id: 5,
    doctor: "Dr. Kavita Rao",
    specialty: "Herbalist",
    time: "03:00 PM",
    date: "2025-09-25",
    type: "Herbal Consultation",
  },
  {
    id: 6,
    doctor: "Dr. Anil Gupta",
    specialty: "General Physician",
    time: "01:30 PM",
    date: "2025-09-26",
    type: "Follow-up",
  },
  {
    id: 7,
    doctor: "Dr. Priya Sharma",
    specialty: "Lifestyle Coach",
    time: "04:45 PM",
    date: "2025-09-27",
    type: "Lifestyle Advice",
  },
];

const initialHealthRecords = [
  {
    id: 1,
    type: "Blood Pressure",
    value: "120/80 mmHg",
    date: "2025-09-15",
    status: "Normal",
  },
  {
    id: 2,
    type: "Pulse Rate",
    value: "72 bpm",
    date: "2025-09-16",
    status: "Good",
  },
  {
    id: 3,
    type: "Body Temperature",
    value: "98.6°F",
    date: "2025-09-17",
    status: "Normal",
  },
];

const initialMedications = [
  {
    id: 1,
    name: "Triphala Churna",
    dose: "1 tsp",
    time: "Before Sleep",
    type: "Herbal Powder",
  },
  {
    id: 2,
    name: "Ashwagandha Capsules",
    dose: "500mg",
    time: "Morning",
    type: "Capsule",
  },
  { id: 3, name: "Brahmi Oil", dose: "5 drops", time: "Evening", type: "Oil" },
];

const initialGoals = [
  { id: 1, goal: "Balance Dosha", progress: 75, target: "3 months" },
  { id: 2, goal: "Stress Reduction", progress: 60, target: "2 months" },
  { id: 3, goal: "Weight Management", progress: 85, target: "4 months" },
];

export default function AyurvedicPatientDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [patient] = useState(initialPatient);
  const [dietChart] = useState(initialDietChart);
  type Appointment = (typeof initialAppointments)[number];
  const [appointments] = useState<Appointment[]>(initialAppointments);
  const [rescheduleId, setRescheduleId] = useState<number | null>(null);
  const [rescheduleStatus, setRescheduleStatus] = useState<
    Record<string, { submitted: boolean; doctor: string }>
  >({});
  // Modal for reschedule request
  type RescheduleModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (date: string, time: string, reason: string) => void;
    appointment?: Appointment;
  };
  function RescheduleModal({
    open,
    onClose,
    onSubmit,
    appointment,
  }: RescheduleModalProps) {
    const [date, setDate] = useState<string>(appointment?.date || "");
    const [time, setTime] = useState<string>(appointment?.time || "");
    const [reason, setReason] = useState<string>("");
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h2 className="text-lg font-bold mb-4">Request Reschedule</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">New Date</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">New Time</label>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Reason for Reschedule
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button
              onClick={() => onSubmit(date, time, reason)}
              className="px-4 py-2 bg-emerald-600 text-white rounded font-semibold"
              disabled={!date || !time || !reason.trim()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
  const [healthRecords] = useState(initialHealthRecords);
  const [medications] = useState(initialMedications);
  const [goals] = useState(initialGoals);
  const [openGoalId, setOpenGoalId] = useState<number | null>(null);

  // Animated, professional modal for goal details
  function GoalDetailsModal({
    goal,
    open,
    onClose,
  }: {
    goal: (typeof initialGoals)[number];
    open: boolean;
    onClose: () => void;
  }) {
    if (!open || !goal) return null;
    // Example SVG diagram (can be replaced with a more complex SVG or Lottie)
    const diagram = (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="mx-auto mb-4 animate-pulse"
      >
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="#fef3c7"
          stroke="#f59e42"
          strokeWidth="4"
        />
        <circle cx="60" cy="60" r="40" fill="#fff7ed" />
        <path
          d="M60 20 A40 40 0 1 1 59.9 20"
          fill="none"
          stroke="#f59e42"
          strokeWidth="8"
          strokeDasharray={251.2}
          strokeDashoffset={251.2 - (goal.progress / 100) * 251.2}
          strokeLinecap="round"
        />
        <text
          x="60"
          y="68"
          textAnchor="middle"
          fontSize="2em"
          fill="#f59e42"
          fontWeight="bold"
        >
          {goal.progress}%
        </text>
      </svg>
    );
    // Animated icon
    const icon = goal.goal.includes("Dosha") ? (
      <Target className="w-10 h-10 text-emerald-500 animate-bounce" />
    ) : goal.goal.includes("Stress") ? (
      <Activity className="w-10 h-10 text-blue-500 animate-spin-slow" />
    ) : (
      <Award className="w-10 h-10 text-amber-500 animate-pulse" />
    );
    // Recommendations mock
    const recommendations = [
      "Follow your personalized diet plan.",
      "Practice daily yoga and meditation.",
      "Track your vitals regularly.",
      "Consult your doctor for monthly review.",
    ];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-slide-up">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
          <div className="flex flex-col items-center">
            {icon}
            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-1">
              {goal.goal}
            </h2>
            <span className="text-sm text-gray-500 mb-4">
              Target: {goal.target}
            </span>
            {diagram}
            <div className="mb-4 w-full">
              <h3 className="text-lg font-semibold text-emerald-700 mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-emerald-500 animate-pulse" />{" "}
                Progress Details
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>
                  Current Progress:{" "}
                  <span className="font-semibold">{goal.progress}%</span>
                </li>
                <li>
                  Status:{" "}
                  <span className="font-semibold">
                    {goal.progress >= 75
                      ? "On Track"
                      : goal.progress >= 50
                      ? "In Progress"
                      : "Needs Attention"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-2 w-full">
              <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-400 animate-bounce" />{" "}
                Recommendations
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold shadow hover:bg-emerald-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fade-in 0.2s ease; }
          @keyframes slide-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .animate-slide-up { animation: slide-up 0.3s cubic-bezier(.4,2,.6,1) forwards; }
          @keyframes spin-slow { 100% { transform: rotate(360deg); } }
          .animate-spin-slow { animation: spin-slow 2.5s linear infinite; }
        `}</style>
      </div>
    );
  }

  const tabs = [
    { id: 0, label: "Overview", icon: BarChart3 },
    { id: 1, label: "Diet Plan", icon: Utensils },
    { id: 2, label: "Medications", icon: Pill },
    { id: 3, label: "Appointments", icon: Calendar },
    { id: 4, label: "Progress", icon: Target },
    { id: 5, label: "Reports", icon: FileText },
    { id: 6, label: "Feedback", icon: MessageSquare },
  ];
  // Feedback State
  const [feedback, setFeedback] = useState({
    doctor: appointments[0]?.doctor || "",
    rating: 5,
    title: "",
    message: "",
    submitted: false,
  });

  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const renderFeedback = () => (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-8 border border-blue-100 shadow">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-8 w-8 text-emerald-600 animate-bounce" />
          <h2 className="text-2xl font-bold text-emerald-900">
            Share Your Feedback
          </h2>
          <span className="ml-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            For Your Doctor
          </span>
        </div>
        {feedback.submitted ? (
          <div className="flex flex-col items-center py-12">
            <CheckCircle className="h-12 w-12 text-emerald-500 animate-pulse mb-4" />
            <h3 className="text-xl font-bold text-emerald-800 mb-2">
              Thank you for your feedback!
            </h3>
            <p className="text-gray-700 text-center max-w-md mb-4">
              Your feedback helps us improve your care experience and supports
              your doctor in providing the best holistic treatment. We value
              your input and are grateful for your trust in our healthcare
              journey.
            </p>
            <button
              className="mt-2 px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold shadow hover:bg-emerald-700 transition"
              onClick={() =>
                setFeedback({
                  ...feedback,
                  submitted: false,
                  title: "",
                  message: "",
                })
              }
            >
              Submit Another Feedback
            </button>
          </div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setFeedbackLoading(true);
              setTimeout(() => {
                setFeedback((f) => ({ ...f, submitted: true }));
                setFeedbackLoading(false);
              }, 1200);
            }}
          >
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Doctor
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={feedback.doctor}
                onChange={(e) =>
                  setFeedback((f) => ({ ...f, doctor: e.target.value }))
                }
                required
              >
                {appointments.map((a) => (
                  <option key={a.id} value={a.doctor}>
                    {a.doctor} ({a.specialty})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`focus:outline-none ${
                      star <= feedback.rating
                        ? "text-amber-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setFeedback((f) => ({ ...f, rating: star }))}
                  >
                    <Star
                      className="w-7 h-7"
                      fill={star <= feedback.rating ? "#f59e42" : "none"}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {feedback.rating} / 5
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. Excellent Consultation Experience"
                value={feedback.title}
                onChange={(e) =>
                  setFeedback((f) => ({ ...f, title: e.target.value }))
                }
                required
                maxLength={60}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Feedback
              </label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={5}
                placeholder="Share your experience, suggestions, or concerns..."
                value={feedback.message}
                onChange={(e) =>
                  setFeedback((f) => ({ ...f, message: e.target.value }))
                }
                required
                maxLength={500}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold shadow hover:bg-emerald-700 transition flex items-center gap-2"
                disabled={
                  feedbackLoading ||
                  !feedback.title.trim() ||
                  !feedback.message.trim()
                }
              >
                {feedbackLoading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                )}
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="text-center text-gray-500 text-xs">
        Your feedback is confidential and will be shared only with your doctor
        and the care team for quality improvement.
      </div>
    </div>
  );

  type StatCardProps = {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: string;
    color?: string;
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    trend,
    color = "emerald",
  }: StatCardProps) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div
            className={`w-12 h-12 rounded-lg bg-${color}-50 flex items-center justify-center`}
          >
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-500">
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Patient Info Card */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
            {patient.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {patient.name}
                </h2>
                <p className="text-emerald-600 font-medium">ID: {patient.id}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span>Age: {patient.age}</span>
                  <span>•</span>
                  <span>Constitution: {patient.constitution}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  {patient.condition}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Last Visit: {patient.lastVisit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Heart}
          title="Overall Health"
          value="Good"
          subtitle="Stable vitals"
          trend="+5%"
          color="emerald"
        />
        <StatCard
          icon={Activity}
          title="Dosha Balance"
          value="75%"
          subtitle="Improving"
          trend="+12%"
          color="blue"
        />
        <StatCard
          icon={Target}
          title="Goals Progress"
          value="3/4"
          subtitle="On track"
          trend="+8%"
          color="purple"
        />
        <StatCard
          icon={Star}
          title="Compliance"
          value="92%"
          subtitle="Excellent"
          trend="+3%"
          color="amber"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
              Upcoming Appointments
            </h3>
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {appointments.slice(0, 2).map((apt) => (
              <div
                key={apt.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{apt.doctor}</p>
                  <p className="text-sm text-gray-600">{apt.specialty}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium text-gray-900">{apt.date}</p>
                  <p className="text-gray-600">{apt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Health Records */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-emerald-600" />
              Recent Vitals
            </h3>
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {healthRecords.slice(0, 3).map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{record.type}</p>
                    <p className="text-sm text-gray-600">{record.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{record.value}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDietPlan = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Leaf className="w-6 h-6 mr-2 text-emerald-600" />
            Personalized Diet Plan
          </h2>
          <div className="text-sm text-gray-600">
            <Calendar className="w-4 h-4 inline mr-1" />
            {dietChart.date}
          </div>
        </div>
        <p className="text-gray-600 mb-6">
          Customized according to your Vata-Pitta constitution
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(dietChart.meals).map(([mealType, items]) => {
            const mealIcons = {
              breakfast: Sun,
              lunch: Sun,
              dinner: Moon,
            };
            type MealType = keyof typeof mealIcons;
            const MealIcon = mealIcons[mealType as MealType] || Utensils;

            return (
              <div
                key={mealType}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center capitalize">
                  <MealIcon className="w-5 h-5 mr-2 text-emerald-600" />
                  {mealType}
                </h3>
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-2 bg-gray-50 rounded-md"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ayurvedic Guidelines */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Droplets className="w-5 h-5 mr-2 text-blue-600" />
          Ayurvedic Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Eat warm, cooked foods
                </p>
                <p className="text-sm text-gray-600">Supports Vata balance</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Avoid spicy foods</p>
                <p className="text-sm text-gray-600">
                  Reduces Pitta aggravation
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Eat at regular times
                </p>
                <p className="text-sm text-gray-600">
                  Maintains digestive fire
                </p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <Wind className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Practice mindful eating
                </p>
                <p className="text-sm text-gray-600">Improves digestion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedications = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
          <Pill className="w-6 h-6 mr-2 text-purple-600" />
          Herbal Medications
        </h2>
        <p className="text-gray-600 mb-6">
          Natural remedies prescribed for your constitution
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Pill className="w-6 h-6 text-purple-600" />
                </div>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                  {med.type}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{med.name}</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-12">Dose:</span>
                  <span className="font-medium">{med.dose}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{med.time}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                  View Details
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-amber-600" />
          Treatment Goals & Progress
        </h2>
        <div className="space-y-6">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-amber-500 mr-2" />
                  <h3 className="font-semibold text-gray-900">{goal.goal}</h3>
                </div>
                <span className="text-sm text-gray-600">
                  Target: {goal.target}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-sm">
                  {goal.progress >= 75 ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-1" />
                      <span className="text-emerald-600 font-medium">
                        On Track
                      </span>
                    </>
                  ) : goal.progress >= 50 ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-500 mr-1" />
                      <span className="text-amber-600 font-medium">
                        In Progress
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-red-600 font-medium">
                        Needs Attention
                      </span>
                    </>
                  )}
                </div>
                <button
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  onClick={() => setOpenGoalId(goal.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <GoalDetailsModal
        goal={goals.find((g) => g.id === openGoalId)!}
        open={openGoalId !== null}
        onClose={() => setOpenGoalId(null)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Priya'S Journey
          </h1>
          <p className="text-gray-600">
            Holistic health management for mind, body, and spirit
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-8">
          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-in slide-in-from-right-4 duration-300">
          {activeTab === 0 && renderOverview()}
          {activeTab === 1 && renderDietPlan()}
          {activeTab === 2 && renderMedications()}
          {activeTab === 3 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Appointments
              </h2>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-semibold">{apt.doctor}</h3>
                      <p className="text-gray-600">{apt.specialty}</p>
                      <p className="text-sm text-gray-500">{apt.type}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-right">
                        <p className="font-medium">{apt.date}</p>
                        <p className="text-gray-600">{apt.time}</p>
                      </div>
                      {rescheduleStatus[String(apt.id)]?.submitted ? (
                        <div className="flex items-center gap-2 mt-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          <span className="text-emerald-600 font-medium">
                            Submitted to doctor{" "}
                            {rescheduleStatus[String(apt.id)].doctor}
                          </span>
                        </div>
                      ) : (
                        <button
                          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition"
                          onClick={() => setRescheduleId(apt.id)}
                        >
                          Request Reschedule
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <RescheduleModal
                open={rescheduleId !== null}
                onClose={() => setRescheduleId(null)}
                onSubmit={(date: string, time: string, reason: string) => {
                  const apt = appointments.find((a) => a.id === rescheduleId);
                  if (apt) {
                    setRescheduleStatus((prev) => ({
                      ...prev,
                      [String(rescheduleId)]: {
                        submitted: true,
                        doctor: apt.doctor,
                      },
                    }));
                  }
                  setRescheduleId(null);
                }}
                appointment={appointments.find((a) => a.id === rescheduleId)}
              />
            </div>
          )}
          {activeTab === 4 && renderProgress()}
          {activeTab === 5 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-8 w-8 text-blue-600 animate-bounce" />
                <h2 className="text-2xl font-bold text-blue-900">
                  Health Reports
                </h2>
                <span className="ml-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                  Summary
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* Vitals Card */}
                <div className="rounded-xl bg-gradient-to-br from-green-50 to-white shadow border border-green-100 p-6 flex flex-col items-center">
                  <Heart className="h-10 w-10 text-green-500 animate-pulse mb-2" />
                  <div className="text-lg font-bold text-green-900 mb-1">
                    Vitals
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    BP: 120/80 mmHg
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    Pulse: 72 bpm
                  </div>
                  <div className="text-sm text-gray-700">Temp: 98.6°F</div>
                </div>
                {/* Dosha Balance Card */}
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-white shadow border border-blue-100 p-6 flex flex-col items-center">
                  <Leaf className="h-10 w-10 text-blue-500 animate-spin-slow mb-2" />
                  <div className="text-lg font-bold text-blue-900 mb-1">
                    Dosha Balance
                  </div>
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    className="mb-2"
                  >
                    <circle cx="40" cy="40" r="36" fill="#e0f2fe" />
                    <path
                      d="M40 8 A32 32 0 1 1 39.9 8"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="8"
                      strokeDasharray="201"
                      strokeDashoffset="50"
                      strokeLinecap="round"
                    />
                    <text
                      x="40"
                      y="48"
                      textAnchor="middle"
                      fontSize="1.5em"
                      fill="#38bdf8"
                      fontWeight="bold"
                    >
                      75%
                    </text>
                  </svg>
                  <div className="text-sm text-gray-700">
                    Vata-Pitta (Stable)
                  </div>
                </div>
                {/* Compliance Card */}
                <div className="rounded-xl bg-gradient-to-br from-amber-50 to-white shadow border border-amber-100 p-6 flex flex-col items-center">
                  <Star className="h-10 w-10 text-amber-500 animate-bounce mb-2" />
                  <div className="text-lg font-bold text-amber-900 mb-1">
                    Compliance
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-700">
                      92% this month
                    </span>
                  </div>
                </div>
              </div>
              {/* Recommendations & Timeline */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-white shadow border border-emerald-100 p-6">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-500 animate-pulse" />{" "}
                    Recommendations
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                    <li>Continue your current diet and exercise plan.</li>
                    <li>Practice daily meditation for stress reduction.</li>
                    <li>Monitor your vitals weekly.</li>
                    <li>Schedule a follow-up with your doctor next month.</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-white shadow border border-blue-100 p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-500 animate-spin-slow" />{" "}
                    Recent Activity
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />{" "}
                      2025-09-16: All meals on plan
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />{" "}
                      2025-09-15: Completed yoga session
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />{" "}
                      2025-09-14: Missed evening walk
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />{" "}
                      2025-09-13: Vitals normal
                    </li>
                  </ul>
                </div>
              </div>
              <style>{`
                @keyframes spin-slow { 100% { transform: rotate(360deg); } }
                .animate-spin-slow { animation: spin-slow 2.5s linear infinite; }
              `}</style>
            </div>
          )}
          {activeTab === 6 && renderFeedback()}
        </div>
      </div>
    </div>
  );
}
