"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, Mail, GraduationCap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    department: "",
    academicLevel: "",
    bio: "",
    skills: [],
    interests: [],
    agreeToTerms: false,
  })

  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Business Administration",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Political Science",
  ]

  const skillCategories = [
    "Programming Languages",
    "Web Development",
    "Data Analysis",
    "Graphic Design",
    "Digital Marketing",
    "Languages",
    "Mathematics",
    "Writing",
    "Public Speaking",
    "Music",
    "Sports",
    "Photography",
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          studentId: formData.studentId,
          department: formData.department,
          academicLevel: formData.academicLevel,
          bio: formData.bio,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Registration successful! Welcome to Campus SkillXChange!")
        router.push("/dashboard")
      } else {
        setError(data.error || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h1 className="text-2xl font-bold">Campus SkillXChange Registration</h1>
          </div>
          <p className="text-gray-600">Join the FUTO peer learning community</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= num ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {num}
                </div>
                {num < 4 && <div className={`w-12 h-1 mx-2 ${step > num ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {step === 1 && (
                <>
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </>
              )}
              {step === 2 && (
                <>
                  <Mail className="h-5 w-5 mr-2" />
                  Account Details
                </>
              )}
              {step === 3 && (
                <>
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Academic Information
                </>
              )}
              {step === 4 && (
                <>
                  Skills and Interests
                </>
              )}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Let's start with your basic information"}
              {step === 2 && "Create your account credentials"}
              {step === 3 && "Tell us about your academic background"}
              {step === 4 && "What skills do you want to share or learn?"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      placeholder="e.g., 20201215642"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Account Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">FUTO Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.name@futo.edu.ng"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">Use your official FUTO email address</p>
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Create a strong password"
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Academic Information */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="academicLevel">Academic Level</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, academicLevel: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100 Level</SelectItem>
                        <SelectItem value="200">200 Level</SelectItem>
                        <SelectItem value="300">300 Level</SelectItem>
                        <SelectItem value="400">400 Level</SelectItem>
                        <SelectItem value="500">500 Level</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bio">Brief Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us a bit about yourself and your learning goals..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Skills & Interests */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Skills I can teach:</Label>
                    <p className="text-sm text-gray-500 mb-3">Select skills you're confident teaching others</p>
                    <div className="grid grid-cols-2 gap-2">
                      {skillCategories.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox id={`teach-${skill}`} />
                          <Label htmlFor={`teach-${skill}`} className="text-sm">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-base font-medium">Skills I want to learn:</Label>
                    <p className="text-sm text-gray-500 mb-3">Select skills you're interested in learning</p>
                    <div className="grid grid-cols-2 gap-2">
                      {skillCategories.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox id={`learn-${skill}`} />
                          <Label htmlFor={`learn-${skill}`} className="text-sm">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={step === 1}>
                  Previous
                </Button>
                {step < 4 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={!formData.agreeToTerms || loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
