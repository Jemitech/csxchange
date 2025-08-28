"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Users, Clock, Star, MessageCircle, Calendar } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Skill {
  _id: string
  name: string
  category: string
  description: string
  difficulty: string
  learners: number
  teachers: number
  tags: string[]
}

// Mock teachers data
const mockTeachers = [
  {
    id: "1",
    name: "Chinedu Okoro",
    department: "Computer Science",
    level: "400 Level",
    rating: 4.8,
    sessions: 23,
    bio: "Passionate about Python and web development. I've been coding for 3 years and love helping others learn.",
  },
  {
    id: "2",
    name: "Adaora Nwankwo",
    department: "Computer Science",
    level: "500 Level",
    rating: 4.9,
    sessions: 31,
    bio: "Full-stack developer with experience in Django and React. Available for both beginner and advanced sessions.",
  },
  {
    id: "3",
    name: "Emeka Okafor",
    department: "Electrical Engineering",
    level: "Postgraduate",
    rating: 4.7,
    sessions: 18,
    bio: "Using Python for data analysis and automation. Can teach both programming basics and advanced applications.",
  },
]

export default function SkillDetailsPage() {
  const params = useParams()
  const [skill, setSkill] = useState<Skill | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkillDetails()
  }, [params.id])

  const fetchSkillDetails = async () => {
    try {
      const response = await fetch("/api/skills")
      if (response.ok) {
        const skills = await response.json()
        const foundSkill = skills.find(
          (s: Skill) => s._id === params.id || s.name.toLowerCase().replace(/\s+/g, "-") === params.id,
        )
        setSkill(foundSkill || skills[0]) // Fallback to first skill if not found
      }
    } catch (error) {
      console.error("Error fetching skill details:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleComingSoon = () => {
    alert("This feature is coming soon!")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading skill details...</p>
        </div>
      </div>
    )
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skill not found</h2>
          <p className="text-gray-600 mb-4">The skill you're looking for doesn't exist.</p>
          <Link href="/browse">
            <Button>Browse All Skills</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Campus SkillXChange</h1>
                  <p className="text-sm text-gray-600">FUTO Campus Platform</p>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/browse" className="text-gray-700 hover:text-blue-600 font-medium">
                Browse Skills
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
            </nav>
            <div className="flex space-x-3">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/browse" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse Skills
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Skill Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{skill.name}</CardTitle>
                    <CardDescription className="text-lg">{skill.category}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {skill.difficulty}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {skill.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">{skill.description}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{skill.teachers}</p>
                      <p className="text-sm text-gray-600">Available Teachers</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">4.8</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">1-2 hours</p>
                      <p className="text-sm text-gray-600">Typical Session</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex space-x-4">
                  <Button className="flex-1" onClick={handleComingSoon}>
                    Find a Teacher
                  </Button>
                  <Button variant="outline" onClick={handleComingSoon}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Available Teachers */}
            <Card>
              <CardHeader>
                <CardTitle>Available Teachers</CardTitle>
                <CardDescription>Connect with these FUTO students who can teach {skill.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTeachers.map((teacher) => (
                    <div key={teacher.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{teacher.name}</h4>
                          <p className="text-sm text-gray-600">
                            {teacher.department} • {teacher.level}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{teacher.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600">{teacher.sessions} sessions</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{teacher.bio}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleComingSoon}>
                          Connect
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleComingSoon}>
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interested Learners</span>
                    <span className="font-medium">{skill.learners}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Teachers</span>
                    <span className="font-medium">{skill.teachers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty Level</span>
                    <span className="font-medium">{skill.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{skill.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/skills/2" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                    <p className="font-medium">Data Analysis</p>
                    <p className="text-sm text-gray-600">Statistics</p>
                  </Link>
                  <Link href="/skills/4" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                    <p className="font-medium">Web Development</p>
                    <p className="text-sm text-gray-600">Computer Science</p>
                  </Link>
                  <Link href="/skills/5" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                    <p className="font-medium">Machine Learning</p>
                    <p className="text-sm text-gray-600">Computer Science</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
