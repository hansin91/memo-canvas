import  './styles.scss'
import React from 'react'

interface Props {
  width: number
  height: number
}

function MemoCanvas({width, height}: Props) {
  return(
    <div className="memo-canvas-container" style={{width, height}}>
       <div style={{width: '100%', height: '100%'}} id="stage-parent">
        <div style={{width: '100%', height: '100%'}} id="container"></div>
      </div>
    </div>
  )
}

export default MemoCanvas