import * as schema from "@/db/schema"; // Giả sử bạn đã có schema định nghĩa ở nơi khác
// db/turso.ts
import { createClient as createLibsqlClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql"; // Sử dụng drizzle ORM cho SQLite

// Hàm tạo kết nối với cơ sở dữ liệu
const getDatabaseUrl = () => {
  return process.env.TURSO_DATABASE_URL!;
};

export const getDatabaseClient = async () => {
  const url = getDatabaseUrl();

  if (!url) {
    console.error("Database URL is missing");
    return null;
  }

  const client = createLibsqlClient({
    url,
    authToken: process.env.TURSO_API_TOKEN!,
  });

  return drizzle(client, { schema });
};

// Hàm lấy dữ liệu từ cơ sở dữ liệu
export const fetchWrites = async () => {
  const db = await getDatabaseClient();
  if (!db) {
    console.error("Failed to connect to database");
    return;
  }

  try {
    // Lấy dữ liệu từ bảng 'writes'
    const result = await db.select().from(schema.writes);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Turso:", error);
  }
};
