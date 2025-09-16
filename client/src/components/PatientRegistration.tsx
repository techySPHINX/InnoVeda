import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Leaf, ArrowRight, ArrowLeft } from "lucide-react";

interface PatientFormData {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  email: string;
  phone: string;
  dietaryHabits: string;
  healthGoals: string[];
  allergies: string;
  chronicConditions: string[];
}

interface PatientRegistrationProps {
  onNavigate?: (view: string) => void;
}

export default function PatientRegistration({ onNavigate }: PatientRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    email: "",
    phone: "",
    dietaryHabits: "",
    healthGoals: [],
    allergies: "",
    chronicConditions: []
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    console.log('Next step clicked', { currentStep, formData });
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Registration completed:', formData);
      // todo: remove mock functionality - submit to backend
      if (onNavigate) {
        onNavigate('prakriti-assessment');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: 'healthGoals' | 'chronicConditions', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name"
                  data-testid="input-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input 
                  id="age"
                  data-testid="input-age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Age in years"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email"
                  data-testid="input-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone"
                  data-testid="input-phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger data-testid="select-gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Physical Characteristics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input 
                  id="weight"
                  data-testid="input-weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="70.5"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm) *</Label>
                <Input 
                  id="height"
                  data-testid="input-height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  placeholder="170"
                />
              </div>
            </div>
            {formData.weight && formData.height && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Calculated BMI: {(parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)}
                </p>
              </div>
            )}
            <div>
              <Label htmlFor="dietaryHabits">Dietary Habits</Label>
              <Select onValueChange={(value) => handleInputChange('dietaryHabits', value)}>
                <SelectTrigger data-testid="select-diet">
                  <SelectValue placeholder="Select dietary preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="eggetarian">Eggetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Health Goals & Preferences</h3>
            <div>
              <Label className="text-base font-medium">Health Goals (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  'Weight Loss', 'Weight Gain', 'Better Digestion', 'Improved Energy',
                  'Skin Health', 'Stress Management', 'Sleep Quality', 'General Wellness'
                ].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox 
                      id={goal}
                      data-testid={`checkbox-goal-${goal.toLowerCase().replace(' ', '-')}`}
                      checked={formData.healthGoals.includes(goal)}
                      onCheckedChange={() => handleArrayToggle('healthGoals', goal)}
                    />
                    <Label htmlFor={goal} className="text-sm">{goal}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="allergies">Known Allergies</Label>
              <Input 
                id="allergies"
                data-testid="input-allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                placeholder="e.g., Peanuts, Dairy, Gluten (leave blank if none)"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Medical History</h3>
            <div>
              <Label className="text-base font-medium">Chronic Conditions (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  'Diabetes', 'Hypertension', 'Heart Disease', 'Thyroid Issues',
                  'PCOD/PCOS', 'Arthritis', 'Digestive Issues', 'None'
                ].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox 
                      id={condition}
                      data-testid={`checkbox-condition-${condition.toLowerCase().replace('/', '-').replace(' ', '-')}`}
                      checked={formData.chronicConditions.includes(condition)}
                      onCheckedChange={() => handleArrayToggle('chronicConditions', condition)}
                    />
                    <Label htmlFor={condition} className="text-sm">{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Next Step:</strong> After registration, you'll complete a constitutional assessment (Prakriti quiz) 
                to determine your Ayurvedic body type for personalized diet recommendations.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-primary to-green-600 p-3 rounded-full shadow-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="ml-3">🌱 Sacred Patient Registration</CardTitle>
          </div>
          <CardDescription>
            Step {currentStep} of {totalSteps}: Complete your profile for personalized Ayurvedic care
          </CardDescription>
          <Progress value={progress} className="w-full mt-4" />
        </CardHeader>
        
        <CardContent>
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={handleNext}
              data-testid="button-next"
            >
              {currentStep === totalSteps ? 'Complete Registration' : 'Next'}
              {currentStep < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}