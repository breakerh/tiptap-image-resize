import {mergeAttributes, nodeInputRule, Node} from "@tiptap/core";
import {ReactNodeViewRenderer} from "@tiptap/react";
import ImageResizeComponent from "./component/ImageResizeComponent";
import Image from '@tiptap/extension-image'

export interface ImageOptions {
  inline: boolean,
  allowBase64: boolean,
  HTMLAttributes: Record<string, any>,
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageResize: {
      setImage: (options: { src: string, alt?: string, title?: string, width?: string|number, height?: string|number, isDraggable?: boolean }) => ReturnType,
    }
  }
}
export const inputRegex = /(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/
export const ImageResize = Image.extend<ImageOptions>({
  name: "imageResize",
  addAttributes() {
    return {
      width: {
        default: '100%',
        renderHTML: (attributes) => {
          return {
            width: attributes.width
          };
        }
      },
      height: {
        default: 'auto',
        renderHTML: (attributes) => {
          return {
            height: attributes.height
          };
        }
      },
      isDraggable: {
        default: true,
        renderHTML: (attributes) => {
          return {};
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: 'image-resizer',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['image-resizer', mergeAttributes(this.options.HTMLAttributes,HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageResizeComponent)
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          const [,, alt, src, title, height, width, isDraggable] = match
          return { src, alt, title, height, width, isDraggable }
        },
      }),
    ]
  },
})
