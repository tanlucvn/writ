import CharacterCount from "@tiptap/extension-character-count";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import TiptapUnderline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

import SlashCommand from "@/components/editor/extensions/slash-command";
import iframe from "./iframe";

const extensions = [
  StarterKit.configure({
    heading: false,
  }),
  Heading.configure({ levels: [1, 2, 3, 4] }),
  TextStyle,
  TiptapUnderline,
  CharacterCount,
  SlashCommand,
  Highlight.configure({ multicolor: true }),
  Link.extend({
    inclusive: false,
  }).configure({
    linkOnPaste: true,
  }),
  iframe.configure({
    HTMLAttributes: {
      class: "w-full aspect-video mb-[1.33em]",
    },
  }),
  Placeholder.configure({
    placeholder: "Just write. Or type / for commands.",
  }),
];

export default extensions;
