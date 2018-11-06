import Model from './modules/Model';
import View from './modules/View';
import Controller from './modules/Controller';
import workers from './workers.json';

(() => {
    const model = new Model(workers);
    const view = new View();
    const controller = new Controller(model, view);
    controller.setAllWorkers();
})();