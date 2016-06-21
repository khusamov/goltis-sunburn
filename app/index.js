
/* global $ */

const goltisSunburnData = prepareGoltisSunburnData(`
	1.5;1.5;1;1;3#2;2;1;1;3#3;3;1.5;1.5;5#5;5;2.5;2.5;5#7;7;3;3;7
	9;9;5;5;10#12;12;7;7;10#15;15;10;10;10#20;20;15;15;15
	25;25;20;20;20#35;35;25;25;30#45;45;30;30;40
`);

const message = [
	'Лежим на спине', 
	'Лежим на животе', 
	'Лежим на одном боку', 
	'Лежим на другом боку', 
	'Отдыхаем в тени'
];

const sound = [
	'http://rington4ik.info/uploads/files/1303461245_blackberry_cute_sms.mp3',
	'http://rington4ik.info/uploads/files/1303461292_soft_sms_2011.mp3',
	'http://rington4ik.info/uploads/files/1303461232_tic_tic_sms.mp3',
	'http://rington4ik.info/uploads/files/1303461232_tic_tic_sms.mp3',
	'http://rington4ik.info/uploads/files/1303461227_guitar_no_1_sms_2011.mp3'
];

let state = 'stoped';

$(onready => {
	$('button#start').click(none => {
		switch (state) {
			case 'stoped':
				state = 'start';
				startSunburning(message, goltisSunburnData);
				break;
		}
	});
});

function prepareGoltisSunburnData(data) {
	return (
		data
			.split('\n')
			.map(i => i.trim())
			.filter(i => i.length)
			.join('#')
			.split('#')
			.map(i => i.split(';').map(Number))
	);
}

function startSunburning(message, data) {
	let loop = 0, phase = 0;
	setMessage(loop, phase);
	const timeScale = 60000; // Число миллисекунд в одной минуте.
	const timer = $.timer(data[loop][phase] * timeScale, none => {
		phase++;
		if (phase > 4) {
			phase = 0;
			loop++;
		}
		if (loop < data.length) {
			setMessage(loop, phase);
			$('audio').attr('src', sound[phase]).get(0).play();
			timer.reset(data[loop][phase] * timeScale);
		} else {
			state = 'stoped';
		}
	});
}

function setMessage(loop, phase) {
	let pMessage = $('p#message');
	pMessage.text(`Цикл ${loop + 1}: ${message[phase]} ${goltisSunburnData[loop][phase]} минут(ы).`);
}

/**
 * Уведомления в браузере.
 */

		
var Notify = window.Notify.default;

var myNotification = new Notify('КУКУ!', {
	icon: 'https://healthspirit.ru/wp-content/uploads/2016/01/TWVaq0BceTA.jpg',
    body: 'Привет, это я, ваше уведомление!'
});

	
		
		
if (!Notify.needsPermission) {
    doNotification()
} else if (Notify.isSupported()) {
    Notify.requestPermission(onPermissionGranted, onPermissionDenied);
}

function onPermissionGranted() {
    console.log('Permission has been granted by the user');
    doNotification()
}

function onPermissionDenied() {
    console.warn('Permission has been denied by the user');
}

function doNotification() {
	/*const timer = $.timer(5000, none => {
		myNotification.show();
		timer.reset(5000);
		console.log("doNotification");
	});*/
}