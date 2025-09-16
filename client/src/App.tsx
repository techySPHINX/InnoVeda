import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Import components
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import PatientRegistration from "./components/PatientRegistration";
import PrakritiAssessment from "./components/PrakritiAssessment";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import DietChartCreation from "./components/DietChartCreation";
import AdminDashboard from "./components/AdminDashboard";

function Router() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');

  // Navigation handler with proper flow
  const handleNavigation = (view: string, type?: 'patient' | 'doctor' | 'admin') => {
    console.log('Navigation:', view, type);
    setCurrentView(view);
    if (type) setUserType(type);
  };

  // Render components based on current view with proper navigation props
  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigation} />;
      
      case 'login':
        return (
          <LoginForm 
            userType={userType} 
            onBack={() => handleNavigation('landing')}
            onNavigate={handleNavigation}
          />
        );
      
      case 'patient-register':
        return <PatientRegistration onNavigate={handleNavigation} />;
      
      case 'prakriti-assessment':
        return <PrakritiAssessment onNavigate={handleNavigation} />;
      
      case 'patient-dashboard':
        return <PatientDashboard />;
      
      case 'doctor-dashboard':
        return <DoctorDashboard onNavigate={handleNavigation} />;
      
      case 'diet-chart-creation':
        return <DietChartCreation />;
      
      case 'admin-dashboard':
        return <AdminDashboard />;
      
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <Switch>
      <Route path="/">
        {renderCurrentView()}
      </Route>
      <Route path="/landing">
        <LandingPage />
      </Route>
      <Route path="/patient/register">
        <PatientRegistration />
      </Route>
      <Route path="/patient/assessment">
        <PrakritiAssessment />
      </Route>
      <Route path="/patient/dashboard">
        <PatientDashboard />
      </Route>
      <Route path="/doctor/login">
        <LoginForm userType="doctor" />
      </Route>
      <Route path="/doctor/dashboard">
        <DoctorDashboard />
      </Route>
      <Route path="/doctor/diet-chart">
        <DietChartCreation />
      </Route>
      <Route path="/admin/login">
        <LoginForm userType="admin" />
      </Route>
      <Route path="/admin/dashboard">
        <AdminDashboard />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;