import React from 'react';

const IS_STARTED = "isStarted";
const IS_STOPPED = "isStopped";
const IS_PAUSED = "isPaused";

const START_TIME = "startTime";
const PAUSE_TIME = "pauseTime";
const STOP_TIME = "stopTime";
const SET_INTERVAL_CALLBACK = "setIntervalCallback";
const SET_TIMEOUT_CALLBACK = "setTimeoutCallback";
const SET_TIME = "setTime";
const SET_INTERVAL = "setInterval";
const SET_TIMEOUT = "setTimeout";

const GET_INTERVAL_CALLBACK = "getIntervalCallback";
const GET_TIMEOUT_CALLBACK = "getTimeoutCallback";
const GET_TIME = "getTime";
const GET_INTERVAL = "getInterval";
const GET_TIMEOUT = "getTimeout";

var TimeContext = React.createContext([0]);

class TimeProvider extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            time: 30
        };
        this.timeout = 30;
        this.interval = 1;
        this.handle = undefined;
        this.timeoutCallback = () => { };
        this.intervalCallback = () => { };
    }

    dispatch(action) {
        function callback() {
            console.log(window.location.pathname);
            if (window.location.pathname !== '/quiz') {
                clearInterval(this.handle);
                this.handle = undefined;
                this.setState({ time: 0 });
            } 
            else if(this.state.time <= this.interval) {
                clearInterval(this.handle);
                this.handle = undefined;

                this.timeoutCallback();
                this.setState({ time: (this.state.time <= this.interval) ? 0 : this.state.time - this.interval });
            }
            else {
                this.intervalCallback();
                this.setState({ time: this.state.time - this.interval });
            }
        };

        switch (action.type) {
            case START_TIME:
                // if handle exists ignore start
                if (this.handle) {
                    return this.state.time;
                }
                this.handle = setInterval(callback.bind(this), this.interval * 1000);
                return this.state.time;
            case STOP_TIME:
                if (!this.handle && !this.state.time) {
                    return 0;
                }
                clearInterval(this.handle);
                this.handle = undefined;
                this.setState({ time: 0 });
                return this.state.time;
            case PAUSE_TIME:
                clearInterval(this.handle);
                this.handle = undefined;
                return this.state.time;
            case IS_STARTED:
                return this.handle && this.state.time;
            case IS_STOPPED:
                return !this.handle && !this.state.time;
            case IS_PAUSED:
                return !this.handle && this.state.time;
            case SET_TIME:
                {
                    let time = this.state.time;
                    if (typeof action.payload === 'number') {
                        if (action.payload < 0) {
                            // immediately take appropriate actions time time has been set to 0
                            callback.bind(this)();
                            this.setState({ time: 0 });
                        }
                        else {
                            this.setState({ time: action.payload });
                        }
                    }
                    return time;
                }
            case SET_INTERVAL_CALLBACK:
                {
                    let intervalCallback = this.intervalCallback;
                    if (typeof action.payloud === 'function') {
                        this.intervalCallback = action.payload;
                    }
                    return intervalCallback;
                }
            case SET_TIMEOUT_CALLBACK:
                {
                    let timeoutCallback = this.timeoutCallback;
                    if (typeof action.payloud === 'function') {
                        this.timeoutCallback = action.payload;
                    }
                    return timeoutCallback;
                }
            case SET_INTERVAL:
                {
                    let interval = this.interval;
                    if (typeof action.payload === 'number') {
                        this.interval = action.payload;
                    }
                    return interval;
                }
            case SET_TIMEOUT:
                {
                    let timeout = this.timeout;
                    if (typeof action.payload === 'number') {
                        this.timeout = action.payload;
                    }
                    return timeout;
                }
            case GET_TIME:
                return this.state.time;
            case GET_INTERVAL_CALLBACK:
                return this.intervalCallback;
            case GET_TIMEOUT_CALLBACK:
                return this.timeoutCallback;
            case GET_INTERVAL:
                return this.interval;
            case GET_TIMEOUT:
                return this.timeout;
            default:
                return undefined;
        }
    }

    render() {
        return (
            <TimeContext.Provider value={[this.state, this.dispatch.bind(this)]}>
                {this.props.children}
            </TimeContext.Provider>
        );
    }
}

var useTimeContext = function () {
    return React.useContext(TimeContext);
}

var Time = function (props) {
    return (
        <div>
            <TimeContext.Consumer>
                {([{ time }]) => <div>Time: {time}</div>}
            </TimeContext.Consumer>
        </div>);
}

export {
    TimeProvider, useTimeContext, Time,
    IS_STARTED,
    IS_STOPPED,
    IS_PAUSED,
    START_TIME,
    PAUSE_TIME,
    STOP_TIME,
    SET_INTERVAL_CALLBACK,
    SET_TIMEOUT_CALLBACK,
    SET_TIME,
    SET_INTERVAL,
    SET_TIMEOUT,
    GET_INTERVAL_CALLBACK,
    GET_TIMEOUT_CALLBACK,
    GET_TIME,
    GET_INTERVAL,
    GET_TIMEOUT,
};
