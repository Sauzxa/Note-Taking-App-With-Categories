import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import { NoteData , Tag } from "./App"


type NoteFormProps = {
    onSubmit: (Data : NoteData) => void
}
export const NoteForm = ({onSubmit} : NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags , setSelectedTags] = useState<Tag[]>([])

    // function to remove submit event
    const HandleSubmit =(e : FormEvent)=>{
        e.preventDefault()
     // build in function with Form bootstrap tag
        onSubmit({
          title : titleRef.current!.value,
          markdown : markdownRef.current!.value,
          tags :[]
        })

        
    }
  return (
 
  <Form onSubmit={HandleSubmit} className="mt-4">
    <Stack gap={4}>
      <Row>
        <Col >
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control ref={titleRef} required /> 
          </Form.Group>
        </Col>
        <Col >
          <Form.Group controlId="tags">
            <Form.Label>Tags</Form.Label>
            <CreatableSelect
            value={selectedTags.map(tag => {
              return { label: tag.label, value: tag.id }
            })} 
            // onchange tji m3a lform
            onChange={tags => {
              setSelectedTags(
                tags.map(tag => {
                  return { label: tag.label, id: tag.value }
                })
              )
            }}

             
            isMulti/>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="markdonw">
            <Form.Label>Body</Form.Label>
            <Form.Control ref={markdownRef} required as='textarea' /> 
          </Form.Group>
          <Stack gap={2} className="d-flex justify-content-end" direction="horizontal">
                <Button variant="primary" type="submit">Save</Button>
                <Link to="..">
                <Button variant="outline-secondary" type="reset">Cancel</Button>
                </Link>
          </Stack>
    </Stack>




  </Form>
  
  

  )
}

export default NoteForm
