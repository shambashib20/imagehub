import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).lean();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "No Products found!" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Somehting went wrong!" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session?.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    await connectToDatabase();

    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Somehting went wrong!" },
      {
        status: 500,
      }
    );
  }
}
