import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

const SelectedBlog = ({ blog, handleLikeClick, handleCommentSubmit, handleStateChange, newComment }) => {

    const titleStyle = {
        fontWeight: 'bold'
    }
    return (
        <div>
            <div id={blog._id}>
                <Grid>
                    <Row>
                        <Col md={1} style={titleStyle}>
                            Title
                        </Col>
                        <Col md={6} >
                            {blog.title}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1} style={titleStyle}>
                            Author
                        </Col>
                        <Col md={6} >
                            {blog.author}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                        </Col>
                        <Col md={6} >
                            {blog.url}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1} style={titleStyle}>
                            Added by
                        </Col>
                        <Col md={6} >
                            {blog.user.name}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {blog.likes} likes <button className='likeButton' id={blog._id} onClick={handleLikeClick}>Like</button><br/>
                        </Col>
                    </Row>
                </Grid>
            </div>
            <div>
                <h3>Comments</h3>
                {
                    blog.comments !== null ? blog.comments.map(comment => <li key={comment._id}> <a>{comment.content}</a> </li>):<div/>
                }
                <br/>
                <form onSubmit={(e) => handleCommentSubmit(blog._id, e)}>
                    <input type="text" name="newComment" value={newComment} onChange={handleStateChange}/><button type="submit">Add comment</button>
                </form>
            </div>
        </div>
    )
}
export default SelectedBlog