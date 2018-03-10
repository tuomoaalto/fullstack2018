import React from 'react'
import './App.css'
import dr from './images/dr.jpg'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap'

const notificationStyle = {
    color: "green",
    fontSize: 16,
    borderStyle: "solid",
    borderRadius: 15,
    padding: 5,
    marginBottom: 5
}

const menuStyle = {
    backgroundColor: "lightblue",
    fontSize: 16,
    borderStyle: "groove",
    marginBottom: 15    
}

const selectedLinkStyle = {
    color: "blue",
    backgroundColor: "tomato"
}

const imageStyle = {
    width: 250,
    height: 250
}

const Menu = () => (
    <div>
        <Grid style={menuStyle}>
            <Row>
                <Col md={6}>
                    <NavLink exact activeStyle={selectedLinkStyle} to="/">home</NavLink> &nbsp;
                    <NavLink exact activeStyle={selectedLinkStyle} to="/create">create new</NavLink> &nbsp;
                    <NavLink exact activeStyle={selectedLinkStyle} to="/about">about</NavLink>
                </Col>
                <Col md={6}>
                </Col>
            </Row>
        </Grid>
    </div>
)

const AnecdoteList = ({ anecdotes }) => {
    console.log('anecdotes: ', anecdotes)
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                <ListGroup>
                {
                    anecdotes.map(anecdote => 
                    <li key={anecdote.id}>
                        <ListGroupItem>
                            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                        </ListGroupItem>
                    </li>)
                }
                </ListGroup>
            </ul>
        </div>
    )
}

const Anecdote = ( {anecdote} ) => {
    console.log('anecdote.info: ', anecdote.info)
    return (
        <div>
            <h3>{anecdote.content} by {anecdote.author} </h3>
            <div>has {anecdote.votes} votes</div>
            <div>for more info, see <a href={anecdote.info}>{anecdote.info}</a></div>
        </div>
    )
}

const About = () => (
    <Grid>
        <Row>
            <Col xs={12} md={8}>
                <h2>About anecdote app</h2>
                <p>According to Wikipedia:</p>
    
                <em>An anecdote is a brief, revealing account of an individual person or an incident. 
                Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
                such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
                An anecdote is "a story with a point."</em>

                <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
            </Col>
            <Col xs={6} md={4}>
                <img src={dr} alt="Dennis Ritchie" style={imageStyle}/>
            </Col>
        </Row>
    </Grid>
)

const Footer = () => (
    <div>
        <br/>
        <Grid style={menuStyle}>
            <Row>
                <Col md={6}>
                    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
                </Col>
                <Col md={6}>
                    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
                </Col>
            </Row>
        </Grid>
    </div>
)

const Notification = (notification) => {
    if (notification.notificationText.length > 0){
        return(
            <div style={notificationStyle}>
                {notification.notificationText}
            </div>
        )
    } else {
        return (
            <div/>
        )
    }
}


class CreateNew extends React.Component {
    constructor() {
        super()
            this.state = {
            content: '',
            author: '',
            info: ''
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        console.log('props: ', this.props)
        e.preventDefault()
        this.props.addNew( {
            content: this.state.content,
            author: this.state.author,
            info: this.state.info,
            votes: 0
        } )
        this.props.history.push('/')
    }

    render() {
        return(
            <div>
                <h2>Create a new anecdote</h2>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <Grid>
                            <Row>
                                <Col md={2}>
                                    Content
                                </Col>
                                <Col md={8}>
                                    <input name='content' value={this.state.content} onChange={this.handleChange} size="50"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    Author
                                </Col>
                                <Col md={8}>
                                    <input name='author' value={this.state.author} onChange={this.handleChange} size="50"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    Url for more info
                                </Col>
                                <Col md={8}>
                                    <input name='info' value={this.state.info} onChange={this.handleChange} size="50"/>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={6}>
                                    <button>Create</button>
                                </Col>
                            </Row>
                        </Grid>
                    </form>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            anecdotes: [
                {
                    content: 'If it hurts, do it more often',
                    author: 'Jez Humble',
                    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
                    votes: 0,
                    id: '1'
                },
                {
                    content: 'Premature optimization is the root of all evil',
                    author: 'Donald Knuth',
                    info: 'http://wiki.c2.com/?PrematureOptimization',
                    votes: 0,
                    id: '2'
                }
            ],
            notification: ''
        } 
    }

    addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        this.setState({ 
            anecdotes: this.state.anecdotes.concat(anecdote),
            notification: `A new anecdote ${anecdote.content} has been added`
        })
        setTimeout(() => {
            this.setState({notification: ""})
        }, 10000)
    }

    anecdoteById = (id) =>
        this.state.anecdotes.find(a => a.id === id)

    vote = (id) => {
        const anecdote = this.anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

        this.setState({ anecdotes })
    }

    render() {
        return (
            <div className="container">
                <h1>Software anecdotes</h1>
                <Router>
                    <div>
                        <Menu />
                        <Notification notificationText={this.state.notification}/>
                        <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />   } />
                        <Route exact path="/anecdotes/:id" render={ ({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />}/>
                        
                        <Route path="/create" render={({history}) => <CreateNew history={ history } addNew={this.addNew} />   } />
                        <Route path="/about"  render={() => <About />       } />
                    </div>
                </Router>
                <Footer />
            </div>
        );
    }
}

export default App;
