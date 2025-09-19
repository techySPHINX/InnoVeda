import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  User,
  Building2,
  Leaf,
  Heart,
  Brain,
  BarChart3,
  Flower2,
  Sun,
  Moon,
  Shield,
  Award,
  Sparkles,
  Globe,
  CheckCircle,
  Star,
  Zap,
  Activity,
} from "lucide-react";

import { LoginSwiper } from "./ui/LoginSwiper";
import { loginRoleImages } from "./ui/loginRoleImages";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import i18n from "../i18n";
import LanguageSwitcher from "./ui/LanguageSwitcher";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/20">
      {/* Enhanced Dynamic Background with Glassmorphism */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-400/8 to-teal-300/10"></div>

        {/* Animated mesh gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${
              mousePosition.y * 0.1
            }%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)`,
          }}
        ></div>

        {/* Sacred geometric patterns */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              radial-gradient(circle at 20% 50%, #059669 2px, transparent 2px),
              radial-gradient(circle at 80% 50%, #0d9488 2px, transparent 2px),
              radial-gradient(circle at 50% 20%, #10b981 1px, transparent 1px),
              radial-gradient(circle at 50% 80%, #14b8a6 1px, transparent 1px)
            `,
              backgroundSize:
                "120px 120px, 100px 100px, 80px 80px, 140px 140px",
            }}
          ></div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="w-1 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-40"></div>
            </div>
          ))}
        </div>
      </div>
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 opacity-8 transform rotate-12 animate-pulse">
          <div className="p-6 bg-gradient-to-br from-green-100/20 to-emerald-200/20 backdrop-blur-sm rounded-2xl border border-green-200/20">
            <Flower2 className="h-20 w-20 text-green-600/30" />
          </div>
        </div>

        <div className="absolute top-32 right-20 opacity-8 transform -rotate-12">
          <div
            className="p-4 bg-gradient-to-br from-yellow-100/20 to-orange-200/20 backdrop-blur-sm rounded-full border border-yellow-200/20 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <Sun className="h-16 w-16 text-orange-500/30" />
          </div>
        </div>

        <div className="absolute bottom-24 left-24 opacity-8 transform rotate-45">
          <div
            className="p-5 bg-gradient-to-br from-emerald-100/20 to-green-200/20 backdrop-blur-sm rounded-xl border border-emerald-200/20 animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            <Leaf className="h-18 w-18 text-emerald-600/30" />
          </div>
        </div>

        <div className="absolute bottom-40 right-16 opacity-8 transform -rotate-45">
          <div
            className="p-3 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 backdrop-blur-sm rounded-full border border-blue-200/20 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            <Moon className="h-14 w-14 text-blue-500/30" />
          </div>
        </div>

        {/* Additional sacred symbols */}
        <div className="absolute top-1/2 left-8 opacity-5">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
            <Activity className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="absolute top-1/3 right-8 opacity-5">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
            <Sparkles className="h-10 w-10 text-purple-600" />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Enhanced Hero Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Brand Identity */}
          <div className="flex items-center justify-center mb-8 relative">
            {/* Sacred geometric frame */}
            <div
              className="absolute -top-6 -left-6 w-12 h-12 border-3 border-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-40 animate-spin"
              style={{ animationDuration: "8s" }}
            ></div>
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full opacity-60"></div>

            {/* Main logo container */}
            <div className="relative bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-green-600 to-emerald-700 p-4 rounded-2xl shadow-lg">
                <Leaf className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-br from-green-300/60 to-emerald-400/60 rounded-full opacity-80"></div>
            <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full"></div>

            {/* Brand name */}
            <div className="ml-8">
              <h1 className="text-6xl font-bold font-serif bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent drop-shadow-sm mb-2">
                त्रिवेदा
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto"></div>
            </div>
          </div>

          {/* Main title with enhanced typography */}
          <div className="mb-6">
            <h2 className="text-7xl font-black bg-gradient-to-r from-green-800 via-emerald-700 to-green-900 bg-clip-text text-transparent mb-2 tracking-tight">
              TrivedaCare
            </h2>
            <div className="flex justify-center">
              <div className="h-2 w-32 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Enhanced tagline */}
          <div className="max-w-5xl mx-auto mb-10">
            <p className="text-xl text-slate-700 leading-relaxed mb-4 font-medium">
              <span className="inline-flex items-center mx-2">
                <Sparkles className="h-5 w-5 text-green-600 mr-2" />
                Professional Ayurvedic Diet Management Platform
                <Sparkles className="h-5 w-5 text-green-600 ml-2" />
              </span>
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Bridging ancient Vedic wisdom with modern nutrition science for
              holistic personalized healthcare
            </p>
          </div>

          {/* Premium certification badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 text-sm font-semibold shadow-lg border-0 transition-all duration-300 hover:scale-105">
              <Building2 className="h-4 w-4 mr-2" />
              Ministry of Ayush Approved
            </Badge>
            <Badge
              variant="outline"
              className="border-2 border-green-500 text-green-700 hover:bg-green-50 px-6 py-3 text-sm font-semibold bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Leaf className="h-4 w-4 mr-2" />
              Vedic Principles Based
            </Badge>
            <Badge
              variant="outline"
              className="border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-6 py-3 text-sm font-semibold bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Brain className="h-4 w-4 mr-2" />
              Modern Science Backed
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 text-sm font-semibold shadow-lg border-0 transition-all duration-300 hover:scale-105">
              <Shield className="h-4 w-4 mr-2" />
              HIPAA Compliant
            </Badge>
          </div>

          {/* Trust indicators */}
          <div className="flex justify-center items-center space-x-8 text-sm text-slate-600 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 text-green-600 mr-1" />
              <span className="font-semibold">50,000+ Users</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center">
              <Award className="h-4 w-4 text-purple-600 mr-1" />
              <span className="font-semibold">Award Winning</span>
            </div>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Constitutional Assessment Card */}
          <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white/95 to-pink-50/90 backdrop-blur-lg">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-fuchsia-500/15 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-bl-[100px]"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-fuchsia-500 rounded-full opacity-60"></div>

            <CardHeader className="relative z-10 text-center pt-8 pb-6">
              {/* Enhanced icon container */}
              <div className="relative mx-auto mb-6 w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-fuchsia-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="relative bg-gradient-to-br from-white via-pink-50 to-fuchsia-50 rounded-2xl p-4 shadow-lg border border-pink-100 flex items-center justify-center">
                  <Heart className="h-10 w-10 text-pink-600 drop-shadow-sm" />
                </div>
                {/* Floating particles */}
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full opacity-60 animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-fuchsia-400 rounded-full opacity-60 animate-bounce"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              <CardTitle className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-pink-700 transition-colors duration-300">
                Constitutional Assessment
              </CardTitle>

              <CardDescription className="text-base text-slate-600 leading-relaxed">
                <div className="flex items-center justify-center mb-3">
                  <Zap className="h-4 w-4 text-pink-500 mr-2" />
                  <span className="font-semibold text-pink-700">
                    Digital Prakriti Analysis
                  </span>
                </div>
                Comprehensive evaluation of your unique constitution through
                advanced
                <span className="font-semibold text-fuchsia-600 mx-1">
                  Vata, Pitta, Kapha
                </span>
                assessment for personalized Ayurvedic treatment plans
              </CardDescription>
            </CardHeader>

            {/* Feature highlights */}
            <CardContent className="relative z-10 pt-0 pb-6">
              <div className="space-y-2">
                {[
                  "AI-Powered Analysis",
                  "Personalized Reports",
                  "24/7 Monitoring",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-slate-600"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vedic Diet Planning Card */}
          <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white/95 to-yellow-50/90 backdrop-blur-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/15 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-br-[100px]"></div>
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60"></div>

            <CardHeader className="relative z-10 text-center pt-8 pb-6">
              <div className="relative mx-auto mb-6 w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="relative bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-2xl p-4 shadow-lg border border-yellow-100 flex items-center justify-center">
                  <Brain className="h-10 w-10 text-orange-600 drop-shadow-sm" />
                </div>
                <div
                  className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-bounce"
                  style={{ animationDelay: "0.8s" }}
                ></div>
              </div>

              <CardTitle className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                Vedic Diet Planning
              </CardTitle>

              <CardDescription className="text-base text-slate-600 leading-relaxed">
                <div className="flex items-center justify-center mb-3">
                  <Sparkles className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="font-semibold text-orange-700">
                    AI-Powered Recommendations
                  </span>
                </div>
                Intelligent meal planning based on ancient
                <span className="font-semibold text-green-600 mx-1">
                  Rasa, Virya, Vipaka
                </span>
                principles combined with seasonal wisdom and modern nutrition
                science
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 pt-0 pb-6">
              <div className="space-y-2">
                {[
                  "Seasonal Adaptation",
                  "Cultural Integration",
                  "Smart Notifications",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-slate-600"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Holistic Monitoring Card */}
          <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white/95 to-blue-50/90 backdrop-blur-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/15 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-200/30 to-transparent rounded-tl-[100px]"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-60"></div>

            <CardHeader className="relative z-10 text-center pt-8 pb-6">
              <div className="relative mx-auto mb-6 w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="relative bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-2xl p-4 shadow-lg border border-blue-100 flex items-center justify-center">
                  <BarChart3 className="h-10 w-10 text-blue-600 drop-shadow-sm" />
                </div>
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-bounce"
                  style={{ animationDelay: "0.7s" }}
                ></div>
                <div
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>

              <CardTitle className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                Holistic Monitoring
              </CardTitle>

              <CardDescription className="text-base text-slate-600 leading-relaxed">
                <div className="flex items-center justify-center mb-3">
                  <Activity className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="font-semibold text-blue-700">
                    Comprehensive Tracking
                  </span>
                </div>
                Advanced wellness monitoring with real-time compliance tracking
                and
                <span className="font-semibold text-purple-600 mx-1">
                  mind-body
                </span>
                outcome analysis for complete health optimization
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 pt-0 pb-6">
              <div className="space-y-2">
                {[
                  "Real-time Analytics",
                  "Progress Insights",
                  "Health Predictions",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-slate-600"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Role Selection Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full"></div>
              <Flower2 className="h-8 w-8 text-green-600 mx-4" />
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full"></div>
            </div>

            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
              Begin Your Healing Journey
            </h2>
            <p className="text-xl text-slate-600 mb-2">
              Choose your path to Ayurvedic wellness
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-slate-500 leading-relaxed">
                Experience personalized healthcare that honors ancient wisdom
                while embracing modern innovation
              </p>
            </div>
          </div>

          {/* Enhanced LoginSwiper Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 via-transparent to-emerald-100/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <LoginSwiper
                roles={[
                  { userType: "patient", image: loginRoleImages.patient },
                  { userType: "doctor", image: loginRoleImages.doctor },
                  { userType: "admin", image: loginRoleImages.admin },
                ]}
                onNavigate={(view, userType) => {
                  if (view === "login" && userType)
                    navigate(`/login/${userType}`);
                  else if (view === "patient-register")
                    navigate("/patient/register");
                  else if (view === "doctor-register")
                    navigate("/doctor/register");
                  else if (view === "admin-register")
                    navigate("/admin/register");
                }}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Sacred Footer */}
        <footer className="text-center relative">
          <div className="max-w-4xl mx-auto">
            {/* Decorative divider */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <Flower2 className="h-6 w-6 text-green-500/60 animate-pulse" />
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              <div className="p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full border border-green-200/30">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              <Flower2
                className="h-6 w-6 text-green-500/60 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Company info */}
            <div className="mb-6">
              <p className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-3">
                © 2025 त्रिवेदाकेयर (TrivedaCare)
              </p>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                Integrating sacred Ayurvedic wisdom with modern healthcare
                technology
              </p>
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-6">
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200/30">
                <Shield className="h-4 w-4 text-green-600 mr-2" />
                <span className="font-semibold text-green-700">
                  HIPAA Compliant
                </span>
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/30">
                <Building2 className="h-4 w-4 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-700">NDHM Ready</span>
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200/30">
                <Award className="h-4 w-4 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-700">
                  Government Approved
                </span>
              </div>
            </div>

            {/* Sanskrit blessing */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/30 to-transparent rounded-xl"></div>
              <div className="relative bg-white/40 backdrop-blur-sm p-6 rounded-xl border border-green-200/20">
                <p className="text-base text-green-800 font-serif italic leading-relaxed">
                  "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"
                </p>
                <p className="text-sm text-green-600 mt-2 font-medium">
                  May all beings be healthy and happy
                </p>
              </div>
            </div>

            {/* Additional trust elements */}
            <div className="mt-8 pt-6 border-t border-green-200/30">
              <div className="flex items-center justify-center space-x-8 text-xs text-slate-500">
                <span>🔒 SSL Secured</span>
                <span>•</span>
                <span>🌍 Global Standards</span>
                <span>•</span>
                <span>⚡ 99.9% Uptime</span>
                <span>•</span>
                <span>📱 Multi-Platform</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
