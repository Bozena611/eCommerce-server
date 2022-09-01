const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('Connected to the DB');
	} catch (err) {
		console.log('ERROR: Seems like your DB is not running, please start it up !!!');
	}
};

module.exports = connectDB;
