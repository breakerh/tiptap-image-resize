/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default (props:any) => {
    const handler = (mouseDownEvent: React.MouseEvent<HTMLImageElement>) => {
        const parent = (mouseDownEvent.target as HTMLElement).closest('.image-resizer')
        const image = parent?.querySelector('img.postimage') ?? null
        if(image===null)
            return
        const startSize = { x: image.clientWidth, y: image.clientHeight }
        const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY }

        function onMouseMove(mouseMoveEvent:MouseEvent) {
            props.updateAttributes({
                width: startSize.x - startPosition.x + mouseMoveEvent.pageX,
                height: startSize.y - startPosition.y + mouseMoveEvent.pageY
            })
        }
        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
        }

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };
    return (
        <NodeViewWrapper className="image-resizer">
            <img {...props.node.attrs} className='postimage' />
            {/*
                @ts-ignore */}
            <div className='resize-trigger' onMouseDown={handler}>
                {/*
                @ts-ignore */}
                <FontAwesomeIcon icon="fa-solid fa-circle-dot" />
            </div>
        </NodeViewWrapper>
    )
}