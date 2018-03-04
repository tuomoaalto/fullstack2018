import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                loginVisible: '',
                blogs: [],
                newBlogTitle: '',
                newBlogAuthor: '',
                newBlogUrl: '',
                username: '',
                password: '',
                user: null,
                infoMsg: null,
                errMsg: null,
            }
    }

    async componentDidMount() {
        const blogs = await blogService.getAll()
        this.setState({ blogs })

        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          this.setState({user})
          blogService.setToken(user.token)
        }

    } 

    handleBlogClick = (event) => {
        const id = event.target.id
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        let blogs = this.state.blogs
        blogs.forEach((blog) =>{
            if (blog._id === id){
                if (blog.clicked === true){
                    blog.clicked = false
                } else {
                    blog.clicked = true
                }
            } else {
                blog.clicked = false
            }
        })
        this.setState({blogs})
    }

    handleStateChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleLikeClick = async (event) => {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        
        const blog = this.state.blogs.filter(blog => blog._id === event.target.id)[0]
        const blogObject = {
            _id: blog._id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes+1,
            user: blog.user
        }
        const likedBlog = await blogService.likeBlog(blogObject)
        const blogs = await blogService.getAllRetainClicked(likedBlog._id)
        this.setState({blogs})
    }

    handleDeleteClick = async (event) => {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        const doomedBlog = this.state.blogs.filter(blog => blog._id === event.target.id)[0]
        if (!window.confirm(`Really delete '${doomedBlog.title}' by '${doomedBlog.author}' ?`)) { 
            return
        }
        await blogService.deleteBlog(doomedBlog._id)
        const blogs = await blogService.getAll()
        this.setState({blogs})
    }

    login = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })
            this.setState({ username: '', password: '', user})
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
        } catch(exception) {
            this.setState({
                errMsg: 'Username or password erroneous.',
            })
            setTimeout(() => {
                this.setState({ errMsg: null })
            }, 5000)
        }
    }

    logout = () => {
        this.setState({ username: '', password: '', user: null})
        window.localStorage.setItem('loggedBlogAppUser', '')
    }

    postBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: this.state.newBlogTitle,
            author: this.state.newBlogAuthor,
            url: this.state.newBlogUrl
        }

        const newBlog = await blogService.postNewBlog(blogObject)
        this.setState({
            blogs: this.state.blogs.concat(newBlog),
            newBlogTitle: '',
            newBlogAuthor: '',
            newBlogUrl: '',
            infoMsg: `A new blog '${newBlog.title}' by '${newBlog.author}' added.`
        })
        setTimeout(() => {
            this.setState({ infoMsg: null })
        }, 5000)
    }

    render() {
        const loginForm = () => (
            <Togglable buttonLabel="Login">
                <LoginForm
                    visible={this.state.visible}
                    username={this.state.username}
                    password={this.state.password}
                    handleStateChange={this.handleStateChange}
                    handleSubmit={this.login}
                />
            </Togglable>
        )

        const blogForm = () => {
            return (
                <div>
                    <BlogForm
                        handleSubmit={this.postBlog}
                        handleStateChange={this.handleStateChange}
                        handleLogout={this.logout}
                        username={this.state.user.name}
                        title={this.state.newBlogTitle}
                        author={this.state.newBlogAuthor}
                        url={this.state.newBlogUrl}
                        blogs={this.state.blogs}
                        handleBlogClick={this.handleBlogClick}
                        handleLikeClick={this.handleLikeClick}
                        handleDeleteClick={this.handleDeleteClick}
                        terminator={this.state.user.username}
                    />
                </div>
            )
        }

        return (
            <div>
                <h2>Blogs</h2>
                <Notification message={this.state.infoMsg} type='info'/>
                <Notification message={this.state.errMsg} type='err'/>
                {this.state.user === null ? loginForm() : blogForm()}
            </div>
        );
    }

}

export default App;
