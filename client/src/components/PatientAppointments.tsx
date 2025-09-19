import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Upload,
  Edit3,
  Trash2,
  Check,
  Stethoscope,
  Heart,
  Activity,
  Users,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronDown,
  Filter,
  Search,
  X,
} from "lucide-react";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  group: string;
  avatar: string;
  rating: number;
  experience: number;
  nextAvailable: string;
};

function PatientAppointments() {
  const specialties = [
    "Kayachikitsa (Internal Medicine)",
    "Panchakarma Therapy",
    "Shalya Tantra (Surgery)",
    "Shalakya Tantra (ENT & Ophthalmology)",
    "Kaumarbhritya (Pediatrics)",
    "Agada Tantra (Toxicology)",
    "Rasayana (Rejuvenation)",
    "Vajikarana (Aphrodisiac Therapy)",
    "Dravyaguna (Ayurvedic Pharmacology)",
    "Bhaishajya Kalpana (Pharmacy)",
    "Swasthavritta (Preventive Medicine)",
    "Roga Nidana (Diagnostics)",
    "Manas Roga (Psychiatry)",
    "Ayurvedic Nutrition",
    "Ayurvedic Dermatology",
    "Ayurvedic Oncology",
    "Ayurvedic Cardiology",
    "Ayurvedic Neurology",
    "Ayurvedic Orthopedics",
    "Ayurvedic Gynecology",
    "Ayurvedic Urology",
    "Ayurvedic Pulmonology",
    "Ayurvedic Endocrinology",
    "Ayurvedic Rheumatology",
    "Ayurvedic Immunology",
    "Ayurvedic Geriatrics",
    "Ayurvedic Dentistry",
    "Ayurvedic ENT",
    "Ayurvedic Ophthalmology",
    "Ayurvedic Sports Medicine",
    "Ayurvedic Pain Management",
    "Ayurvedic Sleep Disorders",
    "Ayurvedic Addiction Therapy",
    "Ayurvedic Allergy Therapy",
    "Ayurvedic Digestive Disorders",
    "Ayurvedic Liver Disorders",
    "Ayurvedic Kidney Disorders",
    "Ayurvedic Skin Disorders",
    "Ayurvedic Hair & Scalp Care",
    "Ayurvedic Weight Management",
    "Ayurvedic Stress Management",
    "Ayurvedic Women's Health",
    "Ayurvedic Men's Health",
    "Ayurvedic Child Health",
    "Ayurvedic Infertility",
    "Ayurvedic Panchakarma Detox",
    "Ayurvedic Marma Therapy",
    "Ayurvedic Yoga Therapy",
    "Ayurvedic Lifestyle Disorders",
    "Ayurvedic Wellness & Spa",
  ];

  const groups = ["A", "B", "C", "D"];
  const surnames = [
    "Sharma",
    "Patel",
    "Singh",
    "Verma",
    "Kumar",
    "Rao",
    "Gupta",
    "Mehta",
    "Joshi",
    "Nair",
    "Das",
    "Reddy",
    "Chopra",
    "Sethi",
    "Bose",
    "Menon",
    "Jain",
    "Kapoor",
    "Bhatia",
    "Saxena",
    "Mishra",
    "Agarwal",
    "Chatterjee",
    "Banerjee",
    "Ghosh",
    "Roy",
    "Pandey",
    "Tripathi",
    "Yadav",
    "Srivastava",
    "Dubey",
    "Tiwari",
    "Shukla",
    "Pathak",
    "Bhattacharya",
    "Mukherjee",
    "Chakraborty",
    "Dey",
    "Paul",
    "Sen",
    "Sarkar",
    "Basu",
    "Chatterji",
    "Lal",
    "Prasad",
    "Rastogi",
    "Sinha",
    "Jha",
    "Awasthi",
  ];

  const getRandomSpecialty = () =>
    specialties[Math.floor(Math.random() * specialties.length)];
  const mockDoctors: Doctor[] = Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    name: `Dr. ${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(
      97 + (i % 26)
    )} ${surnames[i % surnames.length]}`,
    specialty: getRandomSpecialty(),
    group: groups[i % groups.length],
    avatar: `https://randomuser.me/api/portraits/${
      i % 2 === 0 ? "men" : "women"
    }/${10 + (i % 80)}.jpg`,
    rating: 3.5 + Math.random() * 1.5,
    experience: 5 + Math.floor(Math.random() * 20),
    nextAvailable: new Date(
      Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  }));

  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | "">("");
  const [problem, setProblem] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [preferredDate, setPreferredDate] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter(
      (doc) =>
        (!selectedSpecialty || doc.specialty === selectedSpecialty) &&
        (!selectedGroup || doc.group === selectedGroup) &&
        (!searchQuery ||
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [selectedSpecialty, selectedGroup, searchQuery]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !problem) return;

    setLoading(true);
    setTimeout(() => {
      const selectedDoc = mockDoctors.find((d) => d.id === selectedDoctor);
      setBookings((prev) => [
        ...prev,
        {
          id: Date.now(),
          doctor: selectedDoc,
          problem,
          symptoms,
          additionalInfo,
          urgency,
          preferredDate,
          reports: uploadedFiles,
          date: new Date().toLocaleString(),
          status: "confirmed",
        },
      ]);
      setLoading(false);
      setSuccessMsg("🎉 Appointment booked successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);

      // Reset form
      setSelectedDoctor("");
      setProblem("");
      setSymptoms("");
      setAdditionalInfo("");
      setUrgency("normal");
      setPreferredDate("");
      setUploadedFiles([]);
    }, 1500);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "normal":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Book Your Appointment
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with experienced Ayurvedic practitioners for personalized
            healthcare solutions
          </p>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-green-800 font-medium">{successMsg}</div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-6 h-6" />
                  <span>New Appointment</span>
                </h2>
              </div>

              <form onSubmit={handleBooking} className="p-6 space-y-6">
                {/* Doctor Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <User className="w-5 h-5 text-emerald-600" />
                      <span>Select Doctor</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 px-3 py-1 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          showFilters ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Search and Filters */}
                  {showFilters && (
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                      <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search doctors or specialties..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Specialty
                          </label>
                          <select
                            value={selectedSpecialty}
                            onChange={(e) =>
                              setSelectedSpecialty(e.target.value)
                            }
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          >
                            <option value="">All Specialties</option>
                            {specialties.map((spec) => (
                              <option key={spec} value={spec}>
                                {spec}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Group
                          </label>
                          <select
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          >
                            <option value="">All Groups</option>
                            {groups.map((group) => (
                              <option key={group} value={group}>
                                Group {group}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Doctor Selection Cards */}
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-xl">
                    {filteredDoctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor.id)}
                        className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
                          selectedDoctor === doctor.id
                            ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-l-emerald-500"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={doctor.avatar}
                            alt={doctor.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900 truncate">
                                {doctor.name}
                              </h4>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">
                                  {doctor.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {doctor.specialty}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                Group {doctor.group}
                              </span>
                              <span className="text-xs text-gray-500">
                                {doctor.experience} years exp.
                              </span>
                              <span className="text-xs text-teal-600 font-medium">
                                Next: {doctor.nextAvailable}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span>Appointment Details</span>
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chief Complaint *
                      </label>
                      <input
                        type="text"
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        placeholder="Describe your main health concern"
                        required
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Urgency Level
                      </label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="normal">Normal</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Symptoms
                    </label>
                    <textarea
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder="List your symptoms in detail"
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Any additional medical history, medications, or concerns"
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-emerald-600" />
                    <span>Medical Reports</span>
                  </h3>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      dragActive
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-25"
                    }`}
                  >
                    <Upload
                      className={`w-12 h-12 mx-auto mb-4 ${
                        dragActive ? "text-emerald-500" : "text-gray-400"
                      }`}
                    />
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-700">
                        {dragActive
                          ? "Drop files here"
                          : "Upload Medical Reports"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Drag & drop files here, or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 cursor-pointer transition-colors"
                      >
                        Browse Files
                      </label>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !selectedDoctor || !problem}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      <span>Book Appointment</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - My Appointments */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>My Appointments</span>
                </h2>
              </div>

              <div className="p-6">
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No appointments yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Book your first consultation above
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {bookings.map((booking, idx) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={booking.doctor.avatar}
                            alt={booking.doctor.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate text-sm">
                              {booking.doctor.name}
                            </h4>
                            <p className="text-xs text-gray-600 truncate">
                              {booking.doctor.specialty}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">
                              Problem:
                            </span>
                            <span className="text-gray-600 text-right text-xs max-w-24 truncate">
                              {booking.problem}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">
                              Status:
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(
                                booking.urgency
                              )}`}
                            >
                              {booking.status}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">
                              Date:
                            </span>
                            <span className="text-xs text-gray-600">
                              {new Date(booking.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={() => setEditIdx(idx)}
                            className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteIdx(idx)}
                            className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editIdx !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <h3 className="text-xl font-bold text-white">
                  Edit Appointment
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Problem
                  </label>
                  <input
                    type="text"
                    value={bookings[editIdx]?.problem || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBookings((prev) =>
                        prev.map((b, i) =>
                          i === editIdx ? { ...b, problem: val } : b
                        )
                      );
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Symptoms
                  </label>
                  <textarea
                    value={bookings[editIdx]?.symptoms || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBookings((prev) =>
                        prev.map((b, i) =>
                          i === editIdx ? { ...b, symptoms: val } : b
                        )
                      );
                    }}
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    value={bookings[editIdx]?.additionalInfo || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBookings((prev) =>
                        prev.map((b, i) =>
                          i === editIdx ? { ...b, additionalInfo: val } : b
                        )
                      );
                    }}
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={bookings[editIdx]?.urgency || "normal"}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBookings((prev) =>
                        prev.map((b, i) =>
                          i === editIdx ? { ...b, urgency: val } : b
                        )
                      );
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex space-x-3">
                <button
                  onClick={() => setEditIdx(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setEditIdx(null);
                    setSuccessMsg("✅ Appointment updated successfully!");
                    setTimeout(() => setSuccessMsg(""), 3000);
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteIdx !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Trash2 className="w-6 h-6" />
                  <span>Cancel Appointment</span>
                </h3>
              </div>

              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-gray-700 font-medium mb-2">
                    Are you sure you want to cancel this appointment?
                  </p>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone.
                  </p>
                </div>

                {bookings[deleteIdx] && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={bookings[deleteIdx].doctor.avatar}
                        alt={bookings[deleteIdx].doctor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {bookings[deleteIdx].doctor.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {bookings[deleteIdx].problem}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 flex space-x-3">
                <button
                  onClick={() => setDeleteIdx(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={() => {
                    setBookings((prev) =>
                      prev.filter((_, i) => i !== deleteIdx)
                    );
                    setDeleteIdx(null);
                    setSuccessMsg("🗑️ Appointment cancelled successfully!");
                    setTimeout(() => setSuccessMsg(""), 3000);
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all font-medium"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>24/7 Support: +91-XXXX-XXXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>help@ayurveda.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Multiple Locations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientAppointments;
