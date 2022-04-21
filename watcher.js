import EventEmitter from 'events';

const watcher = new EventEmitter();

let a = 3;

watcher.on('tes', () => console.log(a));

watcher.emit('tes');
