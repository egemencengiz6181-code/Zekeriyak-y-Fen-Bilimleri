"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link2,
  ImageIcon,
  Undo,
  Redo,
  Minus,
} from "lucide-react";

interface TipTapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  name?: string;
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all ${
        active
          ? "bg-violet-600 text-white"
          : "text-white/50 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

export default function TipTapEditor({
  content = "",
  onChange,
  name = "content",
}: TipTapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ HTMLAttributes: { class: "rounded-xl max-w-full" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-violet-400 underline" } }),
      Placeholder.configure({ placeholder: "İçeriğinizi buraya yazın..." }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] focus:outline-none p-5 text-white/80 leading-relaxed",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      if (hiddenRef.current) hiddenRef.current.value = html;
      onChange?.(html);
    },
    immediatelyRender: false,
  });

  // Sync content when it changes externally
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  const handleImageUpload = useCallback(async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url && editor) {
      editor.chain().focus().setImage({ src: data.url }).run();
    }
  }, [editor]);

  const addImageByUrl = useCallback(() => {
    const url = prompt("Görsel URL'si girin:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = prompt("Bağlantı URL'si girin:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-white/10 bg-white/[0.03]">
        {/* History */}
        <ToolbarButton title="Geri Al" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Yinele" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Headings */}
        <ToolbarButton
          title="Başlık 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Başlık 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Başlık 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Text format */}
        <ToolbarButton
          title="Kalın"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="İtalik"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Bağlantı"
          active={editor.isActive("link")}
          onClick={addLink}
        >
          <Link2 className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Lists */}
        <ToolbarButton
          title="Madde Listesi"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Numaralı Liste"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Yatay Çizgi"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Image */}
        <ToolbarButton title="Görsel Ekle (URL)" onClick={addImageByUrl}>
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
        <button
          type="button"
          title="Görsel Yükle"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-violet-600/20 text-violet-400 hover:bg-violet-600/40 transition-all border border-violet-600/30"
        >
          Yükle
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />

      {/* Hidden input for form submission */}
      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        defaultValue={content}
      />
    </div>
  );
}
