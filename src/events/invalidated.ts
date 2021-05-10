import { InvalidatedEvent } from '../events';

const e: InvalidatedEvent = {
	name: 'invalidated',
	once: true,
	execute(): void {
		console.error('Process invalidated!');
		process.exit(1);
	},
};

export default e;
