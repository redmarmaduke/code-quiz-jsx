/**
 * LocalStorage
 * 
 * @param {*} storeName name of data set to store
 */
function LocalStorage(storeName) {
    this._storeName = storeName;
    this._data = undefined;

    /**
     * get
     * 
     * @param {*} key key in storeName to get value from
     * @param {*} defaultValue if value is not present in localstorage, return defaultValue
     * @returns value stored in [storeName][key] || defaultValue
     */
    this.get = function (key, defaultValue = undefined) {
        // if no data is currently stored in this instance
        if (!this._data) {
            // retrieve data for _storeName and mirror in this instance
            this._data = JSON.parse(localStorage.getItem(this._storeName));
        }
        // if value for key doesn't exist, return default value
        return this._data?.[key] ?? defaultValue;
    }

    /**
     * set
     * 
     * @param {*} key key in storeName to retrieve value from
     * @param {*} value value to set [storeName][key] value to
     */
    this.set = function (key, value) {
        // set data in this instance to value
        this._data[key] = value;
        // mirror data in this instance in localStorage under storeName
        localStorage.setItem(this._storeName, JSON.stringify(this._data));
    }
}