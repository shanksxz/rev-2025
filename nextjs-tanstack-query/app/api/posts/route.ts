import { db } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = db.posts.getAll();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = db.posts.create(body);
  return NextResponse.json(post, { status: 201 });
}