"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateAdminCredentials, signAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!validateAdminCredentials(email, password)) {
    return { error: "E-posta veya şifre hatalı." };
  }

  const token = await signAdminToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  redirect("/admin/blog");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
