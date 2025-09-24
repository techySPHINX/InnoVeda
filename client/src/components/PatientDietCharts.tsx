interface ModalPopupProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalPopup: React.FC<ModalPopupProps> = ({
  title,
  onClose,
  children,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-emerald-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
            />
          </svg>
          {title}
        </h3>
        {children}
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Mock assigned practitioner data
const assignedPractitioner = {
  name: "Dr. Aditi Sharma",
  specialty: "Ayurvedic Physician",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg", // Example avatar
  status: "Ongoing Care",
};

const PractitionerCard = ({
  onAsk,
  onRequest,
}: {
  onAsk: () => void;
  onRequest: () => void;
}) => (
  <div className="flex items-center bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl shadow-sm border border-gray-100 p-6 mb-8 hover:shadow-lg transition-all duration-300">
    <div className="w-16 h-16 rounded-full bg-white border-4 border-emerald-200 flex items-center justify-center mr-6 overflow-hidden">
      <img
        src={assignedPractitioner.avatar}
        alt="Practitioner Avatar"
        className="w-14 h-14 rounded-full object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-6 1.119-6 3.333V19a1 1 0 001 1h10a1 1 0 001-1v-2.667C18 14.119 14.21 13 12 13z"
          />
        </svg>
        <span className="text-lg font-semibold text-gray-900">
          Assigned Practitioner
        </span>
      </div>
      <div className="text-xl font-bold text-emerald-800 mb-1">
        {assignedPractitioner.name}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        {assignedPractitioner.specialty}
      </div>
      <span className="inline-block bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full text-xs font-medium shadow-sm mb-3">
        {assignedPractitioner.status}
      </span>
      <div className="flex space-x-3 mt-2">
        <button
          onClick={onAsk}
          className="flex items-center px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-lg font-medium shadow-sm hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <svg
            className="w-5 h-5 mr-2 text-emerald-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
            />
          </svg>
          Ask a Question
        </button>
        <button
          onClick={onRequest}
          className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium shadow-sm hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <svg
            className="w-5 h-5 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Request Appointment
        </button>
      </div>
    </div>
  </div>
);
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Leaf,
  Utensils,
  BarChart3,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
  Target,
  Flame,
  Droplets,
  Sun,
  Moon,
  Star,
  Award,
  Eye,
  Filter,
  Download,
  Share2,
} from "lucide-react";

const mockDietData = [
  {
    day: "Mon",
    calories: 1800,
    protein: 60,
    carbs: 220,
    fat: 50,
    fiber: 28,
    water: 2.5,
  },
  {
    day: "Tue",
    calories: 1750,
    protein: 65,
    carbs: 210,
    fat: 48,
    fiber: 32,
    water: 2.8,
  },
  {
    day: "Wed",
    calories: 1900,
    protein: 70,
    carbs: 230,
    fat: 55,
    fiber: 30,
    water: 3.0,
  },
  {
    day: "Thu",
    calories: 1850,
    protein: 68,
    carbs: 225,
    fat: 52,
    fiber: 29,
    water: 2.6,
  },
  {
    day: "Fri",
    calories: 1700,
    protein: 62,
    carbs: 200,
    fat: 47,
    fiber: 26,
    water: 2.4,
  },
  {
    day: "Sat",
    calories: 2000,
    protein: 75,
    carbs: 240,
    fat: 60,
    fiber: 35,
    water: 3.2,
  },
  {
    day: "Sun",
    calories: 1650,
    protein: 58,
    carbs: 195,
    fat: 45,
    fiber: 24,
    water: 2.3,
  },
];

const doshaBalanceData = [
  { dosha: "Vata", current: 65, optimal: 70 },
  { dosha: "Pitta", current: 80, optimal: 75 },
  { dosha: "Kapha", current: 55, optimal: 60 },
];

const nutritionRadarData = [
  { nutrient: "Protein", value: 85 },
  { nutrient: "Carbs", value: 78 },
  { nutrient: "Fiber", value: 92 },
  { nutrient: "Vitamins", value: 88 },
  { nutrient: "Minerals", value: 75 },
  { nutrient: "Water", value: 70 },
];

const macroPieData = [
  { name: "Protein (25%)", value: 400, color: "#34d399" },
  { name: "Carbs (50%)", value: 1320, color: "#60a5fa" },
  { name: "Fat (25%)", value: 357, color: "#fbbf24" },
];

type MealStatus = "excellent" | "on-plan" | "off-plan" | "poor";
type MealLog = {
  date: string;
  meal: string;
  status: MealStatus;
  rationale: string;
  foods: string[];
  time: string;
  doshaEffect: string;
};

const mealLogs: MealLog[] = [
  {
    date: "2025-09-17",
    meal: "Breakfast",
    status: "on-plan",
    rationale:
      "Warm oatmeal with ghee - pacifies Vata, supports morning digestion",
    foods: ["Oat Porridge", "Ghee", "Almonds", "Herbal Tea"],
    time: "8:00 AM",
    doshaEffect: "Balances Vata",
  },
  {
    date: "2025-09-17",
    meal: "Lunch",
    status: "on-plan",
    rationale: "High protein quinoa bowl - cooling for Pitta, energizing",
    foods: ["Quinoa Bowl", "Steamed Vegetables", "Coconut Water"],
    time: "1:00 PM",
    doshaEffect: "Cools Pitta",
  },
  {
    date: "2025-09-17",
    meal: "Dinner",
    status: "excellent",
    rationale: "Light lentil soup - easy digestion, promotes sound sleep",
    foods: ["Moong Dal", "Sautéed Greens", "Chamomile Tea"],
    time: "7:30 PM",
    doshaEffect: "Balances all Doshas",
  },
  {
    date: "2025-09-16",
    meal: "Breakfast",
    status: "on-plan",
    rationale:
      "Fresh fruits and nuts - natural energy, good for Pitta constitution",
    foods: ["Mixed Berries", "Walnuts", "Green Tea"],
    time: "8:15 AM",
    doshaEffect: "Supports Pitta",
  },
];

const todaysMeals = [
  {
    meal: "Early Morning",
    time: "6:30 AM",
    foods: ["Warm Water with Lemon", "Tulsi Tea"],
    rationale: "Cleanses digestive system, prepares Agni (digestive fire)",
    calories: 15,
    constitution: "All Doshas",
  },
  {
    meal: "Breakfast",
    time: "8:00 AM",
    foods: [
      "Oat Porridge (1 bowl)",
      "Ghee (1 tsp)",
      "Almonds (6-8)",
      "Herbal Tea",
    ],
    rationale:
      "Warm, nourishing breakfast to balance Vata and fuel morning energy",
    calories: 320,
    constitution: "Vata+",
  },
  {
    meal: "Mid-Morning",
    time: "10:30 AM",
    foods: ["Fresh Coconut Water", "Dates (2-3)"],
    rationale: "Natural electrolytes and quick energy without disturbing Pitta",
    calories: 85,
    constitution: "Pitta+",
  },
  {
    meal: "Lunch",
    time: "1:00 PM",
    foods: [
      "Quinoa Bowl (1 cup)",
      "Steamed Vegetables",
      "Buttermilk",
      "Coriander Chutney",
    ],
    rationale:
      "Complete protein with cooling properties, main meal when Agni is strongest",
    calories: 450,
    constitution: "All Doshas",
  },
  {
    meal: "Evening",
    time: "5:00 PM",
    foods: ["Herbal Tea", "Roasted Seeds Mix"],
    rationale: "Light snack to maintain energy without overloading digestion",
    calories: 120,
    constitution: "Vata+",
  },
  {
    meal: "Dinner",
    time: "7:30 PM",
    foods: [
      "Moong Dal Khichdi",
      "Steamed Greens",
      "Ghee (1 tsp)",
      "Chamomile Tea",
    ],
    rationale:
      "Light, easily digestible meal that promotes restful sleep and overnight healing",
    calories: 280,
    constitution: "All Doshas",
  },
];

// Mock recipe recommendations for each meal
const recipeRecommendations: Record<
  string,
  Array<{ name: string; benefit: string; link?: string }>
> = {
  "Early Morning": [
    {
      name: "Tulsi Lemon Detox Water",
      benefit: "Boosts immunity, supports digestion, and hydrates after sleep.",
    },
    {
      name: "Herbal Cleansing Tea",
      benefit: "Gently stimulates metabolism and balances all doshas.",
    },
  ],
  Breakfast: [
    {
      name: "Vata-Balancing Oat Porridge",
      benefit: "Warm, grounding, and easy to digest for morning energy.",
    },
    {
      name: "Almond Herbal Chai",
      benefit: "Nourishes nerves and supports mental clarity.",
    },
  ],
  "Mid-Morning": [
    {
      name: "Coconut Date Smoothie",
      benefit: "Natural electrolytes, cooling for Pitta, and quick energy.",
    },
  ],
  Lunch: [
    {
      name: "Quinoa Vegetable Bowl",
      benefit: "High protein, cooling, and balances all doshas at midday.",
    },
    {
      name: "Buttermilk Digestive Drink",
      benefit: "Aids digestion and soothes the gut after lunch.",
    },
  ],
  Evening: [
    {
      name: "Roasted Seed Trail Mix",
      benefit: "Light, energizing, and easy on digestion for Vata types.",
    },
  ],
  Dinner: [
    {
      name: "Moong Dal Khichdi",
      benefit:
        "Easily digestible, protein-rich, and calming for restful sleep.",
    },
    {
      name: "Steamed Greens with Ghee",
      benefit: "Provides minerals and supports overnight healing.",
    },
  ],
};

const COLORS = [
  "#34d399",
  "#60a5fa",
  "#fbbf24",
  "#f87171",
  "#a78bfa",
  "#fb7185",
];

export default function AdvancedAyurvedicDietCharts() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("week");
  const [selectedMealFilter, setSelectedMealFilter] = useState("all");
  const [showAskModal, setShowAskModal] = useState(false);
  const [askMessage, setAskMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<{
    title: string;
    message: string;
  } | null>(null);
  // Recipe modal state
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<any>(null);
  const [recipeQuestion, setRecipeQuestion] = useState("");
  const [showRecipeAlert, setShowRecipeAlert] = useState(false);
  const [recipeAlertContent, setRecipeAlertContent] = useState<string>("");

  // Mock recipe details DB (in real app, fetch from backend)
  const recipeDetails: Record<string, any> = {
    "Tulsi Lemon Detox Water": {
      ingredients: [
        "2 cups warm water",
        "5-6 fresh tulsi (holy basil) leaves",
        "1/2 lemon, freshly squeezed",
        "1/2 tsp honey (optional)",
      ],
      steps: [
        "Add tulsi leaves to warm water and let steep for 2-3 minutes.",
        "Add lemon juice and honey, stir well.",
        "Drink slowly on an empty stomach.",
      ],
      dosha: "All Doshas",
      nutrition: "Hydrating, rich in antioxidants, supports immunity.",
      contraindications: "Avoid honey if diabetic.",
      wellnessTips:
        "Best consumed first thing in the morning for detoxification.",
    },
    "Vata-Balancing Oat Porridge": {
      ingredients: [
        "1/2 cup rolled oats",
        "1 cup water",
        "1/2 cup milk (dairy or plant-based)",
        "1 tsp ghee",
        "6-8 almonds, chopped",
        "Pinch of cinnamon",
      ],
      steps: [
        "Cook oats in water and milk until soft.",
        "Stir in ghee, almonds, and cinnamon.",
        "Serve warm.",
      ],
      dosha: "Vata",
      nutrition: "Provides sustained energy, healthy fats, and protein.",
      contraindications: "Use plant milk for lactose intolerance.",
      wellnessTips: "Ideal for dry, cold mornings or Vata imbalance.",
    },
    "Coconut Date Smoothie": {
      ingredients: [
        "1 cup coconut water",
        "2-3 dates, pitted",
        "1/2 banana (optional)",
        "Pinch of cardamom",
      ],
      steps: ["Blend all ingredients until smooth.", "Serve cool, not cold."],
      dosha: "Pitta",
      nutrition: "Natural electrolytes, potassium, and quick energy.",
      contraindications: "Limit for high blood sugar.",
      wellnessTips: "Great for hot days or after exercise.",
    },
    "Quinoa Vegetable Bowl": {
      ingredients: [
        "1 cup cooked quinoa",
        "1 cup mixed steamed vegetables",
        "1 tbsp coriander chutney",
        "1/2 cup buttermilk",
      ],
      steps: [
        "Combine quinoa and vegetables in a bowl.",
        "Top with chutney and serve with buttermilk.",
      ],
      dosha: "All Doshas",
      nutrition: "High protein, fiber, and cooling properties.",
      contraindications: "None significant.",
      wellnessTips: "Eat as main meal when digestion is strongest (lunch).",
    },
    "Moong Dal Khichdi": {
      ingredients: [
        "1/2 cup moong dal (split yellow lentils)",
        "1/2 cup rice",
        "2 cups water",
        "1 tsp ghee",
        "1/2 tsp cumin seeds",
        "1/4 tsp turmeric",
        "Salt to taste",
      ],
      steps: [
        "Rinse dal and rice, add water, turmeric, and salt.",
        "Cook until soft and porridge-like.",
        "Heat ghee, add cumin, pour over khichdi and mix.",
      ],
      dosha: "All Doshas",
      nutrition: "Easily digestible, protein-rich, gentle on gut.",
      contraindications: "Reduce ghee for high cholesterol.",
      wellnessTips: "Ideal for dinner or during illness recovery.",
    },
    // ...add more as needed
  };

  type StatCardProps = {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    change?: string;
    changeType?: "positive" | "negative";
    color?: string;
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    change,
    changeType = "positive",
    color = "emerald",
  }: StatCardProps) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div
            className={`w-12 h-12 rounded-full bg-${color}-50 flex items-center justify-center`}
          >
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        {change && (
          <div
            className={`flex items-center space-x-1 ${
              changeType === "positive" ? "text-emerald-600" : "text-red-500"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
    </div>
  );

  type MealStatus = "excellent" | "on-plan" | "off-plan" | "poor";
  type MealLog = {
    date: string;
    meal: string;
    status: MealStatus;
    rationale: string;
    foods: string[];
    time: string;
    doshaEffect: string;
  };

  const MealCard = ({
    meal,
    isLast = false,
  }: {
    meal: MealLog;
    isLast?: boolean;
  }) => {
    const statusColors: Record<MealStatus, string> = {
      excellent: "bg-emerald-500",
      "on-plan": "bg-blue-500",
      "off-plan": "bg-amber-500",
      poor: "bg-red-500",
    };

    const statusLabels: Record<MealStatus, string> = {
      excellent: "Excellent",
      "on-plan": "On Plan",
      "off-plan": "Adjusted",
      poor: "Needs Attention",
    };

    return (
      <div className={`flex ${!isLast ? "pb-8" : ""}`}>
        <div className="flex flex-col items-center mr-4">
          <div
            className={`w-4 h-4 rounded-full ${
              statusColors[meal.status]
            } shadow-lg`}
          ></div>
          {!isLast && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
        </div>
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-lg text-gray-900">
                  {meal.meal}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    statusColors[meal.status]
                  }`}
                >
                  {statusLabels[meal.status]}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {meal.time}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {meal.date}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                {meal.doshaEffect}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Foods Consumed:
              </p>
              <div className="flex flex-wrap gap-2">
                {meal.foods.map((food: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs"
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Ayurvedic Rationale:
              </p>
              <p className="text-sm text-gray-600 italic">{meal.rationale}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Your's Ayurvedic Journey
                </h1>
                <p className="text-gray-600">
                  Personalized nutrition tracking for holistic wellness
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button
                className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => {
                  // Prepare data for export
                  const data = mealLogs.map((meal) => ({
                    Date: meal.date,
                    Meal: meal.meal,
                    Status: meal.status,
                    Foods: meal.foods.join(", "),
                    Time: meal.time,
                    DoshaEffect: meal.doshaEffect,
                    Rationale: meal.rationale,
                  }));
                  const ws = XLSX.utils.json_to_sheet(data);
                  const wb = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(wb, ws, "DietCharts");
                  const wbout = XLSX.write(wb, {
                    bookType: "xlsx",
                    type: "array",
                  });
                  saveAs(
                    new Blob([wbout], { type: "application/octet-stream" }),
                    "diet_charts.xlsx"
                  );
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              Patient Dashboard
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Vata-Pitta Constitution
            </span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Flame}
            title="Daily Calories"
            value="1,820"
            subtitle="Average this week"
            change="+5%"
            color="orange"
          />
          <StatCard
            icon={Target}
            title="Diet Compliance"
            value="92%"
            subtitle="Above target"
            change="+8%"
            color="emerald"
          />
          <StatCard
            icon={Droplets}
            title="Hydration"
            value="2.7L"
            subtitle="Daily average"
            change="+12%"
            color="blue"
          />
          <StatCard
            icon={Award}
            title="Streak"
            value="15 days"
            subtitle="Current streak"
            change="+1"
            color="purple"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Nutrition Trends */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
                Weekly Nutrition Analysis
              </h2>
              <div className="flex space-x-2">
                {["week", "month", "quarter"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedTimeRange === range
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockDietData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stackId="1"
                  stroke="#34d399"
                  fill="#34d399"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="protein"
                  stackId="2"
                  stroke="#60a5fa"
                  fill="#60a5fa"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="carbs"
                  stackId="3"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Dosha Balance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-emerald-600" />
              Dosha Balance
            </h2>
            <div className="space-y-6">
              {doshaBalanceData.map((dosha, idx) => (
                <div key={dosha.dosha}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">
                      {dosha.dosha}
                    </span>
                    <span className="text-sm text-gray-600">
                      {dosha.current}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        idx === 0
                          ? "bg-purple-500"
                          : idx === 1
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${dosha.current}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Target: {dosha.optimal}% | Current: {dosha.current}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nutrition Radar & Macro Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-emerald-600" />
              Nutritional Profile
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={nutritionRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="nutrient" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Current"
                  dataKey="value"
                  stroke="#34d399"
                  fill="#34d399"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2 text-emerald-600" />
              Macro Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={macroPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {macroPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Meal Plan with Recipe Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Sun className="w-5 h-5 mr-2 text-emerald-600" />
            Today's Ayurvedic Meal Plan
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-900">
                    Meal Time
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">
                    Time
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">
                    Foods & Portions
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">
                    Ayurvedic Benefits
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-900">
                    Calories
                  </th>
                </tr>
              </thead>
              <tbody>
                {todaysMeals.map((meal, idx) => (
                  <React.Fragment key={idx}>
                    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-3 ${
                              meal.meal.includes("Morning")
                                ? "bg-yellow-400"
                                : meal.meal === "Lunch"
                                ? "bg-orange-400"
                                : "bg-indigo-400"
                            }`}
                          ></div>
                          <span className="font-medium text-gray-900">
                            {meal.meal}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-gray-600">{meal.time}</td>
                      <td className="py-4 px-2">
                        <div className="space-y-1">
                          {meal.foods.map((food, i) => (
                            <span
                              key={i}
                              className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs mr-1"
                            >
                              {food}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-sm text-gray-600 max-w-xs">
                        <p className="italic">{meal.rationale}</p>
                        <span className="inline-block mt-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                          {meal.constitution}
                        </span>
                      </td>
                      <td className="py-4 px-2 font-semibold text-gray-900">
                        {meal.calories}
                      </td>
                    </tr>
                    {/* Recipe Recommendations Row */}
                    <tr className="border-b border-gray-50">
                      <td colSpan={5} className="py-2 px-2 bg-emerald-50/40">
                        <div className="flex items-center mb-2">
                          <Utensils className="w-4 h-4 mr-2 text-emerald-500" />
                          <span className="font-semibold text-emerald-800 text-sm">
                            Recommended Recipes:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {(recipeRecommendations[meal.meal] || []).map(
                            (rec, ridx) => (
                              <div
                                key={ridx}
                                className="bg-white border border-emerald-100 rounded-lg shadow-sm px-4 py-3 flex flex-col min-w-[200px] max-w-xs"
                              >
                                <span className="font-bold text-emerald-700 text-sm flex items-center mb-1">
                                  <Leaf className="w-4 h-4 mr-1 text-emerald-400" />
                                  {rec.name}
                                </span>
                                <span className="text-xs text-gray-600 mb-2">
                                  {rec.benefit}
                                </span>
                                <button
                                  className="mt-auto px-3 py-1 bg-emerald-500 text-white rounded-md text-xs font-medium hover:bg-emerald-600 transition-colors"
                                  onClick={() => {
                                    setActiveRecipe({
                                      name: rec.name,
                                      ...recipeDetails[rec.name],
                                    });
                                    setShowRecipeModal(true);
                                  }}
                                >
                                  View Recipe
                                </button>
                                {/* Recipe Detail Modal */}
                                {showRecipeModal && activeRecipe && (
                                  <ModalPopup
                                    title={activeRecipe.name}
                                    onClose={() => {
                                      setShowRecipeModal(false);
                                      setActiveRecipe(null);
                                      setRecipeQuestion("");
                                    }}
                                  >
                                    <div className="mb-3">
                                      <span className="block text-xs font-semibold text-emerald-700 mb-1">
                                        Dosha Suitability:
                                      </span>
                                      <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs mb-2">
                                        {activeRecipe.dosha}
                                      </span>
                                    </div>
                                    <div className="mb-3">
                                      <span className="block text-xs font-semibold text-emerald-700 mb-1">
                                        Ingredients:
                                      </span>
                                      <ul className="list-disc pl-5 text-sm text-gray-800 mb-2">
                                        {activeRecipe.ingredients.map(
                                          (ing: string, i: number) => (
                                            <li key={i}>{ing}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                    <div className="mb-3">
                                      <span className="block text-xs font-semibold text-emerald-700 mb-1">
                                        Preparation Steps:
                                      </span>
                                      <ol className="list-decimal pl-5 text-sm text-gray-800 mb-2">
                                        {activeRecipe.steps.map(
                                          (step: string, i: number) => (
                                            <li key={i}>{step}</li>
                                          )
                                        )}
                                      </ol>
                                    </div>
                                    <div className="mb-3">
                                      <span className="block text-xs font-semibold text-emerald-700 mb-1">
                                        Nutritional Highlights:
                                      </span>
                                      <span className="block text-xs text-gray-700 mb-1">
                                        {activeRecipe.nutrition}
                                      </span>
                                    </div>
                                    <div className="mb-3">
                                      <span className="block text-xs font-semibold text-emerald-700 mb-1">
                                        Contraindications:
                                      </span>
                                      <span className="block text-xs text-red-600 mb-1">
                                        {activeRecipe.contraindications}
                                      </span>
                                    </div>
                                    <div className="mb-3">
                                      <span className="block text-xs font-semibold text-emerald-700 mb-1">
                                        Wellness Tips:
                                      </span>
                                      <span className="block text-xs text-gray-700 mb-1">
                                        {activeRecipe.wellnessTips}
                                      </span>
                                    </div>
                                    {/* Ask a question about this recipe */}
                                    <div className="mt-4 border-t pt-3">
                                      <label className="block text-xs font-semibold text-emerald-700 mb-1">
                                        Ask a question about this recipe:
                                      </label>
                                      <textarea
                                        className="w-full border border-gray-200 rounded-lg p-2 mb-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                        rows={2}
                                        placeholder="Type your question..."
                                        value={recipeQuestion}
                                        onChange={(e) =>
                                          setRecipeQuestion(e.target.value)
                                        }
                                      />
                                      <div className="flex justify-end">
                                        <button
                                          className="px-3 py-1 bg-emerald-500 text-white rounded-md text-xs font-medium hover:bg-emerald-600"
                                          disabled={!recipeQuestion.trim()}
                                          onClick={() => {
                                            setRecipeAlertContent(
                                              "Your question has been sent to our healthcare team. You will receive a reply soon."
                                            );
                                            setShowRecipeAlert(true);
                                            setRecipeQuestion("");
                                          }}
                                        >
                                          Ask
                                        </button>
                                      </div>
                                    </div>
                                  </ModalPopup>
                                )}

                                {/* Recipe Ask Alert Modal */}
                                {showRecipeAlert && (
                                  <ModalPopup
                                    title="Question Sent"
                                    onClose={() => setShowRecipeAlert(false)}
                                  >
                                    <div className="text-gray-700 text-base mb-4">
                                      {recipeAlertContent}
                                    </div>
                                    <div className="flex justify-end">
                                      <button
                                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                                        onClick={() =>
                                          setShowRecipeAlert(false)
                                        }
                                      >
                                        OK
                                      </button>
                                    </div>
                                  </ModalPopup>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assigned Practitioner Card */}
        <PractitionerCard
          onAsk={() => setShowAskModal(true)}
          onRequest={() => {
            setAlertContent({
              title: "Appointment Requested!",
              message: `Your appointment request has been sent to ${assignedPractitioner.name}. You will be notified once it is confirmed.`,
            });
            setShowAlert(true);
          }}
        />

        {/* Ask a Question Modal */}
        {showAskModal && (
          <ModalPopup
            title={`Ask a Question to ${assignedPractitioner.name}`}
            onClose={() => setShowAskModal(false)}
          >
            <textarea
              className="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-gray-900"
              rows={4}
              placeholder="Type your message..."
              value={askMessage}
              onChange={(e) => setAskMessage(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                onClick={() => setShowAskModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                onClick={() => {
                  setShowAskModal(false);
                  setAskMessage("");
                  setAlertContent({
                    title: "Message Sent!",
                    message: `Your message has been sent to ${assignedPractitioner.name}. You will receive a reply soon.`,
                  });
                  setShowAlert(true);
                }}
                disabled={!askMessage.trim()}
              >
                Send
              </button>
            </div>
          </ModalPopup>
        )}

        {/* Custom Alert Modal */}
        {showAlert && alertContent && (
          <ModalPopup
            title={alertContent.title}
            onClose={() => setShowAlert(false)}
          >
            <div className="text-gray-700 text-base mb-4">
              {alertContent.message}
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                onClick={() => setShowAlert(false)}
              >
                OK
              </button>
            </div>
          </ModalPopup>
        )}

        {/* Meal Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-emerald-600" />
              Recent Meal Timeline
            </h2>
            <div className="flex space-x-2">
              {["all", "breakfast", "lunch", "dinner"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedMealFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedMealFilter === filter
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {mealLogs
              .filter((meal) => {
                if (selectedMealFilter === "all") return true;
                return meal.meal.toLowerCase() === selectedMealFilter;
              })
              .map((meal, idx, arr) => (
                <MealCard
                  key={idx}
                  meal={meal}
                  isLast={idx === arr.length - 1}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
