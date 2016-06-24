
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
	'1303461245_blackberry_cute_sms.mp3',
	'1303461245_blackberry_cute_sms.mp3',
	'1303461232_tic_tic_sms.mp3',
	'1303461232_tic_tic_sms.mp3',
	'1303461227_guitar_no_1_sms_2011.mp3'
];

const timeScale = 600; // Число миллисекунд в одной минуте.
let loop = 0, phase = 0;
let state = 'stoped', timer;


// TODO сделать определение обычного браузера
/*$(onready => {
	onDeviceReady();
});*/

document.addEventListener('deviceready', onDeviceReady, false); // Для Cordova.

/**
 * Разные функции программы.
 */

function onDeviceReady() {
	
	const buttonStart = $('button#start');
	const selectLoop = $('select#loop');
	
	function createSunburnTimer() {
		return new SunburnTimer(message, goltisSunburnData, {
			onLoop: function(loop) {
				selectLoop.val(loop);
			},
			onEnd: function() {
				buttonStart.text('Старт');
				state = 'stoped';
			}
		});
	}
	
	timer = createSunburnTimer();
	
	goltisSunburnData.forEach((item, index) => {
		selectLoop.append($('<option/>').attr('value', index).text(`Цикл № ${index + 1}`));
	});
	
	selectLoop.change(none => {
		loop = Number(selectLoop.val()), 
		phase = 0;
		timer.reset();
		buttonStart.text('Старт');
		state = 'stoped';
		setMessage('Нажмите старт!');
	});
	
	buttonStart.click(none => {
		switch (state) {
			case 'stoped':
				selectLoop.attr('disabled', 'disabled');
				buttonStart.text('Пауза');
				state = 'started';
				timer.start();
				break;
			case 'started':
				selectLoop.removeAttr('disabled');
				buttonStart.text('Продолжить');
				state = 'paused';
				timer.pause();
				break;
			case 'paused':
				selectLoop.attr('disabled', 'disabled');
				buttonStart.text('Пауза');
				state = 'started';
				timer.resume();
				break;
		}
	});
}

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

function SunburnTimer(message, data, callback) {
	const onTick = () => {
		phase++;
		if (phase > 4) {
			phase = 0;
			loop++;
		}
		if (loop < data.length) {
			setMessage(loop, phase);
			$('audio').attr('src', 'sounds/' + sound[phase]).get(0).play();
			this.timer.reset(data[loop][phase] * timeScale);
			callback.onLoop(loop);
		} else {
			callback.onEnd();
		}
	};
	const createTimer = () => {
		let interval = data[loop][phase] * timeScale;
		return $.timer(interval, onTick, { reset: interval, disabled: true });
	};
	this.timer = createTimer();
	this.pause = function() {
		this.timer.pause();
	};
	this.resume = function() {
		this.timer.resume();
	};
	this.stop = function() {
		this.timer.stop();
	};
	this.reset = function() {
		this.timer = createTimer();
	};
	this.start = function() {
		setMessage(loop, phase);
		$('audio').attr('src', 'sounds/' + sound[phase]).get(0).play();
		this.timer.reset();
	};
}

function setMessage(loop, phase) {
	let pMessage = $('#message');
	pMessage.text(phase != undefined ? `${message[phase]} ${goltisSunburnData[loop][phase]} минут(ы).` : loop);
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