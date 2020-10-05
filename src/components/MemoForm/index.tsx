import './styles.scss'
import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js';

interface Props {
  width: number
  height: number
  onChangeSize: Function
  onSetImage: any
  onSetEditorState: any
  onSetUpdated: Function
  editorState: EditorState
}

function MemoForm({width, height, editorState, onChangeSize, onSetImage, onSetUpdated, onSetEditorState}: Props) {

  const handleInputContent = (e: any) => {
    onSetEditorState(e)
  }

  const handleInputWidth = (e: any) => {
    onChangeSize({
      type: 'width',
      value: Number(e.target.value)
    })
  }

  const handleInputHeight = (e: any) => {
    onChangeSize({
      type: 'height',
      value: Number(e.target.value)
    })
  }

  const handleFile = (e: any) => {
    e.persist()
    onSetImage(e.target.files[0])
  }

  const updateContent = (e: any) => {
    e.preventDefault()
    onSetUpdated(true)
  }

  return (
    <div className="memo-form">
      <Form onSubmit={updateContent}>
        <Form.Group controlId="formBasicWidth">
          <Form.Label>Width</Form.Label>
          <Form.Control onChange={handleInputWidth} min="300" defaultValue={width} type="number" placeholder="Enter width" />
        </Form.Group>
        <Form.Group controlId="formBasicHeight">
          <Form.Label>Height</Form.Label>
          <Form.Control onChange={handleInputHeight} min="300" defaultValue={height} type="number" placeholder="Enter height" />
        </Form.Group>
        <Form.Group controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control onChange={handleFile} type="file" />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Content</Form.Label>
          <div style={{maxWidth: `${width - 30}px`}}>
            {editorState &&
              <Editor
              wrapperClassName="rich-editor demo-wrapper"
              editorClassName="demo-editor"
              editorState={editorState}
              onEditorStateChange={handleInputContent} />
            }
          </div>
        </Form.Group>
        <Button type="submit" variant="primary">Update content</Button>
      </Form>
    </div>
  )
}

export default MemoForm