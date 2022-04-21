import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAHCZcIlng7BJ9qPGHTmH42FaHjzqN0lkQ',
	authDomain: 'smart-home-tugas-akhir.firebaseapp.com',
	databaseURL: 'https://smart-home-tugas-akhir-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'smart-home-tugas-akhir'
};

const db = initializeApp(firebaseConfig);

const database = getDatabase(db);

export default class firebaseListener {
	constructor(id, server) {
		this.id = id;
		this.server = server;
		this.sensor = ref(database, 'smart-' + id);
		this.listen();
	}
	listen() {
		onValue(this.sensor, (DataSnapshot) => {
			const data = DataSnapshot.val();
			this.server.send(data, this.id);
		});
	}
	get() {
		return this.data;
	}
}

// let test = new FireBase("1310");
// test.listen()
