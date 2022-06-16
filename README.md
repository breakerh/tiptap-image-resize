# @breakerh/tiptap-image-resize
[![Version](https://img.shields.io/github/package-json/v/breakerh/tiptap-image-resize)](https://github.com/breakerh/tiptap-image-resize)
[![License](https://img.shields.io/github/license/breakerh/tiptap-image-resize)](https://github.com/breakerh/tiptap-image-resize)

## Introduction
tiptap is a headless wrapper around [ProseMirror](https://ProseMirror.net) – a toolkit for building rich text WYSIWYG editors, which is already in use at many well-known companies such as *New York Times*, *The Guardian* or *Atlassian*.
I am not affiliated with TipTap in any way. I build this module for myself and thought maybe I can help other with it.. Please [let me know](https://github.com/breakerh/tiptap-image-resize/issues) if you experience any problems whatsoever!

## Installation
Install the package through NPM ( `` npm i tiptap-imagresize  `` ) or yarn ( `` yarn add tiptap-imagresize `` ), and don't forget to include it in the use editor explained [here](https://tiptap.dev/guide/configuration#nodes-marks-and-extensions).

### Configuration
While adding Image Resizer to your TipTap editor you can set a few options.

| Key            | Description                                     | Default | 
|----------------|-------------------------------------------------|---------|
| inline         | Is the image inline?                            | `false` |
| allowBase64    | Can you insert Base64 encoded images?           | `false` |
| HTMLAttributes | Do you want to add custom attributes?           | empty   |
| resizeIcon     | What type if resize icon would you want to see? | `⊙`     |
| useFigure      | Do you want to wrap your image in a figure tag? | `false` |

#### Example:
```js
const editor = useEditor({
        extensions: [
            StarterKit, ImageResize.configure({resizeIcon: <>ResizeMe</>})
        ],
        content: '<p>Hello World!</p><image-resizer src="https://example.com/image.jpg"></image-resizer>',
    })
```

## Styling
I didn't include any styling since a assume you have your reasons you will use TipTap instead of other editors.
Do you still want a quick result or just want some starter css?
Add this to your (s)css or convert it to react styles markup.
### Scss
```css
.image-resizer {
    display: inline-flex;
    position: relative;
    flex-grow: 0;
    .resize-trigger {
      position: absolute;
      right: -6px;
      bottom: -9px;
      opacity: 0;
      transition: opacity .3s ease;
      color: #3259a5;
    }
    &:hover .resize-trigger {
      opacity: 1;
    }
  }
```
### Css
```css
.image-resizer {
    display: inline-flex;
    position: relative;
    flex-grow: 0;
  }
.image-resizer .resize-trigger {
  position: absolute;
  right: -6px;
  bottom: -9px;
  opacity: 0;
  transition: opacity .3s ease;
  color: #3259a5;
}
.image-resizer:hover .resize-trigger {
  opacity: 1;
}
```

## Official Documentation
Documentation can be found on the [tiptap website](https://tiptap.dev).

## License
tiptap is open sourced software licensed under the [MIT license](https://github.com/ueberdosis/tiptap/blob/main/LICENSE.md).
