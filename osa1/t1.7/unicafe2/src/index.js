import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            yay: 0,
            meh: 0,
            boo: 0,
            numAnswers: 0,
            numPositive: 0,
            answersValue: 0

        }
    }

    render() {
        let keskiarvo = null
        let positiivisia = null
        if (this.state.numAnswers === 0){
            keskiarvo = <p>keskiarvo </p>
            positiivisia = <p>positiivisia</p>
        } else{
            keskiarvo = <p>keskiarvo {parseFloat(parseFloat(this.state.answersValue) / parseFloat(this.state.numAnswers)).toFixed(2)} </p>
            positiivisia = <p>positiivisia {parseFloat(parseFloat(this.state.numPositive) / parseFloat(this.state.numAnswers)*100).toFixed(2)} %</p>
        }
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
                {keskiarvo}
                {positiivisia}
            </div>
        )
    }
    clickYay = () => {
        this.setState({
          yay: this.state.yay + 1,
          answersValue: this.state.answersValue + 1,
          numAnswers: this.state.numAnswers + 1,
          numPositive: this.state.numPositive + 1
        })
    }
    
    clickMeh = () => {
        this.setState({
          meh: this.state.meh + 1,
          numAnswers: this.state.numAnswers + 1

        })
    }
    
    clickBoo = () => {
        this.setState({
          boo: this.state.boo + 1,
          answersValue: this.state.answersValue - 1,
          numAnswers: this.state.numAnswers + 1
        })
    }
    


}


ReactDOM.render(<App />, document.getElementById('root'));
