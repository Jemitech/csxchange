import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("campus-skill-exchange")
    const skills = db.collection("skills")

    // Find skill by ID or name
    let skill
    if (ObjectId.isValid(params.id)) {
      skill = await skills.findOne({ _id: new ObjectId(params.id) })
    } else {
      // If not a valid ObjectId, search by name (URL-friendly)
      const skillName = params.id.replace(/-/g, " ")
      skill = await skills.findOne({
        name: { $regex: new RegExp(skillName, "i") },
      })
    }

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    return NextResponse.json(skill)
  } catch (error) {
    console.error("Skill fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
