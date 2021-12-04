function Timeout(delay,...args) {
    this._promise = new Promise(function (resolve,reject) {
        this._handle = setTimeout(resolve, delay, ...args);
        this._reject = reject;
    }.bind(this));

    this.then = this._promise.then.bind(this._promise);

    this.catch = this._promise.then.bind(this._promise);

    this.clear = function() {
        clearTimeout(this._handle);
        this._handle = undefined;
        this._reject();
    }
}

//var timeout = (delay,...args) => new Promise((resolve) => setTimeout(resolve,delay,...args));

function Interval(fn = () => { }, interval = 1000, timeout = null, ...arguments) {
    this.fn = fn;
    this.interval = interval;
    this.originalTimeout = timeout;
    this.timeout = timeout;
    this.arguments = arguments;
    this.handle = undefined;

    this.getTimeout = function () {
        if (typeof this.timeout === 'number') {
            return this.timeout;
        }
        else {
            return undefined;
        }
    };

    this.pause = function () {
        if (this.handle) {
            clearInterval(this.handle);
            this.handle = undefined;
        }
    };

    this.stop = function() {
        this.pause();
        this.timeout = this.originalTimeout;
    }

    this.start = function () {
        this.handle = this.handle ?? setInterval(function () {
            fn();
            if (typeof this.timeout === 'number') {
                if (this.timeout <= this.interval) {
                    clearInterval(this.handle);
                    this.handle = undefined;
                    this.timeout = 0;
                }
                else {
                    this.timeout -= this.interval;
                }
            }
        }.bind(this), this.interval, ...this.arguments);
    }
}
