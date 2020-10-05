import  './styles.scss'
import React, { useEffect, useState } from 'react'
import Konva from 'konva'
import html2canvas from 'html2canvas'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

interface Props {
  updated: boolean
  onSetUpdated: Function
  width: number
  height: number
  image: any
  editorState: EditorState
}

function MemoCanvas({updated, onSetUpdated, editorState, width, height, image}: Props) {
  // const [layer, setLayer] = useState(new Konva.Layer())
  const renderStage = () => {
    const stage = new Konva.Stage({
      container: 'container',
      width,
      height
    });
    return stage
  }

  const getHtml = () => draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const renderShape = (canvas: any, stage: Konva.Stage) => {
    const shape = new Konva.Image({
      x: (stage.width() / 2),
      y: (stage.height() / 2) - 180,
      image: canvas,
      draggable: true,
      scaleX: 1 / window.devicePixelRatio,
      scaleY: 1 / window.devicePixelRatio,
    })
    shape.offsetX(shape.width() / 2)
    return shape
  }

  const renderText = async (layer: Konva.Layer, stage: Konva.Stage) => {
    // convert DOM into image
    const canvas = await html2canvas(document.querySelector('.public-DraftEditor-content') as any, {
      backgroundColor: 'rgba(0,0,0,0)',
    })
    // show it inside Konva.Image
    const shape = renderShape(canvas, stage)
    layer.add(shape)
    layer.batchDraw();
  }

  const drawImage = (imageFile: any, layer: Konva.Layer) => {
    const URL = window.webkitURL || window.URL;
    const url = URL.createObjectURL(imageFile);
    const img = new window.Image()
    img.onload = function() {
      const image = new Konva.Image({
        image: img,
        x: 0,
        y: 0,
        width,
        height
      });
      layer.add(image)
      layer.batchDraw()
    }
    img.setAttribute('crossorigin', 'anonymous');
    img.src = url
  }

  const renderCanvas = async () => {
    const stage = renderStage()
    const layer = new Konva.Layer()
    stage.add(layer)
    if (image) {
      await drawImage(image, layer)
    }
    await renderText(layer, stage)
    // onSetUpdated(false)
  }

  // useEffect(() => {
  //   console.log(updated)
  //   if (updated) {
  //     renderCanvas()
  //   }
  // },[updated])

  useEffect(() => {
     renderCanvas()
  }, [width, height, image, updated])

  return(
    <div className="memo-canvas-container" style={{width, height}}>
       <div style={{width: '100%', height: '100%'}} id="stage-parent">
        <div style={{width: '100%', height: '100%'}} id="container"></div>
      </div>
    </div>
  )
}

export default MemoCanvas