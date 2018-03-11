import React from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import Togglable from './components/Togglable'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import LoggedInUser from './components/LoggedInUser'
import SelectedUser from './components/SelectedUser'
import SelectedBlog from './components/SelectedBlog'
import { menuStyle, selectedLinkStyle } from './styles'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginVisible: '',
            blogs: [],
            newBlogTitle: '',
            newBlogAuthor: '',
            newBlogUrl: '',
            newComment: '',
            username: '',
            password: '',
            user: null,
            users: [],
            infoMsg: null,
            errMsg: null,
        }
    }

    async componentDidMount() {
        const blogs = await blogService.getAll()
        const users = await userService.getAll()
        this.setState({ blogs })
        this.setState({ users })

        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({ user })
            blogService.setToken(user.token)
        }
    }

    handleBlogClick = (event) => {
        const id = event.target.id
        event.cancelBubble = true
        if (event.stopPropagation) event.stopPropagation()
        let blogs = this.state.blogs
        blogs.forEach((blog) => {
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
        this.setState({ blogs })
    }

    handleStateChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleLikeClick = async (event) => {
        event.cancelBubble = true
        if (event.stopPropagation) event.stopPropagation()

        const blog = this.state.blogs.filter(blog => blog._id === event.target.id)[0]
        const blogObject = {
            _id: blog._id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes+1,
            user: blog.user,
            comments: blog.comments,
            __v: blog.__v
        }
        await blogService.likeBlog(blogObject)
        const blogs = await blogService.getAll()
        this.setState({ blogs })
    }

    handleDeleteClick = async (event) => {
        event.preventDefault()
        event.cancelBubble = true
        if (event.stopPropagation) event.stopPropagation()
        const doomedBlog = this.state.blogs.filter(blog => blog._id === event.target.id)[0]
        if (!window.confirm(`Really delete '${doomedBlog.title}' by '${doomedBlog.author}' ?`)) {
            return
        }
        await blogService.deleteBlog(doomedBlog._id)
        const blogs = await blogService.getAll()
        this.setState({ blogs })
    }

    login = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })
            this.setState({ username: '', password: '', user })
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
        this.setState({ username: '', password: '', user: null })
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

    postComment = async (id, event) => {
        event.preventDefault()
        const commentObject = {
            content: this.state.newComment,
            blog: id
        }
        await blogService.postNewComment(id, commentObject)
        const newBlogs = await blogService.getAll()
        this.setState({
            blogs: newBlogs,
            newComment: ''
        })
    }

    userById = (id) => {
        return this.state.users.find(u => u._id === id)
    }

    blogById = (id) => {
        return this.state.blogs.find(b => b._id === id)
    }

    render() {
        const menu = () => (
            <div>
                <Grid style={menuStyle}>
                    <Row>
                        <Col md={12}>
                            <NavLink exact activeStyle={selectedLinkStyle} to="/">blogs</NavLink> &nbsp;
                            <NavLink exact activeStyle={selectedLinkStyle} to="/users">users</NavLink> &nbsp;
                            {this.state.user === null ? null: loggedInUser()}
                        </Col>
                        <Col md={4}>
                        </Col>
                    </Row>
                </Grid>
                <br/>
            </div>
        )

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

        const loggedInUser = () => {
            return (
                <LoggedInUser
                    username={this.state.user.name}
                    handleLogout={this.logout}
                />
            )
        }

        const blogForm = () => {
            return (
                <div>
                    <BlogForm
                        handleSubmit={this.postBlog}
                        handleStateChange={this.handleStateChange}
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

        const selectedBlog = ({ match }) => {
            return (
                <SelectedBlog
                    blog={this.blogById(match.params.id)}
                    handleLikeClick={this.handleLikeClick}
                    handleCommentSubmit={this.postComment}
                    handleStateChange={this.handleStateChange}
                    newComment={this.state.newComment}
                    handleDeleteClick={this.handleDeleteClick}
                    terminator={this.state.user.username}
                />
            )
        }

        return (
            <div className='container'>
                <h2>Blogs</h2>
                <Router>
                    <div>
                        {menu()}
                        <Notification message={this.state.infoMsg} type='info'/>
                        <Notification message={this.state.errMsg} type='err'/>
                        <Route exact path="/"          render={()        => this.state.user === null ? loginForm() : blogForm()} />
                        <Route exact path="/users"     render={()        => <UserList users={this.state.users} />}/>
                        <Route exact path="/users/:id" render={({ match }) => <SelectedUser user={this.userById(match.params.id)}/>}/>
                        <Route exact path="/blogs/:id" render={({ match }) => selectedBlog({ match })}/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App