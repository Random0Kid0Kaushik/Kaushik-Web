import { NextResponse } from "next/server"
import db from "@/_data/db.json"

export async function GET() {
  return NextResponse.json(db.projects)
}