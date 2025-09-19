import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Trash2,
  Edit3,
  Save,
  XCircle,
  CheckCircle,
  Shield,
  Heart,
  AlertTriangle,
  Bell,
  Globe,
  Utensils,
  Plus,
  Settings,
  UserCheck,
} from "lucide-react";

// Mock user settings data
const initialSettings = {
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91-9876543210",
  password: "********",
  language: "English",
  notifications: true,
  dietaryPreference: "Vegetarian",
  allergies: ["Peanuts"],
  chronicConditions: ["None"],
};

export default function PatientSettings() {
  const [settings, setSettings] = useState(initialSettings);
  const [editField, setEditField] = useState<string | null>(null);
  const [allergies, setAllergies] = useState(settings.allergies);
  const [chronicConditions, setChronicConditions] = useState(
    settings.chronicConditions
  );
  const [newAllergy, setNewAllergy] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Handlers for editing fields
  const handleEdit = (field: string) => setEditField(field);
  const handleCancel = () => setEditField(null);
  const handleSave = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setEditField(null);
    setSuccessMsg("Changes saved successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  // CRUD for allergies
  const handleAddAllergy = () => {
    if (newAllergy && !allergies.includes(newAllergy)) {
      setAllergies([...allergies, newAllergy]);
      setNewAllergy("");
      setSuccessMsg("Allergy added successfully.");
      setTimeout(() => setSuccessMsg(""), 1500);
    }
  };
  const handleDeleteAllergy = (item: string) => {
    setAllergies(allergies.filter((a) => a !== item));
    setSuccessMsg("Allergy removed successfully.");
    setTimeout(() => setSuccessMsg(""), 1500);
  };

  // CRUD for chronic conditions
  const handleAddCondition = () => {
    if (newCondition && !chronicConditions.includes(newCondition)) {
      setChronicConditions([...chronicConditions, newCondition]);
      setNewCondition("");
      setSuccessMsg("Medical condition added successfully.");
      setTimeout(() => setSuccessMsg(""), 1500);
    }
  };
  const handleDeleteCondition = (item: string) => {
    setChronicConditions(chronicConditions.filter((c) => c !== item));
    setSuccessMsg("Medical condition removed successfully.");
    setTimeout(() => setSuccessMsg(""), 1500);
  };

  // Save all changes
  const handleSaveAll = () => {
    setSettings((prev) => ({
      ...prev,
      allergies,
      chronicConditions,
    }));
    setSuccessMsg("All changes saved successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  type SettingFieldProps = {
    icon: React.ElementType;
    label: string;
    field: string;
    value: any;
    type?: string;
    options?: string[] | null;
  };

  const SettingField: React.FC<SettingFieldProps> = ({
    icon: Icon,
    label,
    field,
    value,
    type = "text",
    options = null,
  }) => (
    <div className="group bg-white/70 backdrop-blur-sm rounded-xl border border-emerald-100/50 p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center group-hover:from-emerald-200 group-hover:to-green-100 transition-colors duration-300">
            <Icon className="w-6 h-6 text-emerald-700" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {label}
            </label>
            {editField === field ? (
              <div className="flex items-center gap-2">
                {options ? (
                  <select
                    className="flex-1 px-4 py-2 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
                    value={value}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="flex-1 px-4 py-2 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
                    type={type}
                    value={value}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                  />
                )}
                <button
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 font-medium"
                  onClick={() => handleSave(field, value)}
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  onClick={handleCancel}
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-medium">
                  {field === "password" ? "••••••••" : value}
                </span>
                <button
                  className="px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200 flex items-center gap-1 font-medium"
                  onClick={() => handleEdit(field)}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100/50 p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Settings
              </h1>
              <p className="text-gray-600">
                Manage your account and medical information
              </p>
            </div>
          </div>

          {/* Success/Error Messages */}
          {successMsg && (
            <div className="mb-6 flex items-center gap-3 text-emerald-800 bg-emerald-50 border border-emerald-200 px-6 py-4 rounded-xl">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="font-medium">{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="mb-6 flex items-center gap-3 text-red-800 bg-red-50 border border-red-200 px-6 py-4 rounded-xl">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Personal Information Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Personal Information
            </h2>
          </div>
          <div className="grid gap-6">
            <SettingField
              icon={User}
              label="Full Name"
              field="name"
              value={settings.name}
            />
            <SettingField
              icon={Mail}
              label="Email Address"
              field="email"
              value={settings.email}
              type="email"
            />
            <SettingField
              icon={Phone}
              label="Phone Number"
              field="phone"
              value={settings.phone}
              type="tel"
            />
            <SettingField
              icon={Lock}
              label="Password"
              field="password"
              value={settings.password}
              type="password"
            />
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
          </div>
          <div className="grid gap-6">
            <SettingField
              icon={Globe}
              label="Language"
              field="language"
              value={settings.language}
              options={["English", "Hindi", "Bengali", "Tamil", "Telugu"]}
            />
            <SettingField
              icon={Utensils}
              label="Dietary Preference"
              field="dietaryPreference"
              value={settings.dietaryPreference}
              options={["Vegetarian", "Vegan", "Non-Vegetarian", "Eggetarian"]}
            />

            {/* Notifications */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-emerald-100/50 p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Email & SMS alerts for appointments
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={() =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: !prev.notifications,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Medical Information
            </h2>
          </div>

          {/* Allergies */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-emerald-100/50 p-6 mb-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-pink-50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Allergies
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your known allergies
                </p>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <input
                className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
                placeholder="Enter new allergy..."
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddAllergy()}
              />
              <button
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 font-medium"
                onClick={handleAddAllergy}
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {allergies.map((allergy) => (
                <div
                  key={allergy}
                  className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-red-100 transition-colors duration-200"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {allergy}
                  <button
                    className="ml-1 text-red-600 hover:text-red-800 transition-colors duration-200"
                    onClick={() => handleDeleteAllergy(allergy)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Chronic Conditions */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-emerald-100/50 p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Medical Conditions
                </h3>
                <p className="text-sm text-gray-500">
                  Track your ongoing medical conditions
                </p>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <input
                className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 bg-white"
                placeholder="Enter medical condition..."
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCondition()}
              />
              <button
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 font-medium"
                onClick={handleAddCondition}
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {chronicConditions.map((condition) => (
                <div
                  key={condition}
                  className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-blue-100 transition-colors duration-200"
                >
                  <Shield className="w-4 h-4" />
                  {condition}
                  <button
                    className="ml-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    onClick={() => handleDeleteCondition(condition)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-emerald-100/50 p-6 shadow-lg">
          <div className="flex justify-center">
            <button
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:from-emerald-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              onClick={handleSaveAll}
            >
              <Save className="w-5 h-5" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
