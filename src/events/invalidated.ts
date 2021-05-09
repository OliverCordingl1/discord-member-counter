const e = {
	name: 'invalidated',
	once: true,
	execute () {
		console.error('Process invalidated!');
		process.exit(1);
	},
};

module.exports = e;