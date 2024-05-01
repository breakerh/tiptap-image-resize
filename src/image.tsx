import React, {Component, FC, ReactElement} from "react";
import {mergeAttributes, nodeInputRule, Node} from "@tiptap/core";
import {ReactNodeViewRenderer} from "@tiptap/react";
import ImageResizeComponent from "./component/ImageResizeComponent";
import Image from '@tiptap/extension-image'

export interface ImageOptions {
  inline: boolean,
  allowBase64: boolean,
  HTMLAttributes: Record<string, any>,
  resizeIcon: FC|Component|ReactElement,
  useFigure: boolean
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
  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
      resizeIcon: <>⊙</>,
      useFigure: false
    }
  },
  addAttributes() {
    return {
      ...this.parent?.(),
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
    };
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
