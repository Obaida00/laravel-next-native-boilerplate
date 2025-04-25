import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  // حذف التوكن من الكوكي
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // انتهاء صلاحية الكوكي مباشرة
    path: "/",
  });

  return response;
}
