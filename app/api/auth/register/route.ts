import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { hashPassword, generateToken } from "@/lib/auth"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    console.log("Registration API called")

    const body = await request.json()
    console.log("Request body received:", { ...body, password: "[REDACTED]" })

    const { firstName, lastName, email, password, studentId, department, academicLevel } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !studentId || !department || !academicLevel) {
      console.log("Validation failed: missing required fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate FUTO email
    if (!email.endsWith("@futo.edu.ng") && !email.endsWith("@student.futo.edu.ng")) {
      console.log("Email validation failed:", email)
      return NextResponse.json({ error: "Please use your FUTO email address" }, { status: 400 })
    }

    console.log("Connecting to MongoDB...")
    const client = await clientPromise
    console.log("MongoDB connected successfully")

    const db = client.db("campus-skill-exchange")
    const users = db.collection("users")

    // Check if user already exists
    console.log("Checking for existing user...")
    const existingUser = await users.findOne({
      $or: [{ email }, { studentId }],
    })

    if (existingUser) {
      console.log("User already exists")
      return NextResponse.json({ error: "User with this email or student ID already exists" }, { status: 400 })
    }

    // Hash password
    console.log("Hashing password...")
    const hashedPassword = await hashPassword(password)
    console.log("Password hashed successfully")

    // Create user
    console.log("Creating user in database...")
    const result = await users.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      studentId,
      department,
      academicLevel,
      skills: [],
      bio: "",
      profilePicture: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    })
    console.log("User created with ID:", result.insertedId)

    // Generate token
    console.log("Generating JWT token...")
    const token = generateToken(result.insertedId.toString())
    console.log("Token generated successfully")

    const response = NextResponse.json({
      message: "User created successfully",
      user: {
        id: result.insertedId,
        firstName,
        lastName,
        email,
        studentId,
        department,
        academicLevel,
      },
    })

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    console.log("Registration completed successfully")
    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : "") : undefined,
      },
      { status: 500 },
    )
  }
}
