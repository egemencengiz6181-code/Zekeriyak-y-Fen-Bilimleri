import { getCategories } from "@/lib/actions/blog";
import NewPostClient from "./NewPostClient";

export default async function NewPostPage() {
  const categories = await getCategories();
  return <NewPostClient categories={categories} />;
}
