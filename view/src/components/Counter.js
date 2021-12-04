import React from 'react';

const CounterContext = React.createContext(0);

class CounterProvider extends React.Component {
    constructor(props) {
        super(props);        

        // assign interval, timeout, intervalCallback and timeoutCallback props to this
        ({
            interval: this.interval = 0,
            timeout: this.timeout = 0,
            intervalCallback: this.intervalCallback = () => {},
            timeoutCallback: this.timeoutCallback = () => {}
        } = props);

        this.handle = undefined;
        this.state = { time: this.timeout, timeDispatch: this.dispatch };
    }

    dispatch(action, ...args) {
        switch (action) {
            case 'start':
                // if handle exists ignore start
                if (this.handle) {
                    return;
                }

                this.handle = setInterval(function () {
                    if (this.state.time <= this.interval) {
                        clearInterval(this.handle);
                        this.timeoutCallback();
                        this.setState({ time: (this.state.time <= this.interval) ? 0 : this.state.time - this.interval });
                    }
                    else {
                        this.intervalCallback();
                        this.setState({ time: this.state.time - this.interval });
                    }
                }.bind(this), this.interval);
                break;
            case 'stop':
                clearInterval(this.handle);
                this.handle = undefined;
                this.setState({ time: this.timeout });
                break;
            case 'pause':
                clearInterval(this.handle);
                this.handle = undefined;
                break;
            case 'setInterval':
                this.interval = args[0];
                break;
            case 'setTimeout':
                this.timeout = args[0];
                break;
            case 'setTimeoutCallback':
                this.timeoutCallback = args[0];
                break;
            case 'setIntervalCallback':
                this.intervalCallback = args[0];
                break;
            case 'setTime':
                this.setState({ time: args[0] });
                break;
            case 'getTime':
                return this.state.time;
            default:
                return undefined;
        }
    }


    render() {
        return (
            <CounterContext.Provider value={{ time: this.state.time, timeDispatch: this.dispatch }}>
                {this.props.children}
            </CounterContext.Provider>
        );
    }
}

function useCounterContext() {
    return React.useContext(CounterContext);
}

function Counter({ time }) {
    return (
        <CounterContext.Consumer>
            {({time}) => <div id="time">{time}</div>}
        </CounterContext.Consumer>
    );
}

export { Counter , CounterProvider, useCounterContext };

