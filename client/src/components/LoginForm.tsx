import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, ArrowLeft } from "lucide-react";

interface LoginFormProps {
  userType: 'patient' | 'doctor' | 'admin';
  onBack?: () => void;
}

export default function LoginForm({ userType, onBack }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    console.log(`${userType} login attempt:`, formData);
    
    // todo: remove mock functionality - implement actual authentication
    setTimeout(() => {
      setIsLoading(false);
      alert(`${userType} login successful! Redirecting to dashboard...`);
    }, 1500);
  };

  const getRoleDetails = () => {
    switch (userType) {
      case 'patient':
        return {
          title: 'Patient Portal Login',
          description: 'Access your personalized diet charts and wellness journey',
          demoCredentials: {
            email: 'patient@triveda.com',
            password: 'patient123'
          }
        };
      case 'doctor':
        return {
          title: 'Doctor Dashboard Login',
          description: 'Manage patients and create personalized Ayurvedic diet plans',
          demoCredentials: {
            email: 'doctor@triveda.com', 
            password: 'doctor123'
          }
        };
      case 'admin':
        return {
          title: 'Admin Panel Login',
          description: 'System administration and clinic management',
          demoCredentials: {
            email: 'admin@triveda.com',
            password: 'admin123'
          }
        };
      default:
        return {
          title: 'Login',
          description: 'Please sign in to continue',
          demoCredentials: { email: '', password: '' }
        };
    }
  };

  const roleDetails = getRoleDetails();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-primary mr-2" />
            <CardTitle>Triveda</CardTitle>
          </div>
          <CardTitle className="text-xl">{roleDetails.title}</CardTitle>
          <CardDescription>{roleDetails.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Demo Credentials Info */}
          <div className="bg-primary/5 p-3 rounded-lg text-sm">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>Email: {roleDetails.demoCredentials.email}</p>
            <p>Password: {roleDetails.demoCredentials.password}</p>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                data-testid="input-email"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                data-testid="input-password"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                data-testid="checkbox-remember"
              />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleLogin}
              disabled={isLoading || !formData.email || !formData.password}
              className="w-full"
              data-testid="button-login"
            >
              {isLoading ? 'Signing in...' : `Sign in as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
            </Button>

            {userType === 'patient' && (
              <Button variant="outline" className="w-full">
                Sign in with Google
              </Button>
            )}

            <div className="text-center">
              <Button variant="link" className="text-sm">
                Forgot your password?
              </Button>
            </div>
          </div>

          {onBack && (
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                onClick={onBack}
                className="w-full"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}