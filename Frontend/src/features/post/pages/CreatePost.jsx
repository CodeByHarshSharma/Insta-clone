import React from 'react'
import { useState, useRef } from 'react'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {
    
    const [caption, setCaption] = useState("")
    const postImageInputFieldRef = useRef(null)

    const navigate = useNavigate()

    const { loading, handleCreatePost} = usePost()

    async function handleSubmit(e){
        e.preventDefault()

        const file = postImageInputFieldRef.current.files[0]

        await handleCreatePost(file, caption)

        navigate('/')
    }

    if(loading){
        return(
            <main>
                <h1>Creating Post...</h1>
            </main>
        )
    }
  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="postImage">Select Image</label>
                <input hidden ref={postImageInputFieldRef} type="file" name="postImage" id="postImage" />
                <input value={caption} onChange={(e) => {setCaption(e.target.value)}}
                type="text" name="caption" id="caption" placeholder='Enter Caption' />
                <button className='button primary-button'>Create Post</button>
            </form>
        </div>
      
    </main>
  )
}

export default CreatePost
