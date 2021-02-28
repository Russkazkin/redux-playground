import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionTypes from '../../store/actions';

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
            storedResults,
            counter
        } = this.props;
        return (
            <div>
                <CounterOutput value={this.props.counter}/>
                <CounterControl label="Increment" clicked={onIncrementCounter}/>
                <CounterControl label="Decrement" clicked={onDecrementCounter}/>
                <CounterControl label="Add 5" clicked={onAddCounter}/>
                <CounterControl label="Subtract 5" clicked={onSubtractCounter}/>
                <hr/>
                <button onClick={() => onStoreResult(counter)}>Store Result</button>
                <ul>
                    {storedResults.map((result => <li key={result.id} onClick={() => onDeleteResult(result.id)}>{result.value}</li>))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counter.counter,
        storedResults: state.result.results,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: () => dispatch({type: actionTypes.ADD, value: 5}),
        onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, value: 5}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, id: id}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);