class EventEmitter {
    constructor() {
        this.subscribers = {};
    }

    on(type, callback) {
        if (!this.subscribers[type]) {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(callback);
    }

    emit(type, arg) {
        this.subscribers[type].forEach(callback => callback(arg));
    }
}

function createElement(tag, attr) {
    const element = document.createElement(tag);

    Object.keys(attr).forEach(key => {
        element.setAttribute(key, attr[key]);
    });
    return element;
}


function filterByValue(item, keys, value, newArray) {
    let i, max = keys.length;
    let isNumber;
    for (i = 0; i < max; i += 1) {
        isNumber = isNaN(item[keys[i]]) ? item[keys[i]].toLowerCase() : "" + item[keys[i]];
        if (isNumber.indexOf(value) > -1) {
            newArray.push(item);
        }
    }
    return newArray;
}

export { EventEmitter, createElement, filterByValue };