"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

// ── Categories ───────────────────────────────────────────────────────────────

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function createCategory(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  if (!name) return { error: "Kategori adı zorunlu." };

  const slug = slugify(name);

  try {
    await prisma.category.create({ data: { name, slug } });
    revalidatePath("/admin/blog");
    return { success: true };
  } catch {
    return { error: "Bu kategori zaten mevcut." };
  }
}

// ── Posts ────────────────────────────────────────────────────────────────────

export async function getPosts() {
  return prisma.post.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPost(id: number) {
  return prisma.post.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function createPost(formData: FormData) {
  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string) ?? "";
  const excerpt = (formData.get("excerpt") as string).trim();
  const coverImage = (formData.get("coverImage") as string).trim();
  const published = formData.get("published") === "true";
  const categoryIdRaw = formData.get("categoryId") as string;
  const categoryId = categoryIdRaw ? parseInt(categoryIdRaw) : null;

  if (!title) return { error: "Başlık zorunlu." };

  let slug = slugify(title);

  // Ensure unique slug
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        published,
        ...(categoryId ? { categoryId } : {}),
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/tr/blog");
    revalidatePath("/en/blog");

    redirect(`/admin/blog/${post.id}/edit`);
  } catch (err: unknown) {
    if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Yazı oluşturulurken hata oluştu." };
  }
}

export async function updatePost(id: number, formData: FormData) {
  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string) ?? "";
  const excerpt = (formData.get("excerpt") as string).trim();
  const coverImage = (formData.get("coverImage") as string).trim();
  const published = formData.get("published") === "true";
  const categoryIdRaw = formData.get("categoryId") as string;
  const categoryId = categoryIdRaw ? parseInt(categoryIdRaw) : null;

  if (!title) return { error: "Başlık zorunlu." };

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        excerpt,
        coverImage,
        published,
        categoryId: categoryId ?? null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/tr/blog");
    revalidatePath("/en/blog");

    return { success: true };
  } catch {
    return { error: "Yazı güncellenirken hata oluştu." };
  }
}

export async function deletePost(id: number) {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/blog");
    revalidatePath("/tr/blog");
    revalidatePath("/en/blog");
    redirect("/admin/blog");
  } catch (err: unknown) {
    if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Yazı silinirken hata oluştu." };
  }
}

export async function togglePublish(id: number, published: boolean) {
  await prisma.post.update({ where: { id }, data: { published: !published } });
  revalidatePath("/admin/blog");
  revalidatePath("/tr/blog");
  revalidatePath("/en/blog");
}
