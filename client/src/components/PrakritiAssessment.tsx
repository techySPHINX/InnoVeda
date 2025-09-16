import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, ArrowRight, ArrowLeft, Brain } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
  }[];
}

const questions: Question[] = [
  {
    id: "body-frame",
    question: "Which best describes your natural body frame?",
    options: [
      { value: "thin", text: "Thin, light frame with prominent joints", dosha: "vata" },
      { value: "medium", text: "Medium build with good muscle definition", dosha: "pitta" },
      { value: "large", text: "Large frame with tendency to gain weight easily", dosha: "kapha" }
    ]
  },
  {
    id: "skin-type",
    question: "How would you describe your skin?",
    options: [
      { value: "dry", text: "Dry, thin, cool to touch, rough texture", dosha: "vata" },
      { value: "warm", text: "Warm, oily, prone to rashes or irritation", dosha: "pitta" },
      { value: "thick", text: "Thick, soft, cool, well-moisturized", dosha: "kapha" }
    ]
  },
  {
    id: "appetite",
    question: "Describe your appetite and eating patterns:",
    options: [
      { value: "irregular", text: "Irregular appetite, forget to eat sometimes", dosha: "vata" },
      { value: "strong", text: "Strong, regular appetite, get irritable when hungry", dosha: "pitta" },
      { value: "steady", text: "Steady appetite, can skip meals without discomfort", dosha: "kapha" }
    ]
  },
  {
    id: "sleep",
    question: "What's your natural sleep pattern?",
    options: [
      { value: "light", text: "Light sleeper, difficulty falling asleep, active dreams", dosha: "vata" },
      { value: "moderate", text: "Moderate sleep, fall asleep quickly, intense dreams", dosha: "pitta" },
      { value: "deep", text: "Deep, long sleep, slow to wake up, few dreams", dosha: "kapha" }
    ]
  },
  {
    id: "energy",
    question: "How would you describe your energy levels?",
    options: [
      { value: "bursts", text: "Energy comes in bursts, prone to exhaustion", dosha: "vata" },
      { value: "intense", text: "Intense, focused energy with good endurance", dosha: "pitta" },
      { value: "steady", text: "Steady, consistent energy, slow to start", dosha: "kapha" }
    ]
  },
  {
    id: "digestion",
    question: "How is your digestion typically?",
    options: [
      { value: "variable", text: "Variable - sometimes good, sometimes gas/bloating", dosha: "vata" },
      { value: "strong", text: "Strong digestion, rarely have digestive issues", dosha: "pitta" },
      { value: "slow", text: "Slow but steady, feel heavy after meals", dosha: "kapha" }
    ]
  },
  {
    id: "temperament",
    question: "Which temperament best describes you?",
    options: [
      { value: "creative", text: "Creative, enthusiastic, but can be anxious", dosha: "vata" },
      { value: "focused", text: "Goal-oriented, competitive, can be irritable", dosha: "pitta" },
      { value: "calm", text: "Calm, steady, compassionate, resistant to change", dosha: "kapha" }
    ]
  },
  {
    id: "weather",
    question: "Which weather do you prefer and feel best in?",
    options: [
      { value: "warm", text: "Warm, humid weather; dislike cold and wind", dosha: "vata" },
      { value: "cool", text: "Cool, well-ventilated spaces; dislike heat", dosha: "pitta" },
      { value: "warm-dry", text: "Warm, dry weather; dislike cold and damp", dosha: "kapha" }
    ]
  }
];

export default function PrakritiAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{ vata: number; pitta: number; kapha: number } | null>(null);

  const progress = showResults ? 100 : ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.values(answers).forEach(answer => {
      questions.forEach(question => {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          scores[option.dosha]++;
        }
      });
    });

    setResults(scores);
    setShowResults(true);
    console.log('Prakriti Assessment Results:', scores);
    // todo: remove mock functionality - save results to backend
  };

  const getPrimaryDosha = () => {
    if (!results) return null;
    return Object.entries(results).reduce((a, b) => results[a[0] as keyof typeof results] > results[b[0] as keyof typeof results] ? a : b)[0];
  };

  const getDoshaDescription = (dosha: string) => {
    const descriptions = {
      vata: {
        name: "Vata Prakriti",
        description: "Air and Space elements dominate. You tend to be creative, energetic, and quick-thinking, but may experience anxiety and irregular patterns.",
        characteristics: ["Light, thin build", "Dry skin and hair", "Quick movements", "Creative mind", "Variable appetite", "Light sleep"],
        recommendations: ["Regular routine", "Warm, cooked foods", "Oil massages", "Avoid cold, raw foods", "Practice grounding activities"]
      },
      pitta: {
        name: "Pitta Prakriti", 
        description: "Fire and Water elements dominate. You tend to be goal-oriented, intelligent, and have strong digestion, but may experience irritability and heat-related issues.",
        characteristics: ["Medium build", "Warm skin", "Strong appetite", "Sharp intellect", "Good leadership", "Moderate sleep"],
        recommendations: ["Cool, sweet foods", "Avoid spicy, hot foods", "Stay cool", "Regular exercise", "Practice patience and cooling activities"]
      },
      kapha: {
        name: "Kapha Prakriti",
        description: "Earth and Water elements dominate. You tend to be calm, steady, and compassionate, but may experience sluggishness and weight gain.",
        characteristics: ["Large, sturdy build", "Soft, thick skin", "Steady appetite", "Calm nature", "Deep sleep", "Strong immunity"],
        recommendations: ["Light, spicy foods", "Regular vigorous exercise", "Avoid heavy, oily foods", "Stay active", "Practice stimulating activities"]
      }
    };
    return descriptions[dosha as keyof typeof descriptions];
  };

  if (showResults && results) {
    const primaryDosha = getPrimaryDosha();
    const doshaInfo = primaryDosha ? getDoshaDescription(primaryDosha) : null;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-primary mr-2" />
              <CardTitle>Your Prakriti Assessment Results</CardTitle>
            </div>
            <Progress value={100} className="w-full" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Dosha Scores */}
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(results).map(([dosha, score]) => (
                <Card key={dosha} className={`text-center ${dosha === primaryDosha ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader>
                    <CardTitle className="capitalize text-lg">{dosha}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{score}</div>
                    <div className="text-sm text-muted-foreground">out of {questions.length}</div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Primary Dosha Details */}
            {doshaInfo && (
              <Card className="border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="text-lg px-3 py-1">Primary Constitution</Badge>
                    <CardTitle className="text-xl">{doshaInfo.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {doshaInfo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Key Characteristics</h4>
                      <ul className="space-y-2">
                        {doshaInfo.characteristics.map((char, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <Leaf className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Dietary Recommendations</h4>
                      <ul className="space-y-2">
                        {doshaInfo.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <Leaf className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <Button 
                size="lg" 
                className="mr-4"
                data-testid="button-continue-dashboard"
                onClick={() => console.log('Continue to dashboard clicked')}
              >
                Continue to Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                data-testid="button-retake-assessment"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                  setResults(null);
                }}
              >
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-primary mr-2" />
            <CardTitle>Prakriti Assessment</CardTitle>
          </div>
          <CardDescription>
            Question {currentQuestion + 1} of {questions.length}: Discover your Ayurvedic constitution
          </CardDescription>
          <Progress value={progress} className="w-full mt-4" />
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-center">
              {questions[currentQuestion].question}
            </h3>
            
            <RadioGroup
              value={answers[questions[currentQuestion].id] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50">
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    data-testid={`radio-${option.value}`}
                    className="mt-1"
                  />
                  <Label htmlFor={option.value} className="text-sm leading-relaxed cursor-pointer flex-1">
                    {option.text}
                  </Label>
                  <Badge variant="secondary" className="text-xs">
                    {option.dosha}
                  </Badge>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentQuestion === 0}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!answers[questions[currentQuestion].id]}
              data-testid="button-next"
            >
              {currentQuestion === questions.length - 1 ? 'Calculate Results' : 'Next'}
              {currentQuestion < questions.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}