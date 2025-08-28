"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageCircle,
  Calendar,
  Star,
  TrendingUp,
  Bell,
  Settings,
  Search,
  Plus,
  Clock,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  const [user] = useState({
    name: "James Anthony",
    email: "james.anthony@futo.edu.ng",
    department: "Computer Science",
    level: "400 Level",
    avatar: "/student-avatar.png",
  })

  const [stats] = useState({
    skillsShared: 5,
    sessionsCompleted: 12,
    averageRating: 4.8,
    hoursLearned: 24,
  })

  const recentMatches = [
    {
      id: 1,
      name: "Sarah Okafor",
      skill: "Python Programming",
      department: "Computer Science",
      status: "pending",
      matchScore: 92,
    },
    {
      id: 2,
      name: "David Emeka",
      skill: "Data Analysis",
      department: "Statistics",
      status: "accepted",
      matchScore: 88,
    },
    {
      id: 3,
      name: "Grace Adebayo",
      skill: "French Language",
      department: "Languages",
      status: "completed",
      matchScore: 85,
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      title: "Python Basics Session",
      partner: "Sarah Okafor",
      date: "2025-03-15",
      time: "2:00 PM",
      type: "online",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Data Visualization Workshop",
      partner: "David Emeka",
      date: "2025-03-17",
      time: "4:00 PM",
      type: "in-person",
      status: "pending",
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "match",
      message: "New match request from Sarah Okafor for Python Programming",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "session",
      message: "Session with David Emeka confirmed for tomorrow",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "feedback",
      message: "Grace Adebayo left you a 5-star review",
      time: "1 day ago",
      unread: false,
    },
  ]

  const handleComingSoon = () => {
    alert("This feature is coming soon!")
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      alert("Logged out successfully!")
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl">Campus SkillXChange</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/browse" className="text-gray-700 hover:text-blue-600">
                Browse
              </Link>
              <button onClick={handleComingSoon} className="text-gray-700 hover:text-blue-600">
                Messages
              </button>
              <button onClick={handleComingSoon} className="text-gray-700 hover:text-blue-600">
                Sessions
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleComingSoon}>
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleComingSoon}>
                <Settings className="h-4 w-4" />
              </Button>
              <div className="relative group">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">
            {user.department} • {user.level} • Ready to learn and teach today?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skills Shared</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.skillsShared}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sessions Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.sessionsCompleted}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.hoursLearned}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="matches" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="matches">Recent Matches</TabsTrigger>
                <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
                <TabsTrigger value="progress">My Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="matches" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Recent Matches</h3>
                  <Button size="sm" onClick={handleComingSoon}>
                    <Plus className="h-4 w-4 mr-2" />
                    Find New Matches
                  </Button>
                </div>
                {recentMatches.map((match) => (
                  <Card key={match.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {match.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{match.name}</h4>
                            <p className="text-sm text-gray-600">{match.department}</p>
                            <p className="text-sm font-medium text-blue-600">{match.skill}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              match.status === "pending"
                                ? "secondary"
                                : match.status === "accepted"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {match.status}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">{match.matchScore}% match</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sessions" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
                  <Button size="sm" onClick={handleComingSoon}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule New
                  </Button>
                </div>
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{session.title}</h4>
                          <p className="text-sm text-gray-600">with {session.partner}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">
                              {session.date} at {session.time}
                            </span>
                            <Badge variant="outline">{session.type}</Badge>
                          </div>
                        </div>
                        <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                          {session.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="progress" className="space-y-4">
                <h3 className="text-lg font-semibold">Learning Progress</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h4 className="font-medium mb-2">Great Progress!</h4>
                      <p className="text-gray-600 mb-4">
                        You've completed 12 learning sessions this month and maintained a 4.8-star rating.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Skills Mastered</p>
                          <p className="text-2xl font-bold text-green-600">3</p>
                        </div>
                        <div>
                          <p className="font-medium">New Connections</p>
                          <p className="text-2xl font-bold text-blue-600">8</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/browse">
                  <Button className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Find Learning Partners
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleComingSoon}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleComingSoon}>
                  <Users className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.unread ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full" onClick={handleComingSoon}>
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Platform Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="font-medium">Complete your profile</p>
                    <p className="text-gray-600">Add more skills to get better matches!</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium">Rate your sessions</p>
                    <p className="text-gray-600">Help others by leaving honest feedback.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
