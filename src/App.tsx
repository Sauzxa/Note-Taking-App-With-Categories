import { Container } from "react-bootstrap"
import { Routes , Route, Navigate  } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { NewNote } from "./NewNote";
import  useLocalStorage from './customeHooks/useLocalStorage'
import { useMemo } from "react";
import {v4 as uuidV4} from 'uuid'


// for each Note has a specific id and NoteData ta3ha
export type Note = {
  id : string
}& NoteData;

export  type NoteData ={
  title : string ,
  tags : Tag[] ,
  markdown : string

}
// for the localStorage to store the notes daiman f localStorage
export type RawNote = {
  id : string 
} & RawNoteData
// Notes li 3andhom same tag li rah yatbadal
export type RawNoteData = {
  title : string ,
  markdown : string,
  tagIds : string[] 
}
export type Tag = {
  id : string ,
  label : string
}
const App = () => {
  
  const [notes , setNotes] = useLocalStorage<RawNote[]>('Notes' , [])
  const [tags , setTags] = useLocalStorage<Tag[]>('TAGS' , [])
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])
  
  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }
  
  const createNote = ({tags, ...data} : NoteData) =>{
      setNotes(prevNotes =>{
        return [
          ...prevNotes ,{
            ...data, id: uuidV4(), tagIds : tags.map(tag => tag.id)
          }
        ]
      })
  }
  return (
   <Container className="my-4">
     <Routes>
      <Route path="/" element={<h1>Home Page</h1>}  />
     <Route path="new" element={<NewNote 
        onSubmit={createNote} 
        onAddTag={onAddTag} 
        availableTags={tags} 
      />} />
     <Route path="/:id" >
     <Route index element={<h1>show</h1>}  />
     <Route path="edit" element={<h1>edit</h1>}  />
     </Route>
      <Route path ='*' element={<Navigate to='/' />} />
    </Routes>
   </Container>
  )
}

export default App;
