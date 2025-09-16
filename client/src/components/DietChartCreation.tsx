import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Plus, 
  Trash2, 
  Search, 
  Clock, 
  Sun, 
  Moon, 
  Utensils,
  Leaf,
  Save,
  Send,
  Info
} from "lucide-react";

// todo: remove mock data
const mockPatient = {
  id: '1',
  name: 'Priya Sharma',
  age: 34,
  prakriti: 'Pitta',
  weight: 72,
  height: 165,
  healthGoals: ['Weight Management', 'Better Digestion'],
  allergies: ['Peanuts'],
  conditions: ['None']
};

const mockFoodDatabase = [
  { id: '1', name: 'Poha', category: 'Breakfast', rasa: 'Sweet', virya: 'Cooling', vipaka: 'Sweet', dosha: 'Balances Pitta', calories: 180, protein: 4, carbs: 35, fat: 2 },
  { id: '2', name: 'Brown Rice', category: 'Grains', rasa: 'Sweet', virya: 'Cooling', vipaka: 'Sweet', dosha: 'Balances all Doshas', calories: 220, protein: 5, carbs: 45, fat: 2 },
  { id: '3', name: 'Moong Dal', category: 'Legumes', rasa: 'Sweet', virya: 'Cooling', vipaka: 'Sweet', dosha: 'Balances Pitta', calories: 150, protein: 12, carbs: 25, fat: 1 },
  { id: '4', name: 'Cucumber', category: 'Vegetables', rasa: 'Sweet', virya: 'Cooling', vipaka: 'Sweet', dosha: 'Balances Pitta', calories: 15, protein: 1, carbs: 4, fat: 0 },
  { id: '5', name: 'Coconut Water', category: 'Beverages', rasa: 'Sweet', virya: 'Cooling', vipaka: 'Sweet', dosha: 'Balances Pitta', calories: 45, protein: 2, carbs: 9, fat: 0 },
  { id: '6', name: 'Khichdi', category: 'Complete Meals', rasa: 'Sweet', virya: 'Neutral', vipaka: 'Sweet', dosha: 'Balances all Doshas', calories: 200, protein: 8, carbs: 40, fat: 3 },
  { id: '7', name: 'Ghee', category: 'Fats', rasa: 'Sweet', virya: 'Cooling', vipaka: 'Sweet', dosha: 'Balances Vata', calories: 120, protein: 0, carbs: 0, fat: 14 },
  { id: '8', name: 'Buttermilk', category: 'Beverages', rasa: 'Sour', virya: 'Cooling', vipaka: 'Sweet', dosha: 'Balances Pitta', calories: 60, protein: 3, carbs: 8, fat: 2 }
];

interface MealItem {
  foodId: string;
  name: string;
  quantity: string;
  portion: string;
  notes: string;
}

interface Meal {
  time: string;
  items: MealItem[];
  rationale: string;
}

interface DietChart {
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
}

export default function DietChartCreation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<keyof DietChart>('breakfast');
  const [dietChart, setDietChart] = useState<DietChart>({
    breakfast: { time: '8:00 AM', items: [], rationale: '' },
    lunch: { time: '1:00 PM', items: [], rationale: '' },
    snack: { time: '4:30 PM', items: [], rationale: '' },
    dinner: { time: '7:00 PM', items: [], rationale: '' }
  });
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);

  const progress = (currentStep / 4) * 100;

  const filteredFoods = mockFoodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.rasa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFoodToMeal = (food: typeof mockFoodDatabase[0]) => {
    const newItem: MealItem = {
      foodId: food.id,
      name: food.name,
      quantity: '1',
      portion: 'medium',
      notes: ''
    };
    
    setDietChart(prev => ({
      ...prev,
      [selectedMeal]: {
        ...prev[selectedMeal],
        items: [...prev[selectedMeal].items, newItem]
      }
    }));
    
    console.log(`Added ${food.name} to ${selectedMeal}`);
  };

  const handleRemoveFoodFromMeal = (index: number) => {
    setDietChart(prev => ({
      ...prev,
      [selectedMeal]: {
        ...prev[selectedMeal],
        items: prev[selectedMeal].items.filter((_, i) => i !== index)
      }
    }));
  };

  const handleUpdateMealTime = (meal: keyof DietChart, time: string) => {
    setDietChart(prev => ({
      ...prev,
      [meal]: { ...prev[meal], time }
    }));
  };

  const handleUpdateRationale = (meal: keyof DietChart, rationale: string) => {
    setDietChart(prev => ({
      ...prev,
      [meal]: { ...prev[meal], rationale }
    }));
  };

  const calculateTotalNutrition = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    Object.values(dietChart).forEach(meal => {
      meal.items.forEach(item => {
        const food = mockFoodDatabase.find(f => f.id === item.foodId);
        if (food) {
          const multiplier = parseFloat(item.quantity) || 1;
          totalCalories += food.calories * multiplier;
          totalProtein += food.protein * multiplier;
          totalCarbs += food.carbs * multiplier;
          totalFat += food.fat * multiplier;
        }
      });
    });

    return { totalCalories, totalProtein, totalCarbs, totalFat };
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

  const handleGenerateChart = () => {
    console.log('Auto-generating diet chart based on patient profile');
    // todo: remove mock functionality - implement AI-based diet generation
    
    // Mock auto-generation for Pitta constitution
    const autoChart: DietChart = {
      breakfast: {
        time: '8:00 AM',
        items: [
          { foodId: '1', name: 'Poha', quantity: '1', portion: 'bowl', notes: 'Light and cooling' },
          { foodId: '5', name: 'Coconut Water', quantity: '1', portion: 'glass', notes: 'Hydrating for Pitta' }
        ],
        rationale: 'Light breakfast with cooling properties to balance Pitta constitution and support morning digestion.'
      },
      lunch: {
        time: '1:00 PM',
        items: [
          { foodId: '2', name: 'Brown Rice', quantity: '1', portion: 'cup', notes: 'Complex carbohydrates' },
          { foodId: '3', name: 'Moong Dal', quantity: '1', portion: 'bowl', notes: 'Protein and easy digestion' },
          { foodId: '4', name: 'Cucumber', quantity: '1', portion: 'bowl', notes: 'Cooling vegetables' }
        ],
        rationale: 'Balanced meal during peak digestive fire (Agni) with cooling and nourishing foods for Pitta.'
      },
      snack: {
        time: '4:30 PM',
        items: [
          { foodId: '8', name: 'Buttermilk', quantity: '1', portion: 'glass', notes: 'Cooling and digestive' }
        ],
        rationale: 'Light cooling snack to maintain energy without aggravating Pitta.'
      },
      dinner: {
        time: '7:00 PM',
        items: [
          { foodId: '6', name: 'Khichdi', quantity: '1', portion: 'bowl', notes: 'Easy to digest' },
          { foodId: '7', name: 'Ghee', quantity: '1', portion: 'tsp', notes: 'Nourishing fats' }
        ],
        rationale: 'Light, easily digestible dinner to promote good sleep and overnight healing.'
      }
    };

    setDietChart(autoChart);
    setCurrentStep(3);
  };

  const handleSaveAndApprove = () => {
    console.log('Diet chart approved and saved:', dietChart);
    // todo: remove mock functionality - save to backend and notify patient
    alert('Diet chart has been saved and will be sent to the patient!');
  };

  const renderPatientProfile = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="h-5 w-5 text-primary mr-2" />
          Patient Profile
        </CardTitle>
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
            <p className="text-sm text-muted-foreground">BMI</p>
            <p className="font-medium">{(mockPatient.weight / Math.pow(mockPatient.height / 100, 2)).toFixed(1)}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Health Goals</p>
          <div className="flex flex-wrap gap-1">
            {mockPatient.healthGoals.map((goal, index) => (
              <Badge key={index} variant="secondary" className="text-xs">{goal}</Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Allergies</p>
          <div className="flex flex-wrap gap-1">
            {mockPatient.allergies.map((allergy, index) => (
              <Badge key={index} variant="destructive" className="text-xs">{allergy}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderFoodDatabase = () => (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search foods by name, category, or taste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-food-search"
        />
      </div>
      
      <div className="max-h-96 overflow-y-auto space-y-2">
        {filteredFoods.map((food) => (
          <Card key={food.id} className="hover-elevate cursor-pointer" onClick={() => handleAddFoodToMeal(food)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{food.name}</h4>
                  <p className="text-sm text-muted-foreground">{food.category}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">Rasa: {food.rasa}</Badge>
                    <Badge variant="outline" className="text-xs">Virya: {food.virya}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{food.calories} cal</p>
                  <p className="text-xs text-muted-foreground">P:{food.protein}g C:{food.carbs}g F:{food.fat}g</p>
                  <p className="text-xs text-primary">{food.dosha}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMealPlanning = () => (
    <div className="space-y-6">
      <Tabs value={selectedMeal} onValueChange={(value) => setSelectedMeal(value as keyof DietChart)}>
        <TabsList className="grid w-full grid-cols-4">
          {Object.keys(dietChart).map((meal) => {
            const MealIcon = getMealIcon(meal);
            return (
              <TabsTrigger key={meal} value={meal} className="capitalize">
                <MealIcon className="h-4 w-4 mr-1" />
                {meal}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(dietChart).map(([mealType, meal]) => (
          <TabsContent key={mealType} value={mealType}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize flex items-center">
                  {getMealIcon(mealType)({ className: "h-5 w-5 mr-2" })}
                  {mealType} Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`${mealType}-time`}>Meal Time</Label>
                  <Input
                    id={`${mealType}-time`}
                    value={meal.time}
                    onChange={(e) => handleUpdateMealTime(mealType as keyof DietChart, e.target.value)}
                    placeholder="e.g., 8:00 AM"
                    data-testid={`input-${mealType}-time`}
                  />
                </div>

                <div>
                  <Label>Selected Foods</Label>
                  <div className="space-y-2 mt-2">
                    {meal.items.map((item: MealItem, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={item.quantity}
                            onChange={(e) => {
                              const newChart = { ...dietChart };
                              newChart[mealType as keyof DietChart].items[index].quantity = e.target.value;
                              setDietChart(newChart);
                            }}
                            className="w-16 text-center"
                            placeholder="1"
                          />
                          <Select
                            value={item.portion}
                            onValueChange={(value) => {
                              const newChart = { ...dietChart };
                              newChart[mealType as keyof DietChart].items[index].portion = value;
                              setDietChart(newChart);
                            }}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cup">cup</SelectItem>
                              <SelectItem value="bowl">bowl</SelectItem>
                              <SelectItem value="glass">glass</SelectItem>
                              <SelectItem value="tsp">tsp</SelectItem>
                              <SelectItem value="tbsp">tbsp</SelectItem>
                              <SelectItem value="piece">piece</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveFoodFromMeal(index)}
                          data-testid={`button-remove-${index}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor={`${mealType}-rationale`}>Ayurvedic Rationale</Label>
                  <Textarea
                    id={`${mealType}-rationale`}
                    value={meal.rationale}
                    onChange={(e) => handleUpdateRationale(mealType as keyof DietChart, e.target.value)}
                    placeholder="Explain why these foods are recommended for this patient's constitution..."
                    data-testid={`textarea-${mealType}-rationale`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );

  const renderNutritionSummary = () => {
    const nutrition = calculateTotalNutrition();
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Nutrition Summary</CardTitle>
            <CardDescription>Complete nutritional breakdown of the diet plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{Math.round(nutrition.totalCalories)}</p>
                <p className="text-sm text-muted-foreground">Total Calories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{Math.round(nutrition.totalProtein)}g</p>
                <p className="text-sm text-muted-foreground">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">{Math.round(nutrition.totalCarbs)}g</p>
                <p className="text-sm text-muted-foreground">Carbohydrates</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{Math.round(nutrition.totalFat)}g</p>
                <p className="text-sm text-muted-foreground">Fats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diet Chart Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Diet Chart Preview</CardTitle>
            <CardDescription>Final diet plan that will be sent to the patient</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(dietChart).map(([mealType, meal]) => {
                const MealIcon = getMealIcon(mealType);
                return (
                  <div key={mealType} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <MealIcon className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-semibold capitalize">{mealType}</h4>
                        <p className="text-sm text-muted-foreground">{meal.time}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      {meal.items.map((item: MealItem, index: number) => (
                        <div key={index} className="text-sm flex items-center">
                          <Leaf className="h-3 w-3 text-primary mr-2" />
                          {item.name} ({item.quantity} {item.portion})
                        </div>
                      ))}
                    </div>
                    
                    {meal.rationale && (
                      <div className="bg-muted/50 p-3 rounded">
                        <p className="text-sm">
                          <strong>Ayurvedic Rationale:</strong> {meal.rationale}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Create Diet Chart</h1>
              <p className="text-muted-foreground">For {mockPatient.name} • {mockPatient.prakriti} Constitution</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline"
                onClick={handleGenerateChart}
                data-testid="button-auto-generate"
              >
                <Heart className="h-4 w-4 mr-2" />
                Auto Generate
              </Button>
              <Button 
                onClick={handleSaveAndApprove}
                disabled={currentStep < 4}
                data-testid="button-save-approve"
              >
                <Send className="h-4 w-4 mr-2" />
                Save & Send to Patient
              </Button>
            </div>
          </div>
          <Progress value={progress} className="w-full mt-4" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Patient Profile Sidebar */}
          <div>
            {renderPatientProfile()}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="1">Food Database</TabsTrigger>
                <TabsTrigger value="2">Meal Planning</TabsTrigger>
                <TabsTrigger value="3">Review</TabsTrigger>
                <TabsTrigger value="4">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="1" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ayurvedic Food Database</CardTitle>
                    <CardDescription>
                      Select foods based on Rasa, Virya, Vipaka properties and patient's {mockPatient.prakriti} constitution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderFoodDatabase()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="2" className="mt-6">
                {renderMealPlanning()}
              </TabsContent>

              <TabsContent value="3" className="mt-6">
                {renderNutritionSummary()}
              </TabsContent>

              <TabsContent value="4" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Diet Chart Created Successfully!</CardTitle>
                    <CardDescription>
                      The personalized Ayurvedic diet plan has been prepared for {mockPatient.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-lg font-bold">{Object.values(dietChart).reduce((sum, meal) => sum + meal.items.length, 0)}</p>
                        <p className="text-sm text-muted-foreground">Food Items</p>
                      </div>
                      <div className="text-center p-4 bg-green-500/5 rounded-lg">
                        <p className="text-lg font-bold">4</p>
                        <p className="text-sm text-muted-foreground">Meals Planned</p>
                      </div>
                      <div className="text-center p-4 bg-blue-500/5 rounded-lg">
                        <p className="text-lg font-bold">{Math.round(calculateTotalNutrition().totalCalories)}</p>
                        <p className="text-sm text-muted-foreground">Daily Calories</p>
                      </div>
                      <div className="text-center p-4 bg-orange-500/5 rounded-lg">
                        <p className="text-lg font-bold">100%</p>
                        <p className="text-sm text-muted-foreground">Ayurvedic Aligned</p>
                      </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Next Steps</p>
                          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                            <li>• Diet chart will be sent to patient's registered email/phone</li>
                            <li>• Patient will receive meal reminders and logging prompts</li>
                            <li>• Weekly compliance reports will be generated automatically</li>
                            <li>• Schedule follow-up consultation in 2 weeks</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <Button onClick={() => setCurrentStep(2)} variant="outline">
                        Edit Diet Plan
                      </Button>
                      <Button onClick={handleSaveAndApprove}>
                        <Save className="h-4 w-4 mr-2" />
                        Finalize & Send
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}