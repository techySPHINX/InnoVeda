import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Utensils, 
  Heart,
  TrendingUp,
  Sun,
  Moon,
  Sunset,
  Leaf,
  Plus
} from "lucide-react";

// todo: remove mock data
const mockPatient = {
  id: '1',
  name: 'Priya Sharma',
  age: 34,
  prakriti: 'Pitta',
  bmi: 24.5,
  goals: ['Weight Management', 'Better Digestion'],
  compliance: 85,
  streak: 12
};

const mockDietChart = {
  date: new Date().toISOString().split('T')[0],
  meals: {
    breakfast: {
      time: '8:00 AM',
      items: [
        'Poha (1 bowl) - Light and easy to digest',
        'Herbal Tea (1 cup) - Cooling for Pitta',
        'Almonds (5-6) - Healthy fats'
      ],
      rationale: 'Light breakfast to kickstart metabolism without aggravating Pitta',
      logged: false
    },
    lunch: {
      time: '1:00 PM', 
      items: [
        'Brown Rice (1 cup) - Complex carbohydrates',
        'Dal (1 bowl) - Protein and fiber',
        'Mixed Vegetables (1 bowl) - Vitamins and minerals',
        'Buttermilk (1 glass) - Cooling and digestive'
      ],
      rationale: 'Balanced meal during peak digestive fire (Agni) time',
      logged: true
    },
    snack: {
      time: '4:30 PM',
      items: [
        'Coconut Water (1 glass) - Cooling and hydrating',
        'Dates (2-3) - Natural sweetness for Pitta'
      ],
      rationale: 'Light snack to maintain energy without overloading digestion',
      logged: false
    },
    dinner: {
      time: '7:00 PM',
      items: [
        'Khichdi (1 bowl) - Easy to digest',
        'Ghee (1 tsp) - Nourishing and grounding',
        'Steamed Vegetables (1 bowl) - Light and nutritious'
      ],
      rationale: 'Light dinner for better sleep and digestion',
      logged: false
    }
  }
};

const mockProgress = [
  { week: 'Week 1', compliance: 78, weight: 72.5 },
  { week: 'Week 2', compliance: 82, weight: 72.2 },
  { week: 'Week 3', compliance: 85, weight: 71.8 },
  { week: 'Week 4', compliance: 88, weight: 71.5 }
];

export default function PatientDashboard() {
  const [mealLogs, setMealLogs] = useState<Record<string, boolean>>({
    lunch: true
  });

  const handleMealLog = (mealType: string, logged: boolean) => {
    setMealLogs(prev => ({ ...prev, [mealType]: logged }));
    console.log(`${mealType} logged as ${logged ? 'completed' : 'not completed'}`);
    // todo: remove mock functionality - sync with backend
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return Sun;
      case 'lunch': return Utensils;
      case 'snack': return Clock;
      case 'dinner': return Moon;
      default: return Utensils;
    }
  };

  const getTodaysCompliance = () => {
    const totalMeals = Object.keys(mockDietChart.meals).length;
    const loggedMeals = Object.values(mealLogs).filter(Boolean).length;
    return Math.round((loggedMeals / totalMeals) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {mockPatient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome, {mockPatient.name.split(' ')[0]}</h1>
                <p className="text-muted-foreground">
                  {mockPatient.prakriti} Prakriti • Day {mockPatient.streak} of your wellness journey
                </p>
              </div>
            </div>
            <Button data-testid="button-contact-doctor">
              <Heart className="h-4 w-4 mr-2" />
              Contact Doctor
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{getTodaysCompliance()}%</p>
                <p className="text-sm text-muted-foreground">Today's Compliance</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-2xl font-bold">{mockPatient.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <User className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{mockPatient.bmi}</p>
                <p className="text-sm text-muted-foreground">Current BMI</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Calendar className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{mockPatient.compliance}%</p>
                <p className="text-sm text-muted-foreground">Weekly Average</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="diet" className="space-y-6">
          <TabsList>
            <TabsTrigger value="diet">Today's Diet</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="diet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="h-5 w-5 text-primary mr-2" />
                  Today's Ayurvedic Diet Plan
                </CardTitle>
                <CardDescription>
                  Personalized for your {mockPatient.prakriti} constitution • {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {Object.entries(mockDietChart.meals).map(([mealType, meal]) => {
                const MealIcon = getMealIcon(mealType);
                const isLogged = mealLogs[mealType] || false;
                
                return (
                  <Card key={mealType} className={`${isLogged ? 'bg-green-50/50 border-green-200' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MealIcon className="h-6 w-6 text-primary" />
                          <div>
                            <CardTitle className="capitalize text-lg">{mealType}</CardTitle>
                            <CardDescription>{meal.time}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={isLogged}
                            onCheckedChange={(checked) => handleMealLog(mealType, checked as boolean)}
                            data-testid={`checkbox-${mealType}`}
                          />
                          <span className="text-sm text-muted-foreground">
                            {isLogged ? 'Completed' : 'Log meal'}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Recommended Foods:</h4>
                          <ul className="space-y-1">
                            {meal.items.map((item, index) => (
                              <li key={index} className="text-sm flex items-center">
                                <Leaf className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm">
                            <strong>Ayurvedic Rationale:</strong> {meal.rationale}
                          </p>
                        </div>
                        
                        {!isLogged && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMealLog(mealType, true)}
                            data-testid={`button-log-${mealType}`}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Log This Meal
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Daily Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Ayurvedic Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <p className="text-sm">Drink warm water throughout the day to support digestion and balance Pitta</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <p className="text-sm">Take a 10-minute walk after lunch to aid digestion</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <p className="text-sm">Practice deep breathing before meals to prepare your digestive fire (Agni)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress Overview</CardTitle>
                  <CardDescription>Track your compliance and wellness journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProgress.map((week, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{week.week}</p>
                          <p className="text-sm text-muted-foreground">Weight: {week.weight} kg</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Compliance</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={week.compliance} className="w-20" />
                            <span className="text-sm font-medium">{week.compliance}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Goals Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockPatient.goals.map((goal, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{goal}</span>
                            <span className="text-sm text-muted-foreground">75%</span>
                          </div>
                          <Progress value={75} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Follow-up Consultation</p>
                          <p className="text-sm text-muted-foreground">January 25, 2024 • 10:00 AM</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule New Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{mockPatient.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{mockPatient.age} years</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Prakriti</p>
                      <Badge variant="outline">{mockPatient.prakriti}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current BMI</p>
                      <p className="font-medium">{mockPatient.bmi}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Health Goals</p>
                    <div className="flex flex-wrap gap-2">
                      {mockPatient.goals.map((goal, index) => (
                        <Badge key={index} variant="secondary">{goal}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ayurvedic Constitution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-primary">Primary Dosha: {mockPatient.prakriti}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Fire and Water elements dominate your constitution. Focus on cooling, sweet foods and avoid excessive heat.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recommendations for {mockPatient.prakriti}:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Favor cool, sweet, and bitter tastes</li>
                        <li>• Avoid spicy, sour, and salty foods</li>
                        <li>• Eat regularly and don't skip meals</li>
                        <li>• Stay cool and avoid excessive sun exposure</li>
                      </ul>
                    </div>
                    <Button variant="outline" size="sm">
                      Retake Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}