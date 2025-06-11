import {
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  PilcrowIcon,
  QuoteIcon,
  SquareCheckIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export type CommandItemProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: ReactNode;
};

export const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    /* {
      id: "ai-complete",
      title: "Continue writing",
      category: "AI",
      description: "Use AI to expand your thoughts",
      searchTerms: ["gpt", "ai"],
      icon: <WandIcon />,
    }, */
    {
      id: "paragraph",
      title: "Paragraph",
      category: "Base",
      description: "Start a new paragraph",
      searchTerms: ["text", "paragraph", "normal"],
      icon: <PilcrowIcon size={15} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode("paragraph").run();
      },
    },
    {
      id: "heading1",
      title: "Heading 1",
      category: "Base",
      description: "Large section heading",
      searchTerms: ["base", "heading", "large", "h1", "#"],
      icon: <Heading1Icon size={15} strokeWidth={1} absoluteStrokeWidth />,
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      id: "heading2",
      title: "Heading 2",
      category: "Base",
      description: "Medium section heading",
      searchTerms: ["base", "heading", "medium", "h2", "##"],
      icon: <Heading2Icon size={15} strokeWidth={1} absoluteStrokeWidth />,
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      id: "heading3",
      title: "Heading 3",
      category: "Base",
      description: "Small section heading",
      searchTerms: ["base", "heading", "small", "h3", "###"],
      icon: <Heading3Icon size={15} />,
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },

    {
      id: "bullet-list",
      title: "Bullet List",
      category: "Base",
      description: "Create a simple bullet list",
      searchTerms: ["Base", "unordered", "point"],
      icon: <ListIcon />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      id: "blockquote",
      title: "Blockquote",
      category: "Base",
      description: "Capture a quote",
      searchTerms: ["blockquote"],
      icon: <QuoteIcon />,
      command: ({ editor, range }: any) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
    },
    {
      id: "codeblock",
      title: "Codeblock",
      category: "Base",
      description: "Create a code snippet",
      searchTerms: ["base", "code", "codeblock"],
      icon: <CodeIcon />,
      command: ({ editor, range }: any) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      id: "task-list",
      title: "To-do List",
      category: "Base",
      description: "Track tasks and to-dos",
      searchTerms: ["todo", "task", "list"],
      icon: <SquareCheckIcon />,
      command: ({ editor, range }: any) =>
        editor.chain().focus().deleteRange(range).toggleTaskList().run(),
    },
  ].filter((item) => {
    if (typeof query === "string" && query.length > 0) {
      const search = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        (item.searchTerms &&
          item.searchTerms.some((term: string) => term.includes(search)))
      );
    }
    return true;
  });
};
