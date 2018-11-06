import { filterByValue } from './methods';

class Model {
    constructor(workers) {
        this.workers = workers;
        this.perPage = 10;
        this.pageCounts = Math.ceil(this.workers.length / this.perPage);
    }

    getPagesCount() {
        return this.pageCounts;
    }

    setList(pageNum) {
        let list = [],
            i,
            max = this.workers.length,
            pageNumber = pageNum || 1;
        let interval = pageNumber * this.perPage,
            highLimit = interval > max ? max : interval,
            lowLimit = interval - this.perPage;
        for (i = lowLimit; i < highLimit; i += 1) {
            list.push(this.workers[i]);
        }
        return { list, pageNumber, };
    }

    sortWorkers(headName, type, flag, pageNum) {
        const list = this.setList(pageNum);
        const sortedWorkers = list.list.sort((a, b) => {
            if (!/^[^\w]/.test(a[headName])) {
                if (flag !== 'true') {
                    return a[headName] > b[headName];
                }
                return a[headName] < b[headName];
            }
            if (flag !== 'true') {
                return parseInt(a[headName].slice(1)) - parseInt(b[headName].slice(1));
            }
            return parseInt(b[headName].slice(1)) - parseInt(a[headName].slice(1));
        });
        return sortedWorkers;
    }

    findValue(value) {
        let inputValue = value.toLowerCase(),
            keys = Object.keys(this.workers[0]),
            filteredArray = [],
            i;
        for (i = 0; i < this.workers.length; i += 1) {
            let worker = this.workers[i];
            filterByValue(worker, keys, inputValue, filteredArray);
        }
        return filteredArray;
    }
}

export default Model;