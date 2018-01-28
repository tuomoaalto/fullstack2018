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
        return(
            <div>
                <h2>anna palautetta</h2>
                <Button buttonFunction={this.clickYay} buttonCaption='hyvä'/>                
                <Button buttonFunction={this.clickMeh} buttonCaption='neutraali'/>                
                <Button buttonFunction={this.clickBoo} buttonCaption='huono'/>
                <Statistics yay={this.state.yay} meh={this.state.meh} boo={this.state.boo} numAnswers={this.state.numAnswers} 
                numPositive={this.state.numPositive} answersValue={this.state.answersValue}/>
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

const Button = (props) => {
    return(
        <div>
            <button onClick={props.buttonFunction}>{props.buttonCaption}</button>
        </div>
    )
}

const Statistics = (props) => {
    return(
        <div>
                <h2>statistiikkaa</h2>
                <Statistic caption='hyvä' type='normal' value1={props.yay}/>
                <Statistic caption='neutraali' type='normal' value1={props.meh}/>
                <Statistic caption='huono' type='normal' value1 = {props.boo}/>
                <Statistic caption='keskiarvo' type='complicated' value1 = {props.answersValue} value2={props.numAnswers}/>
                <Statistic caption='positiivisia' type='percentage' value1 = {props.numPositive} value2={props.numAnswers}/>
        </div>
    )
}

const Statistic = (props) => {
    let output = null;
    if (props.type === 'normal'){
        output = <p>{props.caption} {props.value1}</p>  
    }
    else if (props.type === 'complicated' || props.type === 'percentage'){
        if (props.value2 === 0) {
            output = <p>{props.caption}</p>
        } else {
            if (props.type === 'complicated')
                output = <p>{props.caption} {parseFloat(parseFloat(props.value1) / parseFloat(props.value2)).toFixed(2)}</p>
            else if (props.type === 'percentage')
                output = <p>{props.caption} {parseFloat(parseFloat(props.value1) / parseFloat(props.value2)*100).toFixed(2)}%</p>
        }
    }
    return(
        <div>
            {output}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
