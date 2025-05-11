import { fetchWrites } from "@/db/turso"; // Hàm lấy dữ liệu từ Turso
import { auth } from "@clerk/nextjs/server"; // Đảm bảo người dùng đã xác thực
import md5 from "md5"; // Để tạo ID cơ sở dữ liệu cho người dùng
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth(); // Lấy userId từ Clerk

  if (!userId) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 },
    );
  }

  try {
    // Tạo tên cơ sở dữ liệu cho người dùng dựa trên userId (hoặc cách khác)
    const userDbName = md5(userId); // Ví dụ tạo tên db từ md5(userId)

    // Kết nối với Turso và lấy dữ liệu của người dùng
    const writes = await fetchWrites(userDbName);

    if (writes) {
      return NextResponse.json(writes); // Trả về dữ liệu viết
    }
    return NextResponse.json({ message: "No writes found" }, { status: 404 });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
