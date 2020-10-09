import  './styles.scss'
import React from 'react'
import parse from 'html-react-parser'

interface Props {
  width: number
  height: number
  content: any
}

function MemoCanvas({width, height, content}: Props) {
  return(
    <div id="memo-canvas" className="memo-canvas-container"
      style={{
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
        position: 'relative'
      }}>
       {/* <div style={{width: '100%', height: '100%'}} id="stage-parent">
        <div style={{width: '100%', height: '100%'}} id="container"></div>
      </div> */}
      <div className="img-wrapper">
        <img style={{width: '100%'}} id="img-output" />
      </div>
      <div className="memo-content">
        <div className="memo-content-wrapper">
          {parse(content)}
        </div>
      </div>
    </div>
  )
}

export default MemoCanvas