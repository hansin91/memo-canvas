import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import Konva from 'konva'
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf';
import { MemoCanvas, MemoForm } from '../../components'

function MemoContainer() {
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(600)
  const [image, setImage] = useState(null) as any
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const getHtml =  () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  }

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
      y: (stage.height() / 2) - 150,
      image: canvas,
      stroke: 'red',
      scaleX: 1 / window.devicePixelRatio,
      scaleY: 1 / window.devicePixelRatio,
    })
    shape.offsetX(shape.width() / 2)
    return shape
  }

  const renderText = async (layer: Konva.Layer, stage: Konva.Stage) => {
    html2canvas(document.querySelector('.public-DraftEditor-content') as any, {
      backgroundColor: 'rgba(0,0,0,0)',
    }).then((canvas: any) => {
      console.log(canvas)
      const shape = renderShape(canvas, stage)
      layer.add(shape)
      layer.draw()
    });
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

  const converToPdf = () => {
   html2canvas(document.querySelector('#memo-canvas') as any, {
    logging: true,
    allowTaint: false,
    useCORS: true,
    y: 0,
    width,
    height: height + 100,
   }).then((canvas: any) => {
      const doc = new jsPdf('p', 'pt', [width, height])
      doc.addImage(
        canvas.toDataURL('image/png'),
        0,
        0,
        width,
        height
      )
      doc.save('memo')
    });
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

  const previewImage = (payload: any) => {
    const reader = new FileReader();
    reader.onload = function(){
      const output = document.getElementById('img-output') as any
      output.src = reader.result;
    };
    reader.readAsDataURL(payload);
  }

  // useEffect(() => {
  //   // renderCanvas()
  // }, [width, height, image])

  return (
    <div className="memo-container" style={{display: 'flex', marginTop: '50px'}}>
      <MemoCanvas
        width={width}
        height={height}
        content={getHtml()} />
      <MemoForm
        onSetImage={previewImage}
        onChangeSize={changeSize}
        onSetEditorState={setEditorState}
        onSetUpdated={converToPdf}
        editorState={editorState}
        width={width}
        height={height} />
    </div>
  )
}

export default MemoContainer