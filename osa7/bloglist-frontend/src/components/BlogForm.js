import React from 'react'
import Blog from './Blog'
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap'

const BlogForm = ({ handleSubmit, handleStateChange, title, author, url, blogs }) => {

    return (
        <div>
            Add new post:
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Row>
                        <Col md={1}>
                            Title
                        </Col>
                        <Col md={8} >
                            <input type="text" name="newBlogTitle" value={title} onChange={handleStateChange} size="50"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                            Author
                        </Col>
                        <Col md={8}>
                            <input type="text" name="newBlogAuthor" value={author} onChange={handleStateChange} size="50"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                            Url
                        </Col>
                        <Col md={8}>
                            <input type="text" name="newBlogUrl" value={url} onChange={handleStateChange} size="50"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <button type="submit">Post!</button>
                        </Col>
                    </Row>
                </Grid>
            </form>
            <br/>
            <ul>
                <ListGroup>
                    {
                        blogs.map(blog =>
                            <li key={blog._id}>
                                <ListGroupItem>
                                    <Blog key={blog._id} blog={blog}/>
                                </ListGroupItem>
                            </li>)
                    }
                </ListGroup>
            </ul>
        </div>
    )
}
export default BlogForm
