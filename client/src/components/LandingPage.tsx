import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, User, Building2, Leaf, Heart, Brain, BarChart3, Flower2, Sun, Moon } from "lucide-react";

interface LandingPageProps {
  onNavigate: (view: string, userType?: 'patient' | 'doctor' | 'admin') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const handleRoleSelect = (role: string) => {
    console.log(`${role} login selected`);
    if (role === 'patient') {
      onNavigate('login', 'patient');
    } else if (role === 'doctor') {
      onNavigate('login', 'doctor');
    } else if (role === 'admin') {
      onNavigate('login', 'admin');
    } else if (role === 'patient-register') {
      onNavigate('patient-register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-green-100/50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Flower2 className="h-32 w-32 text-primary rotate-12" />
      </div>
      <div className="absolute top-20 right-16 opacity-10">
        <Sun className="h-24 w-24 text-primary/60" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-10">
        <Leaf className="h-28 w-28 text-primary/80 -rotate-45" />
      </div>
      <div className="absolute bottom-32 right-12 opacity-10">
        <Moon className="h-20 w-20 text-primary/40" />
      </div>
      
      {/* Sacred Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #2d7d32 2px, transparent 2px), radial-gradient(circle at 75% 75%, #2d7d32 2px, transparent 2px)`,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6 relative">
            {/* Sacred Om symbol representation */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-2 border-primary/30 rounded-full"></div>
            <div className="bg-gradient-to-br from-primary to-green-600 p-4 rounded-full shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary/20 rounded-full"></div>
            <h1 className="text-5xl font-bold font-serif text-foreground ml-6 bg-gradient-to-r from-primary to-green-700 bg-clip-text text-transparent">
              त्रिवेदा
            </h1>
          </div>
          <div className="text-2xl font-semibold text-primary/80 mb-4">Triveda</div>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            🌿 Professional Ayurvedic Diet Management Platform bridging ancient Vedic wisdom with modern nutrition science for holistic personalized healthcare 🌿
          </p>
          <div className="flex items-center justify-center space-x-6 mb-8">
            <Badge variant="secondary" className="bg-primary/10 text-primary px-4 py-2">
              🏛️ Ministry of Ayush Approved
            </Badge>
            <Badge variant="outline" className="border-primary text-primary px-4 py-2">
              🌱 Vedic Principles Based
            </Badge>
            <Badge variant="outline" className="border-primary text-primary px-4 py-2">
              🔬 Modern Science Backed
            </Badge>
          </div>
        </div>

        {/* Features Grid with Ayurvedic Elements */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover-elevate bg-gradient-to-br from-white to-green-50/50 border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-green-600 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <Flower2 className="absolute -top-2 -right-2 h-6 w-6 text-primary/30" />
              </div>
              <CardTitle className="text-primary">Constitutional Assessment</CardTitle>
              <CardDescription className="text-base">
                🧬 Digital Prakriti analysis with <span className="font-semibold text-primary">Vata, Pitta, Kapha</span> evaluation for personalized Ayurvedic treatment plans
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover-elevate bg-gradient-to-br from-white to-green-50/50 border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-green-600 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <Sun className="absolute -top-2 -left-2 h-6 w-6 text-orange-400/50" />
              </div>
              <CardTitle className="text-primary">Vedic Diet Planning</CardTitle>
              <CardDescription className="text-base">
                🌱 AI-powered meal recommendations based on sacred <span className="font-semibold text-primary">Rasa, Virya, Vipaka</span> principles and seasonal wisdom
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover-elevate bg-gradient-to-br from-white to-green-50/50 border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-green-600 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <Moon className="absolute -bottom-2 -right-2 h-6 w-6 text-blue-400/40" />
              </div>
              <CardTitle className="text-primary">Holistic Monitoring</CardTitle>
              <CardDescription className="text-base">
                📊 Comprehensive wellness tracking with compliance monitoring and <span className="font-semibold text-primary">mind-body</span> outcome analysis
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Role Selection with Sacred Elements */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Begin Your Healing Journey</h2>
            <p className="text-muted-foreground">🌸 Choose your path to Ayurvedic wellness 🌸</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Patient Login */}
            <Card className="hover-elevate bg-gradient-to-br from-white to-green-50/30 border-primary/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-20">
                <Flower2 className="h-8 w-8 text-primary rotate-45" />
              </div>
              <CardHeader className="text-center relative z-10">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-primary text-xl">🧘‍♀️ Patient Portal</CardTitle>
                <CardDescription className="text-base">
                  View personalized Ayurvedic diet charts, log sacred meals, and track your holistic wellness journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  data-testid="button-patient-login"
                  onClick={() => handleRoleSelect('patient')}
                >
                  Login as Patient
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  data-testid="button-patient-register"
                  onClick={() => handleRoleSelect('patient-register')}
                >
                  Register New Patient
                </Button>
              </CardContent>
            </Card>

            {/* Doctor Login */}
            <Card className="hover-elevate bg-gradient-to-br from-white to-green-50/30 border-primary/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 left-4 opacity-20">
                <Sun className="h-8 w-8 text-orange-400" />
              </div>
              <CardHeader className="text-center relative z-10">
                <div className="bg-gradient-to-br from-primary to-green-600 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <Stethoscope className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-primary text-xl">🩺 Vaidya Dashboard</CardTitle>
                <CardDescription className="text-base">
                  Manage patients with ancient wisdom, create personalized diet plans, and monitor holistic healing outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  size="lg"
                  data-testid="button-doctor-login"
                  onClick={() => handleRoleSelect('doctor')}
                >
                  Doctor Login
                </Button>
              </CardContent>
            </Card>

            {/* Admin Login */}
            <Card className="hover-elevate bg-gradient-to-br from-white to-green-50/30 border-primary/30 shadow-xl relative overflow-hidden">
              <div className="absolute bottom-4 right-4 opacity-20">
                <Leaf className="h-8 w-8 text-primary -rotate-12" />
              </div>
              <CardHeader className="text-center relative z-10">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-primary text-xl">🏛️ Admin Panel</CardTitle>
                <CardDescription className="text-base">
                  Sacred clinic management, practitioner administration, and healing analytics dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  size="lg"
                  data-testid="button-admin-login"
                  onClick={() => handleRoleSelect('admin')}
                >
                  Admin Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sacred Footer */}
        <div className="text-center mt-16 relative">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Flower2 className="h-6 w-6 text-primary/60" />
            <div className="w-16 h-px bg-primary/30"></div>
            <Leaf className="h-8 w-8 text-primary" />
            <div className="w-16 h-px bg-primary/30"></div>
            <Flower2 className="h-6 w-6 text-primary/60" />
          </div>
          <p className="text-primary font-semibold mb-2">© 2024 त्रिवेदा (Triveda)</p>
          <p className="text-sm text-muted-foreground mb-2">
            🌱 Integrating sacred Ayurvedic wisdom with modern healthcare technology 🌱
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-primary/70">
            <span>🛡️ HIPAA Compliant</span>
            <span>•</span>
            <span>🏥 NDHM Ready</span>
            <span>•</span>
            <span>🏛️ Government Approved</span>
          </div>
          <div className="mt-4 text-xs text-primary/50 font-serif italic">
            "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः" - May all beings be healthy and happy
          </div>
        </div>
      </div>
    </div>
  );
}