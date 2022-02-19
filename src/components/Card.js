import cardStyles from './Card.module.css' 
import {useState, useEffect} from 'react'
import axios from 'axios'
import CardItem from './CardItem'
import EditPost from "./EditPost"
import Nav from './Nav'



function Card() {
    const [items, setItems] =useState([])
    const [addPost, setAddPost] = useState(false)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [id, setId] = useState('')



    const addItem = (_data)=>{
        axios.post('https://jsonplaceholder.typicode.com/posts', _data).then(({data})=>{
            setItems(prev=>{
                return [data, ...prev]
            })
        })
    }

    const addPostSetter = ()=>{
        setAddPost(false)
    }

    const deletePost = (id)=>{
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        setItems(prev=>{
            return prev.filter(item=>item.id !== id)
        })
    }

    const updatePost = (item)=>{
        setTitle(item.title)
        setBody(item.body)
        setId(item.id)
        setAddPost(true)
    }

    const updateItem = (_data)=>{
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, _data).then(({data})=>{
            setItems(prev=>{
                prev.filter(item=>item.id !== id)
                return prev.map(item=>{
                    if(item.id === id){
                        item.title = data.title
                        item.body = data.body
                    }
                    return item
                })
            })
        })
    }

    const clearFields = ()=>{
        setTitle('')
        setBody('')
    }

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5').then(({data})=>{
            setItems(data)
        })
          
    }, [])

    return (
        <>
        <Nav />
        <div className={cardStyles.cardCover}>
            <div className={cardStyles.card}>
                {
                    addPost
                    ?
                    <div>
                    <EditPost
                    clearFields = {clearFields}  
                    titleItem={title} 
                    bodyItem={body} 
                    addPostSetter={addPostSetter} 
                    addItem ={addItem} 
                    updateItem={updateItem}
                    />
                    </div>
                    :
                    <div>
                        <h2>POSTS</h2>
                        <button onClick={()=>setAddPost(true)} className={cardStyles.addPost}>ADD POST</button>
                        <CardItem updatePost={updatePost} deletePost={deletePost} items={items} />
                    </div>
                }
            </div>
        </div>
        </>
    )
}

export default Card