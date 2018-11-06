class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('sort', this.resortWorkers.bind(this));
        view.on('page', this.pageHandler.bind(this));
        view.on('search', this.searchHandler.bind(this));
    }

    // window onload block
    setAllWorkers(pagNum) {
        const pagNumber = pagNum || 1;
        const workersList = this.model.setList(pagNumber);
        const pagesCount = this.model.getPagesCount();
        this.view.initTable(workersList);
        this.view.addPagination(pagesCount);
        this.view.addPagNumberStyle(pagNumber);
    }

    //table sort
    resortWorkers({ headName, flag, type, index, pageNum }) {
        const sorted = this.model.sortWorkers(headName, type, flag, pageNum);
        this.view.addSortedList(index, sorted);
    }

    pageHandler(pagNum) {
        const workersList = this.model.setList(pagNum);
        this.view.initTable(workersList);
        this.view.addPagNumberStyle(pagNum);
    }

    searchHandler(value) {
        const finded = this.model.findValue(value);
        this.view.editSearched(finded);
    }
}

export default Controller;