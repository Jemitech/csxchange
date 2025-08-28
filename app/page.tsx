"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Star, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [stats] = useState({
    totalUsers: 1247,
    skillsShared: 89,
    sessionsCompleted: 456,
    averageRating: 4.7,
  })

  const featuredSkills = [
    { id: "1", name: "Python Programming", category: "Computer Science", learners: 45, teachers: 12 },
    { id: "2", name: "Data Analysis", category: "Statistics", learners: 32, teachers: 8 },
    { id: "3", name: "French Language", category: "Languages", learners: 28, teachers: 15 },
    { id: "4", name: "Digital Marketing", category: "Business", learners: 38, teachers: 10 },
    { id: "5", name: "Graphic Design", category: "Creative Arts", learners: 41, teachers: 14 },
    { id: "6", name: "Public Speaking", category: "Communication", learners: 29, teachers: 9 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Campus Campus SkillXChange</h1>
              </div>
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

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Learn and Teach Skills with Your Fellow Students</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with FUTO students to exchange knowledge, learn new skills, and build lasting academic relationships
            through our peer-to-peer learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Join Campus SkillXChange <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/browse">
              <Button size="lg" variant="outline">
                Browse Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-gray-600 mt-1">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.skillsShared}</div>
              <div className="text-gray-600 mt-1">Skills Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.sessionsCompleted}</div>
              <div className="text-gray-600 mt-1">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{stats.averageRating}</div>
              <div className="text-gray-600 mt-1">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Popular Skills</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after skills on campus and connect with students who can help you learn.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSkills.map((skill, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                      <CardDescription>{skill.category}</CardDescription>
                    </div>
                    <Badge variant="secondary">{skill.teachers} teachers</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{skill.learners} interested</span>
                    </div>
                    <Link href={`/skills/${skill.id}`}>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How Campus SkillXChange Works</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to start learning and teaching with your fellow FUTO students.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Create Profile</h4>
              <p className="text-gray-600">
                Sign up with your FUTO email and create a profile showcasing your skills and learning interests.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2">2. Get Matched</h4>
              <p className="text-gray-600">
                Our smart algorithm connects you with compatible learning partners based on your preferences.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Start Learning</h4>
              <p className="text-gray-600">
                Schedule sessions, exchange knowledge, and rate your experience to help others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for effective peer-to-peer learning in one platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Smart Matching Algorithm</h4>
                <p className="text-gray-600">
                  Get matched with compatible learning partners based on skills, schedule, and preferences.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Secure Messaging</h4>
                <p className="text-gray-600">
                  Communicate safely with built-in messaging and file sharing capabilities.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Session Scheduling</h4>
                <p className="text-gray-600">
                  Easy scheduling tools with calendar integration and reminder notifications.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Quality Assurance</h4>
                <p className="text-gray-600">Rating and feedback system to ensure high-quality learning experiences.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Progress Tracking</h4>
                <p className="text-gray-600">Monitor your learning journey and skill development over time.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Cross-Department Learning</h4>
                <p className="text-gray-600">
                  Connect with students from different departments for diverse learning opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of FUTO students already using Campus SkillXChange to enhance their education.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Create Your Account Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="font-bold">Campus SkillXChange</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering FUTO students through peer-to-peer learning and skill exchange.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Skills
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-white">
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="hover:text-white">
                    Community Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 Campus SkillXChange - FUTO Campus Skill Exchange Platform. Developed by James Nnaemeka Anthony
              (20201215642)
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
