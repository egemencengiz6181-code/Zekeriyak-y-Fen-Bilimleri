import { notFound } from "next/navigation";
import { getPost, getCategories } from "@/lib/actions/blog";
import EditPostClient from "./EditPostClient";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    getPost(parseInt(id)),
    getCategories(),
  ]);

  if (!post) notFound();

  return <EditPostClient post={post} categories={categories} />;
}
