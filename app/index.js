
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

const sound = [];

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
	
	$('p#message').text(`${message[phase]} ${data[loop][phase]} минуты.`);
	
	const timer = $.timer(data[loop][phase] * 60000, none => {
		phase++;
		
		if (phase > 4) {
			phase = 0;
			loop++;
		}
		
		if (loop > data.length - 1) {
			
		}
		
		
		
		$('p#message').text(`${message[phase]} ${data[loop][phase]} минуты.`);
		
		timer.reset(data[loop][phase]);
		
		
	});
}