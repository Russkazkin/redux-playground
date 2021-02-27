import React, {Component} from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    };
    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => {
                    return {counter: prevState.counter + 1}
                })
                break;
            case 'dec':
                this.setState((prevState) => {
                    return {counter: prevState.counter - 1}
                })
                break;
            case 'add':
                this.setState((prevState) => {
                    return {counter: prevState.counter + value}
                })
                break;
            case 'sub':
                this.setState((prevState) => {
                    return {counter: prevState.counter - value}
                })
                break;
        }
    }

    render() {
        const {
            onIncrementCounter,
            onDecrementCounter,
            onAddCounter,
            onSubtractCounter,
            onStoreResult,
            onDeleteResult,
            storedResults
        } = this.props;
        return (
            <div>
                <CounterOutput value={this.props.counter}/>
                <CounterControl label="Increment" clicked={onIncrementCounter}/>
                <CounterControl label="Decrement" clicked={onDecrementCounter}/>
                <CounterControl label="Add 5" clicked={onAddCounter}/>
                <CounterControl label="Subtract 5" clicked={onSubtractCounter}/>
                <hr/>
                <button onClick={onStoreResult}>Store Result</button>
                <ul>
                    {storedResults.map((result => <li key={result.id} onClick={() => onDeleteResult(result.id)}>{result.value}</li>))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counter,
        storedResults: state.results,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: () => dispatch({type: 'ADD', value: 5}),
        onSubtractCounter: () => dispatch({type: 'SUBTRACT', value: 5}),
        onStoreResult: () => dispatch({type: 'STORE_RESULT'}),
        onDeleteResult: (id) => dispatch({type: 'DELETE_RESULT', id: id}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);