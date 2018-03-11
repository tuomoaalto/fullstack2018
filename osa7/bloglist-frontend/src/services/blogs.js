import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data.map(blog => {
        let edBlog = blog
        edBlog.clicked = false
        return edBlog
    }).sort((a, b) => {return a.likes > b.likes ? -1:1} )
}

const getAllRetainClicked = async (id) => {
    const response = await axios.get(baseUrl)
    return response.data.map(blog => {
        let edBlog = blog
        if (edBlog._id === id){
            edBlog.clicked = true
        } else {
            edBlog.clicked = false
        }
        return edBlog
    }).sort((a, b) => {return a.likes > b.likes ? -1:1} )
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const postNewBlog = async (newBlog) => {
    const config = {
        headers: { 'Authorization': token }
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const likeBlog = async (likedBlog) => {
    const config = {
        headers: { 'Authorization': token }
    }
    const response = await axios.put(`${baseUrl}/${likedBlog._id}`, likedBlog, config)
    return response.data
}

const deleteBlog = async (deleteBlogId) => {
    const config = {
        headers: { 'Authorization': token }
    }
    const response = await axios.delete(`${baseUrl}/${deleteBlogId}`, config)
    return response.data
}

const postNewComment = async (blogId, newComment) => {
    const response = await axios.post(`${baseUrl}/${blogId}/comment`, newComment)
    return response.data
}

export default { getAll, getAllRetainClicked, setToken, postNewBlog, likeBlog, deleteBlog, postNewComment }