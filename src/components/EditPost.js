import { useState } from 'react'
import editPostStyles from './EditPost.module.css'

const EditPost = ({addItem, addPostSetter, updateItem, titleItem, bodyItem, clearFields})=> {
  
  const [title, setTitle] = useState(titleItem?titleItem:'')
  const [body, setBody] = useState(bodyItem?bodyItem:'')

  const data = {
    userId:1,
    id:Math.random().toString(),
    title,
    body
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if (title==='' || body===''){
      return
    }

    if(titleItem){
      updateItem(data)
      addPostSetter()
      clearFields()
    }

    if(!titleItem){
      addItem(data)
      addPostSetter()
      clearFields()
    }
  }


  return (
    <div>
        <form onSubmit = {(e)=>handleSubmit(e)}>
            <div className={editPostStyles.formGroup}>
              <label for="title">Title</label>
              <input value={title} onChange = {({target:{value}})=>setTitle(value)} type="text" name='title' id="title"  />
            </div>
            <div className={editPostStyles.formGroup}>
              <label for="body">Body</label>
              <textarea value={body} onChange = {({target:{value}})=>setBody(value)} rows="7" name="body" id="description"></textarea>
            </div>
            <div className="actions">
                <button className={editPostStyles.submit} type="submit">{titleItem?'UPDATE POST':'ADD POST'}</button>
                <button className={editPostStyles.cancel} >CANCEL</button>
            </div>
        </form>
    </div>
  )
}

export default EditPost