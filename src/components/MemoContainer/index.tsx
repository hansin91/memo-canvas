import React, { useState } from 'react'
import { EditorState } from 'draft-js';

import { MemoCanvas, MemoForm } from '../../components'

function MemoContainer() {
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(600)
  const [image, setImage] = useState(null) as any
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [updated, setUpdated] = useState(false)

  const changeSize = (payload: any) => {
    const {type, value} = payload
    if (type === 'width') {
      setWidth(value)
    }
    if (type === 'height') {
      setHeight(value)
    }
  }

  const onUpdateContent = (payload: any) => {
    
  }

  return (
    <div className="memo-container" style={{display: 'flex', marginTop: '50px'}}>
      <MemoCanvas
        updated={updated}
        onSetUpdated={setUpdated}
        editorState={editorState}
        image={image}
        width={width}
        height={height} />
      <MemoForm
        onSetImage={setImage}
        onChangeSize={changeSize}
        onSetEditorState={setEditorState}
        onSetUpdated={onUpdateContent}
        editorState={editorState}
        width={width}
        height={height} />
    </div>
  )
}

export default MemoContainer