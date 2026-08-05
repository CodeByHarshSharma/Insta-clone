import React from 'react'
import { useState, useRef } from 'react'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {

    const [caption, setCaption] = useState("")
    const postImageInputFieldRef = useRef(null)
    const [fileName, setFileName] = useState("")

    const navigate = useNavigate()

    const { loading, handleCreatePost } = usePost()

    async function handleSubmit(e) {
        e.preventDefault()

        const file = postImageInputFieldRef.current.files[0]

        await handleCreatePost(file, caption)

        navigate('/')
    }

    if (loading) {
        return (
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
                    <input hidden ref={postImageInputFieldRef} type="file" name="postImage" id="postImage" accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                                setFileName(file.name)
                            }
                        }} />
                    {fileName && (<p className="selected-file"> {fileName} </p>)}
                    <input value={caption} type="text" name="caption" id="caption" placeholder="Enter Caption"
                        onChange={(e) => setCaption(e.target.value)} />
                    <button className="button primary-button"> Create Post </button>
                </form>
            </div>

        </main>
    )
}

export default CreatePost
