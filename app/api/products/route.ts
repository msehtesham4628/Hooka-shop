import {products} from "@/lib/catalog";import {NextResponse} from "next/server";export async function GET(){return NextResponse.json({products});}
