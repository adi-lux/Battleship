import { Model } from './modules/model';
import { Controller } from './modules/controller';
import { View } from './modules/view';
import './style.scss';

const main = () => {
	const model = new Model();
	const controller = new Controller(model);
	new View(controller);
};

main();
