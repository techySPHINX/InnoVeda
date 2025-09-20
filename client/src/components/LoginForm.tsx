import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Leaf,
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Stethoscope,
  Shield,
  Flower2,
  Sparkles,
  Heart,
} from "lucide-react";

interface LoginFormProps {
  userType: "patient" | "doctor" | "admin";
}

export default function LoginForm({ userType = "patient" }: LoginFormProps) {
  const [formData, setFormData] = useState({
    abhaId: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigation logic
      if (userType === "patient") {
        setLocation("/patient/dashboard");
      } else if (userType === "doctor") {
        setLocation("/doctor/dashboard");
      } else if (userType === "admin") {
        setLocation("/admin/dashboard");
      }
    }, 1500);
  };

  const getRoleDetails = () => {
    switch (userType) {
      case "patient":
        return {
          title: "Patient Portal",
          subtitle: "Your Wellness Journey Awaits",
          description:
            "Access personalized Ayurvedic diet charts and holistic health insights",
          icon: User,
          gradient: "from-emerald-400 via-teal-500 to-cyan-600",
          accent: "emerald",
          demoCredentials: {
            email: "patient@trivedacare.com",
            password: "patient123",
          },
        };
      case "doctor":
        return {
          title: "Doctor Dashboard",
          subtitle: "Heal with Ancient Wisdom",
          description:
            "Create personalized Ayurvedic treatments and manage patient wellness",
          icon: Stethoscope,
          gradient: "from-blue-400 via-indigo-500 to-purple-600",
          accent: "blue",
          demoCredentials: {
            email: "doctor@trivedacare.com",
            password: "doctor123",
          },
        };
      case "admin":
        return {
          title: "Admin Portal",
          subtitle: "Manage Holistic Care",
          description: "Oversee clinic operations and system administration",
          icon: Shield,
          gradient: "from-orange-400 via-red-500 to-pink-600",
          accent: "orange",
          demoCredentials: {
            email: "admin@trivedacare.com",
            password: "admin123",
          },
        };
      default:
        return {
          title: "Login Portal",
          subtitle: "Welcome Back",
          description: "Please sign in to continue your journey",
          icon: User,
          gradient: "from-emerald-400 via-teal-500 to-cyan-600",
          accent: "emerald",
          demoCredentials: { email: "", password: "" },
        };
    }
  };

  const roleDetails = getRoleDetails();
  const RoleIcon = roleDetails.icon;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${roleDetails.gradient} opacity-10 animate-pulse`}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-emerald-200/20 animate-bounce">
          <Flower2 size={40} />
        </div>
        <div className="absolute top-40 right-20 text-teal-300/20 animate-pulse">
          <Sparkles size={32} />
        </div>
        <div
          className="absolute bottom-32 left-20 text-cyan-200/20 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <Heart size={36} />
        </div>
        <div
          className="absolute bottom-20 right-10 text-emerald-300/20 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          <Leaf size={44} />
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <Card className="w-full max-w-2xl backdrop-blur-sm bg-white/95 shadow-2xl border border-white/20 overflow-hidden">
          {/* Header with Gradient */}
          <div
            className={`bg-gradient-to-r ${roleDetails.gradient} p-6 text-white relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-3">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <h1 className="text-2xl font-bold tracking-wide">
                    TrivedaCare
                  </h1>
                  <p className="text-xs text-white/80 font-medium">
                    Ayurvedic Wellness Platform
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white/15 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <RoleIcon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-1">
                  {roleDetails.title}
                </h2>
                <p className="text-sm text-white/90 font-medium">
                  {roleDetails.subtitle}
                </p>
                <p className="text-xs text-white/70 mt-2">
                  {roleDetails.description}
                </p>
              </div>
            </div>

            {/* Decorative wave */}
            <div className="absolute bottom-0 left-0 right-0 h-4">
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                  fill="white"
                  opacity="0.1"
                />
              </svg>
            </div>
          </div>

          <CardContent className="p-6 space-y-5">
            {/* Demo Credentials */}
            <div
              className={`bg-gradient-to-r from-${roleDetails.accent}-50 to-${roleDetails.accent}-100 p-4 rounded-xl border border-${roleDetails.accent}-200/50`}
            >
              <div className="flex items-center mb-2">
                <Sparkles
                  className={`h-4 w-4 text-${roleDetails.accent}-600 mr-2`}
                />
                <p
                  className={`font-semibold text-${roleDetails.accent}-800 text-sm`}
                >
                  Demo Credentials
                </p>
              </div>
              <div className="space-y-1 text-sm">
                {userType === "patient" ? (
                  <>
                    <p className={`text-${roleDetails.accent}-700 font-medium`}>
                      Demo ABHA IDs:
                    </p>
                    <ul
                      className={`text-${roleDetails.accent}-700 ml-4 list-disc`}
                    >
                      <li>1234-5678-9012</li>
                      <li>2345-6789-0123</li>
                      <li>3456-7890-1234</li>
                      <li>4567-8901-2345</li>
                      <li>5678-9012-3456</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p className={`text-${roleDetails.accent}-700`}>
                      <span className="font-medium">Email:</span>{" "}
                      {roleDetails.demoCredentials.email}
                    </p>
                    <p className={`text-${roleDetails.accent}-700`}>
                      <span className="font-medium">Password:</span>{" "}
                      {roleDetails.demoCredentials.password}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {userType === "patient" ? (
                <div>
                  <Label
                    htmlFor="abha-id"
                    className="text-gray-700 font-bold text-base"
                  >
                    ABHA ID
                  </Label>
                  <Input
                    id="abha-id"
                    type="text"
                    value={formData.abhaId}
                    onChange={(e) =>
                      handleInputChange("abhaId", e.target.value)
                    }
                    placeholder="Enter your ABHA ID"
                    className="mt-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg h-12"
                    data-testid="input-abha-id"
                    required
                  />
                </div>
              ) : (
                <>
                  <div>
                    <Label
                      htmlFor={`email-${userType}`}
                      className="text-gray-700 font-bold text-base"
                    >
                      Email Address
                    </Label>
                    <Input
                      id={`email-${userType}`}
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email"
                      className="mt-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg h-12"
                      data-testid="input-email"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`password-${userType}`}
                      className="text-gray-700 font-bold text-base"
                    >
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id={`password-${userType}`}
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        placeholder="Enter your password"
                        className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg h-12 pr-12"
                        data-testid="input-password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          handleInputChange("rememberMe", checked as boolean)
                        }
                        data-testid="checkbox-remember"
                        className="border-gray-300"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-gray-700 font-bold"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-sm text-emerald-600 hover:text-emerald-700 p-0 h-auto"
                    >
                      Forgot password?
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleLogin}
                disabled={
                  isLoading ||
                  (userType === "patient"
                    ? !formData.abhaId
                    : !formData.email || !formData.password)
                }
                className={`w-full h-12 bg-gradient-to-r ${roleDetails.gradient} hover:opacity-90 transition-all duration-300 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]`}
                data-testid="button-login"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Signing in...
                  </div>
                ) : userType === "patient" ? (
                  "Sign in with ABHA ID"
                ) : (
                  `Sign in as ${
                    userType.charAt(0).toUpperCase() + userType.slice(1)
                  }`
                )}
              </Button>

              {/* Registration Buttons */}
              {userType === "patient" && (
                <Button
                  variant="outline"
                  className="w-full h-11 border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium"
                  data-testid="button-patient-register"
                >
                  <User className="h-4 w-4 mr-2" />
                  Register New Patient
                </Button>
              )}
              {userType === "doctor" && (
                <Button
                  variant="outline"
                  className="w-full h-11 border-blue-300 text-blue-700 hover:bg-blue-50 rounded-lg font-medium"
                  data-testid="button-doctor-register"
                  onClick={() => setLocation("/doctor/register")}
                >
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Register New Doctor
                </Button>
              )}
              {userType === "admin" && (
                <Button
                  variant="outline"
                  className="w-full h-11 border-orange-300 text-orange-700 hover:bg-orange-50 rounded-lg font-medium"
                  data-testid="button-admin-register"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Register New Hospital
                </Button>
              )}
            </div>

            {/* Back Button */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg font-medium"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
