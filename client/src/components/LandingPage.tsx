import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, User, Building2, Leaf, Heart, Brain, BarChart3 } from "lucide-react";

export default function LandingPage() {
  const handleRoleSelect = (role: string) => {
    console.log(`${role} login selected`);
    // todo: remove mock functionality - navigate to actual login
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold font-serif text-foreground">Triveda</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Professional Ayurvedic Diet Management Platform bridging traditional wisdom with modern nutrition science for personalized healthcare
          </p>
          <Badge variant="secondary" className="mb-8">
            Ministry of Ayush Approved Platform
          </Badge>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover-elevate">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Constitutional Assessment</CardTitle>
              <CardDescription>
                Digital Prakriti analysis with Vata, Pitta, Kapha evaluation for personalized treatment
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover-elevate">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Smart Diet Planning</CardTitle>
              <CardDescription>
                AI-powered meal recommendations based on Rasa, Virya, Vipaka principles and seasonal guidelines
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover-elevate">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Comprehensive patient monitoring with compliance tracking and outcome analysis
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">Choose Your Role</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Patient Login */}
            <Card className="hover-elevate">
              <CardHeader className="text-center">
                <User className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle>Patient Portal</CardTitle>
                <CardDescription>
                  View personalized diet charts, log meals, and track your wellness journey
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
            <Card className="hover-elevate">
              <CardHeader className="text-center">
                <Stethoscope className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle>Doctor Dashboard</CardTitle>
                <CardDescription>
                  Manage patients, create diet plans, and monitor treatment outcomes
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
            <Card className="hover-elevate">
              <CardHeader className="text-center">
                <Building2 className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle>Admin Panel</CardTitle>
                <CardDescription>
                  Clinic management, user administration, and system analytics
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

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          <p>© 2024 Triveda - Integrating Ayurvedic wisdom with modern healthcare technology</p>
          <p className="mt-2">HIPAA Compliant • NDHM Ready • Government Approved</p>
        </div>
      </div>
    </div>
  );
}