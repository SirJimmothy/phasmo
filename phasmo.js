
let clues = {
	'dots':			'Dots',
	'emf':			'EMF 5',
	'prints':		'Prints',
	'temps':		'Freezing',
	'orb':			'Orbs',
	'writing':	'Writing',
	'box':			'Spirit Box'
};

let ghosts = {
	"banshee": {
		"name":					"Banshee",
		"clues":				['dots','prints','orb'],
		"useful":				[
			"Crucifixes have +2m range",
			"Can hunt at any sanity level",
			"Hunts only its target, unless target is outside",
			"Can teleport to target at start of hunt, if they had ghost LoS within 20s",
		],
	},
	"demon": {
		"name":					"Demon",
		"clues":				['prints','temps','writing'],
		"useful":				[
			"Can hunt at 70% sanity",
			"Successful ouija board questions cost no sanity",
		],
	},
	"goryo": {
		"name":					"Goryo",
		"clues":				['emf','dots','prints'],
		"useful":				[
			'Rarely roams outside its ghost room',
			"Won\'t show dots with people in the ghost room",
			"Dots can only be observed through a camera",
		],
	},
	"hantu": {
		"name":					"Hantu",
		"clues":				['orb','prints','temps'],
		"useful":				[
			"Moves ~15% slower in warmer rooms",
			"Moves ~15% faster in colder rooms",
		],
	},
	"jinn": {
		"name":					"Jinn",
		"clues":				['emf','prints','temps'],
		"useful":				[
			"With breaker on, will be fast unless within 4m of target",
			"Chance to drop sanity by 25% within 3m",
		],
	},
	"mare": {
		"name":					"Mare",
		"clues":				['box','orb','writing'],
		"useful":				[
			"Cannot turn light switches on",
			"Room lights on reduces hunt threshold to 40%",
			"Room lights off increases hunt threshold to 60%",
		],
	},
	"myling": {
		"name":					"Myling",
		"clues":				['emf','prints','writing'],
		"useful":				[
			"Speaks more often to the paramic",
			"Footsteps are very quiet during hunts",
		],
	},
	"oni": {
		"name":					"Oni",
		"clues":				['emf','dots','temps'],
		"useful":				[
			"More active with >1 people in room",
			"Can throw items at high speed",
		],
	},
	"phantom": {
		"name":					"Phantom",
		"clues":				['box','dots','prints'],
		"useful":				[
			"Sanity drops 2x when visible (stops if hidden due to photo)",
			"Disappears but remains when photo is taken while not hunting",
			"Can wander to indoor player",
			"Blinks very slowly during hunt",
		],
	},
	"poltergeist": {
		"name":					"Poltergeist",
		"clues":				['box','prints','writing'],
		"useful":				[
			"Can throw several items at once",
			"Reduces witness sanity by 2x thrown items",
		],
	},
	"revenant": {
		"name":					"Revenant",
		"clues":				['orb','temps','writing'],
		"useful":				[
			"Travels very fast when it can see a player",
			"Travels 2/3 speed when not seeing players",
		],
	},
	"shade": {
		"name":					"Shade",
		"clues":				['emf','temps','writing'],
		"useful":				[
			"Won't try to hunt with &gt;1 person in room",
		],
	},
	"spirit": {
		"name":					"Spirit",
		"clues":				['box','emf','writing'],
		"useful":				[
			"Smudges last twice as long: 180s",
		],
	},
	"wraith": {
		"name":					"Wraith",
		"clues":				['box','emf','dots'],
		"useful":				[
			"When loud-stepping after salt, no footprints show",
			"After stepping in salt, becomes permanently more active",
			"Can teleport to random indoor player",
		],
	},
	"yokai": {
		"name":					"Yokai",
		"clues":				['box','dots','orb'],
		"useful":				[
			"Can hunt below 80% when players are talking nearby",
			"Can only hear players &lt;2m away during hunts",
		],
	},
	"yurei": {
		"name":					"Yurei",
		"clues":				['orb','dots','temps'],
		"useful":				[
			"Sanity drops 2x within 10m while visible / hunting",
			"Cannot roam while smudged",
		],
	}
};

let photos = [
	['--------',			0,0,0],
	['Bone',					40,55,70],
	['Dead Body',			10,20,30],
	['Dirty Water',		15,23,30],
	['Finger Prints',	15,33,50],
	['Footsteps',			20,30,40],
	['Ghost',					70,85,100],
	['Interaction',		20,30,40],
	['Ouija Board',		30,45,60],
];
let photo_count = 10;
let star_count = 3;

let rolls = {
	'maps':{
		'name':'Maps',
		'items':{
			'tanglewood':	'Tanglewood Street',
			'willow':			'Willow Street',
			'ridgeview':	'Ridgeview Road',
			'edgefield':	'Edgefield Street',
			'grafton':		'Grafton Farmhouse',
			'bleasdale':	'Bleasdale Farmhouse',
			'brownstone':	'Brownstone High School',
			'prison':			'Prison',
			'asylum':			'Asylum',
		},
		'groups':{
			'clear':	{'name':'Clear',	'items':[]},
			'all':		{'name':'All',		'items':[]},
			'small':	{'name':'Small',	'items':['tanglewood','willow','ridgeview','edgefield','grafton','bleasdale']},
			'medium':	{'name':'Medium',	'items':['brownstone','prison']},
			'large':	{'name':'Large',	'items':['asylum']},
		},
	},
	'items':{
		'name':'Items',
		'items':{
			'can':	'Candle',
			'cru':	'Crucifix',
			'dot':	'Dots Projector',
			'emf':	'EMF Reader',
			'fla':	'Flashlight',
			'gwb':	'Ghost Writing Book',
			'glo':	'Glowstick',
			'lig':	'Lighter',
			'mos':	'Motion Sensor',
			'par':	'Parabolic Microphone',
			'cam':	'Photo Camera',
			'sal':	'Salt',
			'san':	'Sanity Pills',
			'sms':	'Smudge Sticks',
			'snd':	'Sound Sensor',
			'spb':	'Spirit Box',
			'sfl':	'Strong Flashlight',
			'thm':	'Thermometer',
			'tri':	'Tripod',
			'uvl':	'UV Light',
			'vid':	'Video Camera',
		},
		'groups':{
			'clear':			{'name':'Clear',			'items':[]},
			'all':				{'name':'All',				'items':[]},
			'evidence':		{'name':'Evidence',		'items':['emf','dot','gwb','spb','thm','uvl','vid']},
			'secondary':	{'name':'Secondary',	'items':['can','cru','fla','glo','lig','mos','par','cam','sal','san','sms','snd','sfl','tri']},
			'lights':			{'name':'Lights',			'items':['can','fla','sfl']},
			'electric':		{'name':'Electrical',	'items':['emf','dot','fla','mos','par','cam','snd','spb','sfl','thm','uvl','vid']},
		},
	},
};

for (let key in rolls) { if (rolls.hasOwnProperty(key)) {
	for (let key2 in rolls[key].items) { if (rolls[key].items.hasOwnProperty(key2)) {
		rolls[key].groups.all.items.push(key2);
	} }
	//for (let key2 in rolls[key]) { if (rolls[key].hasOwnProperty(key2)) {
		//rolls[key].groups.all.items.push(key2);
	//} }
} }

let maps = [
	{'name':'Tanglewood Street',			'file':'map_tanglewood.png'},
	{'name':'Willow Street',					'file':'map_willow.png'},
	{'name':'Ridgeview Road',					'file':'map_ridgeview.png'},
	{'name':'Edgefield Street',				'file':'map_edgefield.png'},
	{'name':'Grafton Farmhouse',			'file':'map_grafton.png'},
	{'name':'Bleasdale Farmhouse',		'file':'map_bleasdale.png'},
	{'name':'Brownstone High School',	'file':'map_highschool.png'},
	{'name':'Prison',									'file':'map_prison.png'},
	{'name':'Asylum',									'file':'map_asylum.png'},
];

let files = {};
let media = {
	'click':	{'type':'audio','file':'click.mp3'},
	'alarm':	{'type':'audio','file':'alarm.mp3'},
};

if (document.addEventListener) {
	document.addEventListener('click',(e) => { click(e); },false);
	document.addEventListener('keydown',(e) => { keydown(e); },false);
	document.addEventListener('keypress',(e) => { keypress(e); },false);
}

let cookie = 'phasmo_';
let sound = true;

let timers = {
	'main':	{'start': 0,	'end': 0,	'current': 0},
};
let clocks = {
	'hunt':		null,
	'smudge':	null,
};

let checked = []; // Hold list of currently checked clues

page_load(load);

function page_load(item) {
	let load = window.onload;
	if (typeof load == 'function') {
		window.onload = function() { if (load) { load(); } item(); };
	} else {
		window.onload = item;
	}
}

function load() {
	// Load clues and ghosts into page

	if (parseInt(getcookie('dark').toString())) { toggle_dark(); }
	if (parseInt(getcookie('mute').toString())) { document.getElementById('sound').childNodes[0].childNodes[0].checked = false; console.log('Muted'); toggle_sound(); }

	let clues_ul = document.getElementById('clues');

	let count = 0;
	let li;
	let label_y;
	let label_n;
	let check_y;
	let check_n;
	let span_y;
	let span_n;
	let span_number;
	let span_image;

	// Populate clues
	for (let key in clues) {
		count++;
		li					= document.createElement('LI');
		span_number	= document.createElement('SPAN');
		span_image	= document.createElement('SPAN');
		span_y			= document.createElement('SPAN');
		span_n			= document.createElement('SPAN');
		label_y			= document.createElement('LABEL');
		label_n			= document.createElement('LABEL');
		check_y			= document.createElement('INPUT');
		check_n			= document.createElement('INPUT');

		li.setAttribute('data-clue',key);
		li.innerHTML = clues[key];
		check_y.name = 'clue_y[]'; check_y.type = 'checkbox'; check_y.value = key;
		check_n.name = 'clue_n[]'; check_n.type = 'checkbox'; check_n.value = key;

		span_number.innerHTML = count.toString();

		label_y.appendChild(check_y); label_y.appendChild(span_y);
		label_n.appendChild(check_n); label_n.appendChild(span_n);
		li.appendChild(span_number);
		li.appendChild(span_image);
		li.appendChild(label_y); li.appendChild(label_n);

		// Structure: 'text','number','image','tick','cross'

		clues_ul.appendChild(li);
	}

	// Populate timer hotkeys
	let timers = document.getElementById('timers').childNodes[5].childNodes;
	let hotkeys = ['Q','W','E','R','T','Y','U','I','O','P'];
	count = 0;
	for (let x = 0; x < timers.length; x++) { if (timers[x].nodeName === 'INPUT') {
		timers[x].setAttribute('data-hotkey',hotkeys[count]);
		timers[x].value = '[' + hotkeys[count] + '] ' + timers[x].value;
		count++;
	} }

	populate_ghosts(ghosts);

	// Populate photos
	let tbody = document.querySelector('div#photos tbody');
	for (let x = 0; x < photo_count; x++) {
		let tr = document.createElement('TR');

		let td = document.createElement('TD');
		td.innerHTML = '[' + (x < photos.length ? (x + 1) : 0 ) + ']';
		tr.appendChild(td);

		td = document.createElement('TD');
		let select = document.createElement('SELECT');
		select.name = 'photo_' + x;
		select.onchange = function() { count_points() };

		for (let y = 0; y < photos.length; y++) {
			let opt = document.createElement('OPTION');
			opt.innerHTML = photos[y][0];
			opt.value = y;
			select.appendChild(opt);
		}
		td.appendChild(select);
		tr.appendChild(td);

		td = document.createElement('TD');
		let slider = document.createElement('INPUT');
		slider.type = 'range';
		slider.min = 0; slider.max = star_count;
		slider.value = 0;
		slider.name = 'slider_' + x;
		slider.oninput = function() { count_points(slider); };

		td.appendChild(slider);
		tr.appendChild(td);

		td = document.createElement('TD');
		td.innerHTML = '0';
		tr.appendChild(td);

		tbody.appendChild(tr);
	}
	// Populate photos

	// Populate roll
	let roll_container = document.querySelectorAll('div#roll > div')[0];
	for (let roll in rolls) { if (rolls.hasOwnProperty(roll)) {

		let div = document.createElement('DIV');
		div.className = 'roll_group';

		let div_groups = document.createElement('DIV');
		for (let group in rolls[roll].groups) { if (rolls[roll].groups.hasOwnProperty(group)) {
			let item = document.createElement('SPAN');
			item.setAttribute('data-name',roll + '_' + group);
			item.innerHTML = rolls[roll].groups[group].name;
			div_groups.appendChild(item);
			item.addEventListener('click',() => { roll_select(item); });
		} }
		div.appendChild(div_groups);

		let div_items = document.createElement('DIV');
		for (let item in rolls[roll].items) { if (rolls[roll].items.hasOwnProperty(item)) {

			let prefix = 'item_' + roll + '_';
			let check = document.createElement('INPUT');
			check.type = 'checkbox';
			check.id = prefix + item;
			check.name = 'item[]';
			check.setAttribute('data-name',item);

			let label = document.createElement('LABEL');
			label.setAttribute('for',prefix + item);
			label.setAttribute('data-name',item);

			let span = document.createElement('SPAN');
			span.innerHTML = rolls[roll].items[item];

			label.appendChild(span);
			div_items.appendChild(check);
			div_items.appendChild(label);

		} }
		div.appendChild(div_items);

		let input = document.createElement('INPUT');
		input.type = 'button';
		input.value = 'Roll ' + rolls[roll].name;
		div.appendChild(input);
		input.addEventListener('click',() => { roll_submit(div); });

		roll_container.appendChild(div);

	} }
	// Populate roll

	// Populate maps
	let map_div = document.getElementById('maps');
	for (let x = 0; x < maps.length; x++) {
		let map = document.createElement('LI');

		let link = document.createElement('A');
		link.href = 'img/' + maps[x].file;
		link.target = '_blank';
		link.innerHTML = maps[x].name;

		map.appendChild(link);
		map_div.appendChild(map);
	}
	// Populate maps

	// Populate media
	for (let key in media) { if (media.hasOwnProperty(key)) {
		files[key] = new Audio('media/' + media[key].file);
	} }
	// Populate media

}

function click(e) {
	let target = e.target;
	let parent = target.parentNode;
	switch (e.which) {
		case 1: // Left click

			let parent_div = getitem(target,'DIV');

			switch (target.nodeName) {
				case 'H3':

					if (target.id === 'play') {
						let timer_act;
						if (target.innerHTML === '&gt;') {
							target.innerHTML = 'II';		timer_act = 'start';
						} else {
							target.innerHTML = '&gt;';	timer_act = 'stop';
						}
						do_timer(timer_act,'main');
					}

				break;
				case 'INPUT':

					if (target.type === 'button' && target.getAttribute('data-hotkey')) {
						let timer = document.getElementById('timer');
						let val = 0;
						if (target.nodeName === 'INPUT' && parseInt(timer.innerHTML) && !clocks['main']) {
							for (let x = 0; x < parent.childNodes.length; x++) { if (parent.childNodes[x].nodeName === 'INPUT') {
								parent.childNodes[x].classList.remove('current');
							} }
							let grace = 3;
							switch (target.name) {
								case 'button_01': val = 300;					break;
								case 'button_02': val = 150;					break;
								case 'button_03': val = 25 + grace;		break;
								case 'button_04': val = 35 + grace;		break;
								case 'button_05': val = 50 + grace;		break;
								case 'button_06': val = 90;						break;
								case 'button_07': val = 180;					break;
								case 'button_08': val = 25;						break;
							}
							target.classList.add('current');
							timer.innerHTML = val.toString();
						}
					}

				break;
				default:

					if (target.nodeName === 'SPAN' && parent.nodeName === 'LABEL' && parent.parentNode.nodeName === 'LI') {
						setTimeout(function() { check_ghosts(); },10); // Give time for the checkbox to self-toggle
					}
					if (target.nodeName === 'SPAN' && parent.parentNode.id === 'sound') {
						setTimeout(() => {
							toggle_sound();
						},50);
					}

					if (parent_div.id === 'links') {
						switch (getitem(target,'LI')) {
							case parent_div.childNodes[0].childNodes[0]:
								toggle_dark(true);
							break;
							case parent_div.childNodes[0].childNodes[1]:
								toggle_fullscreen();
							break;
							case parent_div.childNodes[0].childNodes[3]:
								toggle_sound();
								document.getElementById('sound').childNodes[0].childNodes[0].click();
							break;
							case parent_div.childNodes[0].childNodes[4]:
								reset();
								break;
						}
					}

				break;
			}

		break;
	}
}

function keydown(e) {
	let current = document.activeElement;
	switch (e.which) {
		case 13: // Enter
			if (current.id === 'ghostname') {
				current.blur();
			}
		break;
		case 27: // Esc
			current.blur();
		break;
	}

	if (!in_array(current.type,['text'])) {

		if (document.getElementById('photos_check').checked) {

			let sliders = document.querySelectorAll('input[type=range]');
			if (in_array(e.which,[38,40])) {
				let found = false;
				for (let x = 0; x < sliders.length; x++) { if (sliders[x] === current) {
					e.preventDefault();
					found = true;
					let item = x;
					if (e.which === 38) { // Up arrow
						item = (x ? x  : photo_count) - 1;
					} else { // Down arrow
						item = (x === (photo_count - 1) ? 0  : (x + 1));
					}
					sliders[item].focus();
				} }
				if (!found) { e.preventDefault(); sliders[(e.which === 38 ? photo_count - 1 : 0)].focus(); }
			}

		} else {

			let maps_div = document.getElementById('maps');
			let len = maps_div.childNodes.length;
			if (in_array(e.which,[37,39])) {
				let found = false;
				for (let x = 0; x < len; x++) { if (maps_div.childNodes[x].childNodes[0] === current) {
					e.preventDefault();
					found = true;
					let item = x;
					if (e.which === 37) {
						item = (x ? x : len) - 1;
					} else {
						item = (x === (len - 1) ? 0 : (x + 1));
					}
					maps_div.childNodes[item].childNodes[0].focus();
				} }
				if (!found) { e.preventDefault(); maps_div.childNodes[(e.which === 37 ? (len - 1) : 0)].childNodes[0].focus(); }
			}

		}

	}

}

function keypress(e) {
	let keycode = e.key;
	let current = document.activeElement;

	if (document.activeElement.getAttribute('type') !== 'text') {

		switch (keycode.toLowerCase()) {
			case '#':
				document.getElementById('play').click();
			break;
			case 'a':
				toggle_alone();
			break;
			case 'd':
				toggle_dark(true);
			break;
			case 'f':
				toggle_fullscreen();
			break;
			case 'm':
				toggle_sound();
				document.getElementById('sound').childNodes[0].childNodes[0].click();
			break;
			case 'n':
				document.getElementById('ghostname').focus();
				e.preventDefault();
			break;
			case 's':
				document.getElementById('photos').childNodes[0].click();
				current.blur();
			break;
			case 'l':
				document.getElementById('roll').childNodes[0].click();
				current.blur();
			break;
			case 'x':
				reset();
			break;
		}

		if (document.getElementById('photos_check').checked) {

			if (in_array(keycode,['1','2','3','4','5','6','7','8','9','0'])) {
				let select = (parseInt(keycode) ? (keycode - 1) : 9);
				select = document.getElementsByName('photo_' + select)[0];
				let value = parseInt(select.value);
				select.value = (value < (photos.length - 1) ? (value + 1) : '0');
				select.onchange(null);
			}

		} else {

			// Structure: 'text','number','image','tick','cross'
			let clues = document.getElementById('clues');
			for (let x = 0; x < clues.childNodes.length; x++) {
				let check = [];
				if (clues.childNodes[x].childNodes[1].innerHTML === keycode) {
					check[0] = clues.childNodes[x].childNodes[3].childNodes[0];
					check[1] = clues.childNodes[x].childNodes[4].childNodes[0];
					if (!check[0].checked && !check[1].checked) {
						check[0].nextSibling.click();
					} else if (check[0].checked && !check[1].checked) {
						check[0].nextSibling.click(); setTimeout(function() { check[1].nextSibling.click(); },100);
					} else if (!check[0].checked && check[1].checked) {
						check[1].nextSibling.click();
					}
				}
			}

		}

		let timers = document.getElementById('timers').childNodes[5].childNodes;
		let hotkey;
		for (let x = 0; x < timers.length; x++) { if (timers[x].nodeName === 'INPUT') {
			hotkey = timers[x].getAttribute('data-hotkey');
			if (keycode.toLowerCase() === hotkey.toLowerCase()) {
				timers[x].click();
			} }
		}

	}

}

function do_timer(act,which) {
	let timer = timers[which];
	let modifier = (timer.start < timer.end ? 1 : -1); // Determine up or down counter
	let element = document.getElementById('timer');

	switch (act) {
		case 'start':

			if (!clocks[which]) {
				timer.start = timer.current = parseInt(element.innerHTML);
				clocks[which] = setInterval(function() {
					timer.current += modifier;
					element.innerHTML = timer.current;

					if (sound) {
						if (timer.current === 30) { for (let x = 0; x < (timer.current / 10); x++) { setTimeout(() => { files['click'].play(); },200 * x); } }
						if (timer.current === 20) { for (let x = 0; x < (timer.current / 10); x++) { setTimeout(() => { files['click'].play(); },200 * x); } }
						if (timer.current === 10) { for (let x = 0; x < (timer.current / 10); x++) { setTimeout(() => { files['click'].play(); },200 * x); } }
						if (timer.current >= 1 && timer.current <= 5) { files['click'].play(); }
					}

					if (timer.current === timer.end) {
						if (sound) { files['alarm'].play(); }
						clearInterval(clocks[which]);
						flicker('timers');
						element.innerHTML = timer.start;
						document.getElementById('play').click();
						setTimeout(() => { do_timer('stop',which); },2000);
					}
				},1000);
			}

		break;
		case 'stop':

			clearInterval(clocks[which]);
			clocks[which] = null;

		break;
	}
}

function flicker(elem) {
	let timer = null;
	let count = 0;
	let limit = 6;
	elem = document.getElementById(elem);
	if (elem) {
		timer = setInterval(function() {
			elem.classList.toggle('flicker');
			count++;
			if (count === limit) { clearInterval(timer); }
		},200);
	}
}

function toggle_dark(set_cookie = false) {
	if (!in_array('dark',document.body.classList)) {
		document.body.classList.add('dark');
		if (set_cookie) { setcookie('dark',1); }
	} else {
		document.body.classList.remove('dark');
		if (set_cookie) { setcookie('dark',0); }
	}
}

function toggle_fullscreen() {
	if (!document['fullscreenElement']) { // Done in bracket notation to prevent validation errors
		document.documentElement.requestFullscreen().then();
	} else {
		document.exitFullscreen().then();
	}
}

function toggle_alone() {
	let alone = [
		document.getElementById('ghost').childNodes[1].childNodes[0],
		document.getElementById('ghost').childNodes[2].childNodes[0],
		document.getElementById('ghost').childNodes[3].childNodes[0],
	];
	if (alone[0].checked) {
		alone[1].click();
	} else if (alone[1].checked) {
		alone[2].click();
	} else {
		alone[0].click();
	}
}

function toggle_sound() {
	sound = !sound;
	setcookie('mute',(sound ? '0' : '1'));
	document.getElementById('links').childNodes[0].childNodes[3].classList.toggle('on');
}

function count_points(slider) {
	if (typeof slider !== 'undefined') { slider.parentNode.nextSibling.innerHTML = slider.value; }

	let result = 0;
	let points = 0;

	for (let x = 0; x < photo_count; x++) {
		let type = parseInt(document.getElementsByName('photo_' + x)[0].value);
		let slider = parseInt(document.getElementsByName('slider_' + x)[0].value);
		if (type && slider) {
			points += photos[type][slider];
		}
	}

	if (!points) {
		result = 0;
	} else if (points < 50) {
		result = 10;
	} else if (points < 100) {
		result = 15;
	} else if (points < 200) {
		result = 20;
	} else if (points < 300) {
		result = 25;
	} else if (points < 400) {
		result = 30;
	} else if (points < 500) {
		result = 35;
	} else if (points >= 500) {
		result = 40;
	}
	document.querySelector('div#photos > div > h2').innerHTML = '$' + result;
}

function reset() {
	let check = [];
	let clues = document.getElementById('clues');

	document.body.classList.toggle('hidden');
	setTimeout(function() { document.body.classList.toggle('hidden'); },200);

	document.getElementById('ghostname').value = '';
	document.getElementById('ghost').childNodes[1].childNodes[0].click();

	for (let x = 0; x < clues.childNodes.length; x++) {
		check[0] = clues.childNodes[x].childNodes[3].childNodes[0];
		check[1] = clues.childNodes[x].childNodes[4].childNodes[0];
		if (check[0].checked) { check[0].nextSibling.click(); }
		if (check[1].checked) { check[1].nextSibling.click(); }
	}

	if (clocks['main']) { document.getElementById('play').click(); }
	let timers = document.getElementById('timers').childNodes[5];
	for (let x = 0; x < timers.childNodes.length; x++) { if (timers.childNodes[x].nodeName === 'INPUT') {
		if (in_array('current',timers.childNodes[x].classList)) { timers.childNodes[x].click(); break; }
	} }

	for (let x = 0; x <= photos.length; x++) {
		document.getElementsByName('photo_' + x)[0].value = 0;
		document.getElementsByName('slider_' + x)[0].value = 0;
		document.getElementsByName('slider_' + x)[0].parentNode.nextSibling.innerHTML = 0;
		count_points();
	}

	roll_select('clear');

}

function check_ghosts() {
	let checked_y = [];
	let checked_n = [];
	let ul_clues = document.getElementById('clues');
	let x; // Counter
	let key; // General key

	// Structure: 'text','number','image','tick','cross'

	// Determine current state
	let checkbox_y;
	let checkbox_n;
	checked = []; // Clear global checklist
	for (x = 0; x < ul_clues.childNodes.length; x++) {
		checkbox_y = ul_clues.childNodes[x].childNodes[3].childNodes[0];
		checkbox_n = ul_clues.childNodes[x].childNodes[4].childNodes[0];
		if (!checkbox_y.checked) { ul_clues.childNodes[x].classList.remove('selected'); } else {
			checked_y.push(checkbox_y.value);
			checked.push(checkbox_y.value);
			ul_clues.childNodes[x].classList.add('selected');
		}
		if (checkbox_n.checked) { checked_n.push(checkbox_n.value); }
	}

	// Eliminate ghosts based on positive selection
	let possible = clone(ghosts);
	for (key in possible) { if (possible.hasOwnProperty(key)) {
		for (x = 0; x < checked_y.length; x++) {
			if (!in_array(checked_y[x],possible[key]['clues'])) { delete possible[key]; break }
		}
	} }

	// Eliminate ghosts based on negative selection
	for (let key in possible) { if (possible.hasOwnProperty(key)) {
		for (x = 0; x < checked_n.length; x++) {
			if (in_array(checked_n[x],possible[key]['clues'])) { delete possible[key]; break }
		}
	} }

	show_ghosts(possible);

}

function populate_ghosts(ghosts) {
	// Structure: 'text','number','image','tick','cross'

	// Display descriptions of all applicable ghosts
	let ghosts_ul = document.getElementById('ghosts');
	let content;
	let heading;
	let icons;
	let icon;
	let desc;
	let useful;

	// Remove any entries for re-population
	while (ghosts_ul.firstChild) { ghosts_ul.removeChild(ghosts_ul.lastChild); }

	for (let key in ghosts) { if (ghosts.hasOwnProperty(key)) {
		content = document.createElement('LI');
		content.setAttribute('data-type',key);
		heading = document.createElement('h3');
		heading.innerHTML = key;

		icons = document.createElement('SPAN');
		for (let x = 0; x < ghosts[key]['clues'].length; x++) {
			icon = document.createElement('SPAN');
			icon.setAttribute('data-type',ghosts[key]['clues'][x]);
			if (in_array(ghosts[key]['clues'][x],checked)) { icon.classList.add('checked'); }
			icon.title = clues[ghosts[key]['clues'][x]];
			icons.appendChild(icon);
		}
		heading.appendChild(icons);
		content.appendChild(heading);

		desc = document.createElement('P');
		desc.innerHTML = ghosts[key]['description'];

		let useful_container = document.createElement('UL');
		for (let x = 0; x < ghosts[key]['useful'].length; x++) {
			useful = document.createElement('LI');
			useful.innerHTML = ghosts[key]['useful'][x];
			useful_container.appendChild(useful);
		}
		content.appendChild(useful_container);

		ghosts_ul.appendChild(content);
	} }

}

function show_ghosts(ghosts) {
	let available_clues = [];
	let clue;

	// Compile all clues from current ghosts, to prepare for disabling unmentioned clues
	for (let key in ghosts) { if (ghosts.hasOwnProperty(key)) {
		for (let x = 0; x < ghosts[key]['clues'].length; x++) {
			clue = ghosts[key]['clues'][x];
			if (!in_array(clue,available_clues)) { available_clues.push(clue); }
		}

	} }

	// Disable impossible clues
	let clues_ul = document.getElementById('clues');
	for (let x = 0; x < clues_ul.childNodes.length; x++) {
		clue = clues_ul.childNodes[x];
		if (!in_array(clue.getAttribute('data-clue'),available_clues)) { // If this clue isn't applicable, disable it

			clue.classList.add('disabled');

			// Disable this clue's unchecked choices
			if (!clue.childNodes[3].childNodes[0].checked) { clue.childNodes[3].childNodes[0].disabled = true; }
			if (!clue.childNodes[4].childNodes[0].checked) { clue.childNodes[4].childNodes[0].disabled = true; }

		} else { // If this clue is applicable, enable its selection

			clue.classList.remove('disabled');

			// Re-enable this clue's positive and negative choices
			clue.childNodes[3].childNodes[0].disabled = false;
			clue.childNodes[4].childNodes[0].disabled = false;

			// When this clue is marked positive, disable its negative option
			if (clue.childNodes[3].childNodes[0].checked) {
				clue.childNodes[4].childNodes[0].disabled = true;
			}

		}
	}

	let ghosts_ul = document.getElementById('ghosts');
	let ghost;

	for (let x = 0; x < ghosts_ul.childNodes.length; x++) {
		ghost = ghosts_ul.childNodes[x];

		for (let y = 0; y < ghost.childNodes[0].childNodes[1].childNodes.length; y++) {
			ghost.childNodes[0].childNodes[1].childNodes[y].classList.remove('checked');
		}

		if (ghosts.hasOwnProperty(ghost.getAttribute('data-type'))) { // If this ghost is in the valid choices
			for (let y = 0; y < ghost.childNodes[0].childNodes[1].childNodes.length; y++) {
				clue = ghost.childNodes[0].childNodes[1].childNodes[y];
				clue.classList.remove('checked');
				if (in_array(ghosts[ghost.getAttribute('data-type')]['clues'][y],checked)) { // EMF, etc is selected
					if (ghosts[ghost.getAttribute('data-type')]['clues'][y] === clue.getAttribute('data-type')) {
						clue.classList.add('checked');
					}
				}
			}
			ghost.classList.remove('hidden');
		} else {
			ghost.classList.add('hidden');
		}
	}

}

function roll_select(item) {
	if (item === 'clear') {

		let roll_groups = document.getElementsByClassName('roll_group');
		for (let x = 0; x < roll_groups.length; x++) {
			for (let y = 0; y < roll_groups[x].childNodes[1].childNodes.length; y++) {
				if (roll_groups[x].childNodes[1].childNodes[y].nodeName === 'INPUT') {
					roll_groups[x].childNodes[1].childNodes[y].checked = false;
				}
			}
		}

	} else {

		let roll = item.getAttribute('data-name').split('_');
		let roll_items = item.parentNode.nextSibling;
		for (let x = 0; x < roll_items.childNodes.length; x++) {
			if (roll_items.childNodes[x].nodeName === 'INPUT') {
				roll_items.childNodes[x].checked = false;
				roll_items.childNodes[x].className = '';

				let check_name = roll_items.childNodes[x].getAttribute('data-name');
				if (in_array(check_name,rolls[roll[0]].groups[roll[1]].items)) {
					roll_items.childNodes[x].checked = true;
				}
			}
		}

	}
}

function roll_submit(div) {
	let roll_items = div.childNodes[1];

	let choices = [];
	for (let x = 0; x < roll_items.childNodes.length; x++) {
		if (roll_items.childNodes[x].nodeName === 'INPUT' && roll_items.childNodes[x].checked) {
			choices.push(roll_items.childNodes[x]);
		}
	}

	if (choices.length) {
		let choice = choices[Math.floor(Math.random() * choices.length)];
		choice.checked = false;
		choice.classList.add('selected');
	}

}

function in_array(needle,haystack,separator = ' ') {
	// Important: Leave separator default as space; allows for use checking classes
	let output = false;
	if (!Array.isArray(haystack)) {
		haystack = haystack.toString().split(separator);
	}
	for (let x = 0; x < haystack.length; x++) {
		if (haystack[x] === needle) { output = true; break; }
	}
	return output;
}

function clone(obj) {
	if (null == obj || "object" != typeof obj) return obj;
	let copy = obj.constructor();
	for (let attr in obj) { if (obj.hasOwnProperty(attr)) { copy[attr] = obj[attr]; } }
	return copy;
}

function getitem(e,item_type = 'TR') {
	// Go back up the DOM tree until we find a parent with a tag matching item_type
	item_type = item_type.toUpperCase();
	if (e.nodeName !== 'HTML') {
		while (e && e.nodeName !== item_type && e.nodeName !== 'HTML') { e = e.parentNode; }
	}
	return (e && e.nodeName === item_type ? e : false);
}

function setcookie(name,value) {
	name = cookie + name;
	let d = new Date(); d.setTime(d.getTime() + (24 * 3600 * 1000));
	document.cookie = name + '=' + value + '; expires=' + d.toUTCString() + '; SameSite=None; Secure; path=/';
}

function getcookie(name) {
	name = cookie + name;
	let output = 0;
	let data = document.cookie.split('; ');
	let item;
	for (let x = 0; x < data.length; x++) {
		item = data[x]; item = item.split('=');
		if (item[0] === name) { output = item[1]; }
	}
	return output;
}
