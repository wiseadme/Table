import { EventEmitter, createElement } from './methods';

class View extends EventEmitter {
    constructor() {
        super();
        const doc = document;
        this.searchForm = doc.querySelector('.search-form');
        this.searchInput = this.searchForm.querySelector('.search-form__input');
        this.table = doc.querySelector('.table');
        this.headRow = this.table.querySelector('.table__head-row');
        this.tbody = this.table.querySelector('.table__body-wrap');
        this.pagination = doc.querySelector('.pagination');
        this.pageNumsWrap = doc.querySelector('.pagination__nums-wrap');
        this.addListeners();
    }

    addListeners() {
        this.headRow.addEventListener('click', this.sortHandle.bind(this));
        this.pagination.addEventListener('click', this.pageHandle.bind(this));
        this.searchForm.addEventListener('submit', this.searchHandle.bind(this));
    }

    // on init show all workers
    initTable({ list }) {
        this.createEach(list);
    }

    clear(elem) {
        if (elem) elem.parentNode.removeChild(elem);
    }

    createEach(list) {
        const frag = document.createDocumentFragment();
        const tbody = createElement('tbody', { class: 'table__body-wrap' });
        list.forEach(worker => {
            frag.appendChild(this.createTdElements(worker)); // tr>td;
        });
        tbody.appendChild(frag);
        this.clear(this.tbody);
        this.tbody = tbody;
        this.table.appendChild(tbody);
    }

    createTdElements(worker) {
        const tr = createElement('tr', { class: 'table__body-row' });
        Object.keys(worker).forEach(prop => {
            const td = createElement('td', { class: 'table__body-item' });
            td.textContent = worker[prop];
            tr.appendChild(td);
        });
        return tr;
    }

    // by click on table head, send params to controller
    sortHandle({ target }) {
        const pageNum = this.pagination.querySelector('.this-page').innerText;
        const headName = target.innerText.toLowerCase();
        const index = target.cellIndex;
        const flag = target.getAttribute('data-sort');
        this.emit('sort', { headName, flag, index, pageNum });
    }

    addSortedList(index, sorted) {
        const rows = this.tbody.rows;
        const rowsArray = [].slice.call(rows);
        this.clear(this.tbody);
        this.table.appendChild(this.addNewTbody(rowsArray, sorted));
        this.sortedColumn(index);
    }

    sortedColumn(index) {
        let col = this.headRow.children[index];
        if (col.getAttribute('data-sort') !== 'true') {
            col.setAttribute('data-sort', true);
            col.classList.remove('unsorted');
            this.setUnsorted(index);
        } else {
            col.setAttribute('data-sort', false);
            col.classList.add('unsorted');
        }
    }

    setUnsorted(index) {
        let i,
            max = this.headRow.children.length;
        for (i = 0; i < max; i += 1) {
            if (i !== index) {
                this.headRow.children[i].classList.add('unsorted');
                this.headRow.children[i].setAttribute('data-sort', false);
            }
        }
    }

    addNewTbody(array, sorted) {
        let name,
            i,
            max = array.length;
        for (i = 0; i < max; i += 1) {
            name = sorted[i].name;
            this.appendName(name, array, this.tbody);
        }
        return this.tbody;
    }

    appendName(name, array, parent) {
        let i,
            max = array.length;
        for (i = 0; i < max; i += 1) {
            if (name === array[i].children[0].innerText) {
                parent.appendChild(array[i]);
            }
        }
    }

    // pagination methods
    addPagination(pagesCount) {
        const pages = pagesCount;
        const frag = document.createDocumentFragment();
        let i;
        for (i = 0; i < pages; i += 1) {
            let div = createElement('div', { class: 'pagination__num' });
            div.textContent = i + 1;
            frag.appendChild(div);
        }
        this.pageNumsWrap.appendChild(frag);
    }

    addPagNumberStyle(pagNum) {
        const paginNums = this.pagination.querySelectorAll('.pagination__num');
        const thisPage = pagNum;
        let i, max = paginNums.length;
        for (i = 0; i < max; i += 1) {
            if (thisPage == paginNums[i].innerText) {
                paginNums[i].classList.add('this-page');
            } else {
                paginNums[i].classList.remove('this-page');
            }
        }
    }

    pageHandle(e) {
        let value = e.target.innerText;
        let thisPage = this.pageNumsWrap.querySelector('.this-page').innerText,
            pageNums, max = this.pageNumsWrap.children.length;
        if (value === 'Next') pageNums = +thisPage + 1;
        else if (value === 'Preview') pageNums = +thisPage - 1;
        else pageNums = value;
        if (pageNums > max || pageNums < 1) return;
        this.emit('page', pageNums);
    }

    searchHandle(e) {
        e.preventDefault();
        const inputValue = this.searchInput.value;
        this.emit('search', inputValue);
    }

    editSearched(list) {
        this.clear();
        this.createEach(list);
    }
}

export default View;