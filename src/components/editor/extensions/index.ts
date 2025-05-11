import CharacterCount from "@tiptap/extension-character-count";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextStyle from "@tiptap/extension-text-style";
import TiptapUnderline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { ColorClass } from "./color-class";

import SlashCommand from "@/components/editor/extensions/slash-command";
import iframe from "./iframe";

const extensions = [
  StarterKit.configure({
    heading: false,
  }),
  Heading.configure({ levels: [1, 2, 3] }),
  TextStyle,
  ColorClass,
  TiptapUnderline,
  CharacterCount,
  SlashCommand,
  TaskList,
  TaskItem,
  Highlight,
  Link.extend({
    inclusive: false,
  }).configure({
    linkOnPaste: true,
    HTMLAttributes: {
      class:
        "text-primary underline underline-offset-[3px] hover:text-opacity-70 transition-colors cursor-pointer",
    },
  }),
  iframe.configure({
    HTMLAttributes: {
      class: "w-full aspect-video mb-[1.33em]",
    },
  }),
  Placeholder.configure({
    placeholder: "Type / for commands or start writing...",
    includeChildren: true,
  }),
];

export default extensions;
