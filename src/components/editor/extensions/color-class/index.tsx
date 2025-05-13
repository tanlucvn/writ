import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType = any> {
    colorClass: {
      setColorClass: (className: string) => ReturnType;
      unsetColorClass: () => ReturnType;
    };
  }
}

export const ColorClass = Mark.create({
  name: "colorClass",

  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (!attributes.class) return {};
          return {
            class: attributes.class,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[class]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setColorClass:
        (className) =>
        ({ commands }) => {
          return commands.setMark(this.name, { class: className });
        },
      unsetColorClass:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
