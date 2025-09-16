import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Plus, 
  Search, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Stethoscope,
  User,
  Heart,
  Activity
} from "lucide-react";

// todo: remove mock data
const mockPatients = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 34,
    prakriti: 'Pitta',
    lastVisit: '2024-01-15',
    compliance: 85,
    status: 'active',
    avatar: null,
    phone: '+91 98765 43210',
    issues: ['Weight Management', 'Digestion']
  },
  {
    id: '2', 
    name: 'Rohit Kumar',
    age: 42,
    prakriti: 'Vata-Kapha',
    lastVisit: '2024-01-10',
    compliance: 92,
    status: 'active',
    avatar: null,
    phone: '+91 87654 32109',
    issues: ['Stress Management', 'Sleep Quality']
  },
  {
    id: '3',
    name: 'Anjali Reddy',
    age: 28,
    prakriti: 'Kapha',
    lastVisit: '2024-01-08',
    compliance: 67,
    status: 'needs-attention',
    avatar: null,
    phone: '+91 76543 21098',
    issues: ['PCOD', 'Weight Loss']
  },
  {
    id: '4',
    name: 'Dr. Vikram Patel',
    age: 38,
    prakriti: 'Pitta-Vata',
    lastVisit: '2024-01-12',
    compliance: 78,
    status: 'active',
    avatar: null,
    phone: '+91 65432 10987',
    issues: ['Hypertension', 'Stress']
  }
];

const mockRecentActivities = [
  { id: '1', action: 'Diet chart approved for Priya Sharma', time: '2 hours ago' },
  { id: '2', action: 'New patient registered: Anjali Reddy', time: '4 hours ago' },
  { id: '3', action: 'Rohit Kumar logged meal compliance - 100%', time: '6 hours ago' },
  { id: '4', action: 'Diet modification requested for Dr. Vikram Patel', time: '1 day ago' },
];

interface DoctorDashboardProps {
  onNavigate?: (view: string) => void;
}

export default function DoctorDashboard({ onNavigate }: DoctorDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.prakriti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalPatients: mockPatients.length,
    activeCharts: mockPatients.filter(p => p.status === 'active').length,
    needsAttention: mockPatients.filter(p => p.status === 'needs-attention').length,
    avgCompliance: Math.round(mockPatients.reduce((sum, p) => sum + p.compliance, 0) / mockPatients.length)
  };

  const handleCreateDietChart = (patientId: string) => {
    console.log('Creating diet chart for patient:', patientId);
    // todo: remove mock functionality - navigate to diet chart creation
    if (onNavigate) {
      onNavigate('diet-chart-creation');
    }
  };

  const handlePatientSelect = (patient: typeof mockPatients[0]) => {
    setSelectedPatient(patient);
    console.log('Patient selected:', patient);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Stethoscope className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
                <p className="text-muted-foreground">Dr. Anjali Verma - Ayurvedic Practitioner</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => console.log('Logout clicked')}>
                🏠 Home
              </Button>
              <Button data-testid="button-new-patient">
                <Plus className="h-4 w-4 mr-2" />
                New Patient
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-2xl font-bold">{stats.totalPatients}</p>
                <p className="text-sm text-muted-foreground">Total Patients</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{stats.activeCharts}</p>
                <p className="text-sm text-muted-foreground">Active Charts</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <AlertTriangle className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{stats.needsAttention}</p>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">{stats.avgCompliance}%</p>
                <p className="text-sm text-muted-foreground">Avg Compliance</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="charts">Diet Charts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients by name or prakriti..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-patient-search"
                    />
                  </div>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Patients List */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {filteredPatients.map((patient) => (
                  <Card 
                    key={patient.id} 
                    className={`hover-elevate cursor-pointer ${selectedPatient?.id === patient.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handlePatientSelect(patient)}
                    data-testid={`card-patient-${patient.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={patient.avatar || undefined} />
                            <AvatarFallback>
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{patient.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {patient.age} years • {patient.prakriti} Prakriti
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {patient.issues.map((issue, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {issue}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <Badge 
                            variant={patient.status === 'active' ? 'default' : 'destructive'}
                            className="mb-2"
                          >
                            {patient.status === 'active' ? 'Active' : 'Needs Attention'}
                          </Badge>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-muted-foreground">Compliance</p>
                              <div className="flex items-center space-x-2">
                                <Progress value={patient.compliance} className="w-16 h-2" />
                                <span className="text-xs font-medium">{patient.compliance}%</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Patient Details Sidebar */}
              <div>
                {selectedPatient ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Patient Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <Avatar className="w-16 h-16 mx-auto mb-3">
                          <AvatarFallback className="text-lg">
                            {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">{selectedPatient.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedPatient.phone}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Age:</span>
                          <span className="text-sm font-medium">{selectedPatient.age} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Prakriti:</span>
                          <Badge variant="outline">{selectedPatient.prakriti}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Compliance:</span>
                          <span className="text-sm font-medium">{selectedPatient.compliance}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Health Issues:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedPatient.issues.map((issue, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {issue}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full"
                          onClick={() => handleCreateDietChart(selectedPatient.id)}
                          data-testid="button-create-diet-chart"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Create Diet Chart
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Activity className="h-4 w-4 mr-2" />
                          View History
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a patient to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="charts">
            <Card>
              <CardHeader>
                <CardTitle>Recent Diet Charts</CardTitle>
                <CardDescription>
                  Manage and monitor patient diet plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPatients.slice(0, 3).map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.prakriti} • Last updated: {patient.lastVisit}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                          {patient.status === 'active' ? 'Active' : 'Draft'}
                        </Badge>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Distribution by Prakriti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Pitta</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={40} className="w-20" />
                        <span className="text-sm">40%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Vata</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={35} className="w-20" />
                        <span className="text-sm">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Kapha</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={25} className="w-20" />
                        <span className="text-sm">25%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRecentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
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