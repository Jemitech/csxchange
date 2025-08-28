import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"

// Sample skills data
const sampleSkills = [
  {
    name: "Python Programming",
    category: "Computer Science",
    description:
      "Learn Python programming from basics to advanced concepts including data structures, algorithms, and web development.",
    difficulty: "Beginner to Advanced",
    learners: 45,
    teachers: 12,
    tags: ["programming", "python", "coding", "software development"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Data Analysis",
    category: "Statistics",
    description:
      "Master data analysis techniques using Excel, Python pandas, and statistical methods for research and business insights.",
    difficulty: "Intermediate",
    learners: 32,
    teachers: 8,
    tags: ["data", "statistics", "excel", "python", "research"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "French Language",
    category: "Languages",
    description:
      "Learn French from beginner to conversational level with focus on grammar, vocabulary, and pronunciation.",
    difficulty: "Beginner to Intermediate",
    learners: 28,
    teachers: 15,
    tags: ["french", "language", "conversation", "grammar"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Digital Marketing",
    category: "Business",
    description:
      "Understand digital marketing strategies including social media marketing, SEO, content marketing, and analytics.",
    difficulty: "Beginner to Intermediate",
    learners: 38,
    teachers: 10,
    tags: ["marketing", "digital", "social media", "seo", "business"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Graphic Design",
    category: "Creative Arts",
    description:
      "Learn graphic design principles and tools like Photoshop, Illustrator, and Canva for creating stunning visuals.",
    difficulty: "Beginner to Advanced",
    learners: 41,
    teachers: 14,
    tags: ["design", "graphics", "photoshop", "illustrator", "creative"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Public Speaking",
    category: "Communication",
    description:
      "Develop confidence and skills in public speaking, presentation delivery, and effective communication.",
    difficulty: "Beginner to Intermediate",
    learners: 29,
    teachers: 9,
    tags: ["speaking", "presentation", "communication", "confidence"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("campus-skill-exchange")
    const skills = db.collection("skills")

    // Check if skills collection is empty and seed it
    const count = await skills.countDocuments()
    if (count === 0) {
      await skills.insertMany(sampleSkills)
    }

    const allSkills = await skills.find({}).toArray()
    return NextResponse.json(allSkills)
  } catch (error) {
    console.error("Skills fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
