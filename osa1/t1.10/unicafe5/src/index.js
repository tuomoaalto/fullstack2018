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
                <Button buttonFunction={this.updateStateValue('yay', this.state.yay+1)} buttonCaption='hyvä'/>
                <Button buttonFunction={this.updateStateValue('meh', this.state.meh+1)} buttonCaption='neutraali'/>
                <Button buttonFunction={this.updateStateValue('boo', this.state.boo+1)} buttonCaption='huono'/>
                <Statistics yay={this.state.yay} meh={this.state.meh} boo={this.state.boo} />
            </div>
        )
    }

    updateStateValue = (stateToChange, value) => {
        return () =>{
            this.setState({[stateToChange]: value})
        }
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
    let numAnswers = parseInt(props.yay, 10) + parseInt(props.meh, 10) + parseInt(props.boo, 10)
    let numPositive = parseInt(props.yay, 10)
    let answersValue = parseInt(props.yay, 10) + (-1 * parseInt(props.boo, 10))
    console.log('numAnswers:   ' + numAnswers)
    console.log('numPositive:  ' + numPositive)
    console.log('answersValue: ' + answersValue)
    if (numAnswers === 0){
        return (
            <div>
                <h2>statistiikkaa</h2>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    } else {
        return(
            <div>
                    <h2>statistiikkaa</h2>
                    <Statistic caption='hyvä' type='normal' value1={props.yay}/>
                    <Statistic caption='neutraali' type='normal' value1={props.meh}/>
                    <Statistic caption='huono' type='normal' value1 = {props.boo}/>
                    <Statistic caption='keskiarvo' type='complicated' value1 = {answersValue} value2={numAnswers}/>
                    <Statistic caption='positiivisia' type='percentage' value1 = {numPositive} value2={numAnswers}/>
            </div>
        )
    }
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
