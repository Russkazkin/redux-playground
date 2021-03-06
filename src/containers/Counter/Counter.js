import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../store/actions/actions';

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
                <CounterControl label="Add 5" clicked={() => onAddCounter(5)}/>
                <CounterControl label="Subtract 5" clicked={() => onSubtractCounter(5)}/>
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
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: (value) => dispatch(actionCreators.add(value)),
        onSubtractCounter: (value) => dispatch(actionCreators.subtract(value)),
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);