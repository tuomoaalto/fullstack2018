import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            yay: 0,
            meh: 0,
            boo: 0
        }
    }

    render() {
        return(
            <div>
                <h2>anna palautetta</h2>
                <button name="yay" onClick={this.clickYay}>hyvä</button>
                <button name="meh" onClick={this.clickMeh}>neutraali</button>
                <button name="boo" onClick={this.clickBoo}>huono</button>
                <h2>statistiikkaa</h2>
                <p>hyvä {this.state.yay}</p>
                <p>neutraali {this.state.meh}</p>
                <p>huono {this.state.boo}</p>
            </div>
        )
    }
    clickYay = () => {
        this.setState({
          yay: this.state.yay + 1
        })
    }
    
    clickMeh = () => {
        this.setState({
          meh: this.state.meh + 1
        })
    }
    
    clickBoo = () => {
        this.setState({
          boo: this.state.boo + 1
        })
    }
    


}


ReactDOM.render(<App />, document.getElementById('root'));
