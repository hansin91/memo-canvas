import React, { useState, useEffect } from 'react'
import { EditorState } from 'draft-js'
import Konva from 'konva'
import html2canvas from 'html2canvas'
import { MemoCanvas, MemoForm } from '../../components'

function MemoContainer() {
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(600)
  const [image, setImage] = useState(null) as any
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const changeSize = (payload: any) => {
    const {type, value} = payload
    if (type === 'width') {
      setWidth(value)
    }
    if (type === 'height') {
      setHeight(value)
    }
  }

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
    const canvas = await html2canvas(document.querySelector('.DraftEditor-editorContainer') as any, {
      backgroundColor: 'rgba(0,0,0,0)',
    })
    const shape = renderShape(canvas, stage)
    layer.add(shape)
    layer.batchDraw();
  }

  const renderStage = () => {
    const stage = new Konva.Stage({
      container: 'container',
      width,
      height
    });
    return stage
  }

  const renderCanvas = async () => {
    const stage = renderStage()
    const layer = new Konva.Layer()
    stage.add(layer)
    if (image) {
      await drawImage(image, layer, stage)
    }
  }

  const drawImage = (imageFile: any, layer: Konva.Layer, stage: Konva.Stage) => {
    const URL = window.webkitURL || window.URL;
    const url = URL.createObjectURL(imageFile);
    const img = new window.Image()
    img.onload = async function() {
      const image = new Konva.Image({
        image: img,
        x: 0,
        y: 0,
        width,
        height
      });
      layer.add(image)
      layer.batchDraw()
      renderText(layer, stage)
    }
    img.setAttribute('crossorigin', 'anonymous');
    img.src = url
  }

  useEffect(() => {
    renderCanvas()
  }, [width, height, image])

  return (
    <div className="memo-container" style={{display: 'flex', marginTop: '50px'}}>
      <MemoCanvas
        width={width}
        height={height} />
      <MemoForm
        onSetImage={setImage}
        onChangeSize={changeSize}
        onSetEditorState={setEditorState}
        onSetUpdated={renderCanvas}
        editorState={editorState}
        width={width}
        height={height} />
    </div>
  )
}

export default MemoContainer