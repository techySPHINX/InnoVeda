import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Users,
  Stethoscope,
  User,
  Plus,
  Search,
  Settings,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  UserCog,
} from "lucide-react";

// todo: remove mock data
const mockClinicStats = {
  totalDoctors: 12,
  totalPatients: 348,
  activeCharts: 256,
  complianceRate: 82,
  monthlyGrowth: 15,
};

const mockDoctors = [
  {
    id: "1",
    name: "Dr. Anjali Verma",
    specialization: "Ayurvedic Medicine",
    patients: 45,
    experience: "8 years",
    rating: 4.8,
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialization: "Panchakarma",
    patients: 38,
    experience: "12 years",
    rating: 4.9,
    status: "active",
    joinDate: "2022-08-20",
  },
  {
    id: "3",
    name: "Dr. Priya Singh",
    specialization: "Women's Health",
    patients: 52,
    experience: "6 years",
    rating: 4.7,
    status: "active",
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Dr. Vikram Patel",
    specialization: "Digestive Health",
    patients: 41,
    experience: "10 years",
    rating: 4.6,
    status: "inactive",
    joinDate: "2022-11-05",
  },
];

const mockPatients = [
  {
    id: "1",
    name: "Priya Sharma",
    doctor: "Dr. Anjali Verma",
    lastVisit: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Rohit Kumar",
    doctor: "Dr. Rajesh Kumar",
    lastVisit: "2024-01-14",
    status: "active",
  },
  {
    id: "3",
    name: "Anjali Reddy",
    doctor: "Dr. Priya Singh",
    lastVisit: "2024-01-10",
    status: "needs-attention",
  },
  {
    id: "4",
    name: "Vikram Patel",
    doctor: "Dr. Anjali Verma",
    lastVisit: "2024-01-12",
    status: "active",
  },
];

const mockRecentActivity = [
  {
    id: "1",
    action: "New doctor registration: Dr. Meera Gupta",
    time: "2 hours ago",
    type: "user",
  },
  {
    id: "2",
    action: "System maintenance completed",
    time: "1 day ago",
    type: "system",
  },
  {
    id: "3",
    action: "Monthly compliance report generated",
    time: "2 days ago",
    type: "report",
  },
  {
    id: "4",
    action: "New patient batch imported: 25 patients",
    time: "3 days ago",
    type: "data",
  },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  const filteredDoctors = mockDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (type: string) => {
    console.log(`Adding new ${type}`);
    // todo: remove mock functionality - navigate to user creation form
  };

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user:`, userId);
    // todo: remove mock functionality - perform user action
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  TrivedaCare Clinic Management System
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log("Logout clicked")}
              >
                🏠 Home
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button data-testid="button-add-user">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Stethoscope className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-2xl font-bold">
                  {mockClinicStats.totalDoctors}
                </p>
                <p className="text-sm text-muted-foreground">Total Doctors</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">
                  {mockClinicStats.totalPatients}
                </p>
                <p className="text-sm text-muted-foreground">Total Patients</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">
                  {mockClinicStats.activeCharts}
                </p>
                <p className="text-sm text-muted-foreground">Active Charts</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <BarChart3 className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">
                  {mockClinicStats.complianceRate}%
                </p>
                <p className="text-sm text-muted-foreground">Compliance Rate</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-purple-500 mr-4" />
              <div>
                <p className="text-2xl font-bold">
                  +{mockClinicStats.monthlyGrowth}%
                </p>
                <p className="text-sm text-muted-foreground">Monthly Growth</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent System Activity</CardTitle>
                  <CardDescription>
                    Latest updates and changes in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === "user"
                              ? "bg-blue-500"
                              : activity.type === "system"
                              ? "bg-green-500"
                              : activity.type === "report"
                              ? "bg-orange-500"
                              : "bg-purple-500"
                          }`}
                        ></div>
                        <div>
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => handleAddUser("doctor")}
                    data-testid="button-add-doctor"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Add New Doctor
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => handleAddUser("patient")}
                    data-testid="button-add-patient"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Register Patient
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Doctors */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Doctors</CardTitle>
                <CardDescription>
                  Based on patient count and ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockDoctors.slice(0, 4).map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialization}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {doctor.patients} patients
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ⭐ {doctor.rating}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                        data-testid="input-search-doctors"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => handleAddUser("doctor")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Doctors List */}
            <Card>
              <CardHeader>
                <CardTitle>Doctor Management</CardTitle>
                <CardDescription>
                  Manage doctor profiles and access permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{doctor.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialization}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {doctor.experience}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ⭐ {doctor.rating}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {doctor.patients} patients
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            doctor.status === "active" ? "default" : "secondary"
                          }
                        >
                          {doctor.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUserAction("edit", doctor.id)}
                          data-testid={`button-edit-doctor-${doctor.id}`}
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-search-patients"
                    />
                  </div>
                  <Button onClick={() => handleAddUser("patient")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Register Patient
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Patients List */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>
                  View and manage patient records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Assigned to: {patient.doctor}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Last visit:{" "}
                            {new Date(patient.lastVisit).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            patient.status === "active"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {patient.status === "active"
                            ? "Active"
                            : "Needs Attention"}
                        </Badge>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Usage Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Active Users (Daily)</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Diet Charts Generated</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={92} className="w-20" />
                        <span className="text-sm">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Patient Compliance Rate</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={78} className="w-20" />
                        <span className="text-sm">78%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-500">98.5%</p>
                      <p className="text-sm text-muted-foreground">
                        System Uptime
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-500">1.2s</p>
                      <p className="text-sm text-muted-foreground">
                        Avg Response Time
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-orange-500">
                        99.9%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Data Integrity
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Growth Trends</CardTitle>
                  <CardDescription>
                    Patient registrations and doctor onboarding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    {["Oct", "Nov", "Dec", "Jan"].map((month, index) => (
                      <div
                        key={month}
                        className="text-center p-4 border rounded-lg"
                      >
                        <p className="text-lg font-bold">{45 + index * 12}</p>
                        <p className="text-sm text-muted-foreground">
                          {month} - New Patients
                        </p>
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
