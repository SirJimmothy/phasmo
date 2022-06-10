
for (let key in rolls) { if (rolls.hasOwnProperty(key)) {
	for (let key2 in rolls[key].items) { if (rolls[key].items.hasOwnProperty(key2)) {
		let all = rolls[key].groups.all;
		all.items.push(key2);
	} }
} }

let files = {};
let media = {
	"click":	{"type":"audio","file":"click.mp3"},
	"alarm":	{"type":"audio","file":"alarm.mp3"},
};

let prefix		= "phasmo_";
let sound			= true;
let use_map		= "";
let use_diff	= "";
let lang_use	= "en";

let timings = {
	"main":	{"start": 0,	"end": 0,	"current": 0},
};
let clocks = {
	"hunt":		null,
	"smudge":	null,
};

let gameplay = ["general","evidence","non_evidence","cursed_items","hunts","nerd_info"];

let checked = []; // Hold list of currently checked clues

window.onload = load;
function load() {

	// Add event listeners
	if (document.addEventListener) {
		document.addEventListener('click',		(e) => { click(e); },false);
		document.addEventListener('keydown',	(e) => { keydown(e); },false);
		document.addEventListener('keypress',	(e) => { keypress(e); },false);
		document.getElementById('lang').childNodes[0].addEventListener('change',(e) => { select_lang(e); });
	}

	// Load languages
	let lang_stored = do_storage('get','lang');
	if (lang_stored) { lang_use = lang_stored; }

	let lang_select = Object.assign(document.getElementById('lang').childNodes[0],{innerHTML:''});
	for (let key in langs) { if (langs.hasOwnProperty(key)) {
		let opt = Object.assign(document.createElement('OPTION'),{
			value:			key,
			innerHTML:	key,
			selected:		(key === lang_stored),
		});
		lang_select.appendChild(opt);
	} }

	// Load clues and ghosts into page
	if (parseInt(do_storage('get','dark').toString())) { toggle_dark(); }
	if (parseInt(do_storage('get','mute').toString())) {
		let sound = document.getElementById('sound').childNodes[1].childNodes[0];
		sound.checked = false;
		toggle_sound();
	}

	populate_phrases();
	populate_clues();
	populate_timers();
	set_timers();
	populate_ghosts(ghosts);
	populate_photos();
	populate_roll();

	// Populate maps
	let map_div = Object.assign(document.getElementById('maps'),{innerHTML:''});
	let count = 0;
	for (let key in maps) { if (maps.hasOwnProperty(key)) {
		let map = document.createElement('LI');
		map.setAttribute('data-map',key);

		let span = document.createElement('SPAN');
		let link = Object.assign(document.createElement('A'),{
			href:			'inc/' + maps[key].file,
			target:		'_blank',
			innerHTML:	langs[lang_use].phrases['map_' + key],
		});

		map.appendChild(span);
		map.appendChild(link);
		map_div.appendChild(map);

		if (!count) { setTimeout(() => { map_select(key); },20); }
		count++;
	} }
	// Populate maps

	// Populate difficulties
	populate_difficulties();

	// Populate gameplay
	populate_gameplay(lang_use);

	// Populate media
	for (let key in media) { if (media.hasOwnProperty(key)) {
		files[key] = new Audio('inc/' + media[key].file);
	} }
	// Populate media

}

function click(e) {
	let target				= e.target;
	let parent				= target.parentNode;
	let parent_parent	= parent.parentNode;
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
						if (target.nodeName === 'INPUT' && !clocks['main']) {
							for (let x = 0; x < parent.childNodes.length; x++) { if (parent.childNodes[x].nodeName === 'INPUT') {
								let child = parent.childNodes[x];
								child.classList.remove('current');
							} }
							val = parseInt(target.getAttribute('data-time'));
							target.classList.add('current');
							timer.innerHTML = val.toString();
						}
					}

				break;
				case 'DIV':

					if (in_array('exclude',target.classList)) {
						parent.classList.toggle('excluded');
					}

				break;
				case 'SPAN':

					let map = parent.getAttribute('data-map');
					if (map) { map_select(map); }

					let difficulty = parent.getAttribute('data-difficulty');
					if (difficulty) { difficulty_select(difficulty); }

					if (parent.nodeName === 'LABEL' && parent_parent.nodeName === 'LI') {
						setTimeout(function() { check_ghosts(); },10); // Give time for the checkbox to self-toggle
					}

					if (parent_parent.id === 'sound') {
						setTimeout(() => { toggle_sound(); },50);
					}

					let item;
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
								item = document.getElementById('sound').childNodes[1].childNodes[0];
								item.click();
							break;
							case parent_div.childNodes[0].childNodes[4]:
								reset();
							break;
						}
					}

				break;
				default:

				break;
			}

		break;
	}
}

function keydown(e) {
	let keycode	= e.key;
	let current	= document.activeElement;
	switch (keycode) {
		case 'Enter':
			if (current.id === 'ghostname') {
				current.blur();
			}
		break;
		case 'Escape':
			current.blur();
		break;
	}

	if (!in_array(current.type,['text'])) {

		if (document.getElementById('photos_check').checked) {

			let sliders = document.querySelectorAll('input[type=range]');
			if (in_array(keycode,['ArrowUp','ArrowDown'])) {
				let found = false;
				for (let x = 0; x < sliders.length; x++) { if (sliders[x] === current) {
					e.preventDefault();
					found = true;
					let item = x;
					if (keycode === 'ArrowUp') { // Up arrow
						item = (x ? x  : photo_count) - 1;
					} else { // Down arrow
						item = (x === (photo_count - 1) ? 0  : (x + 1));
					}
					sliders[item].focus();
				} }
				if (!found) { e.preventDefault(); sliders[(keycode === 'ArrowUp' ? photo_count - 1 : 0)].focus(); }
			}

		} else {

			let maps_div = document.getElementById('maps');
			let len = maps_div.childNodes.length;
			if (in_array(keycode,['[',']'])) {
				let found = false;
				for (let x = 0; x < len; x++) { if (maps_div.childNodes[x].childNodes[1] === current) {
					e.preventDefault();
					found = true;
					let item = x;
					if (keycode === '[') {
						item = (x ? x : len) - 1;
					} else {
						item = (x === (len - 1) ? 0 : (x + 1));
					}
					let map = maps_div.childNodes[item].childNodes[1];
					map.focus();
				} }
				if (!found) { e.preventDefault(); maps_div.childNodes[(keycode === '[' ? (len - 1) : 0)].childNodes[1].focus(); }
			}

		}

	}

}

function keypress(e) {
	let keycode	= e.key;
	let current	= document.activeElement;
	let parent	= current.parentNode;

	if (document.activeElement.getAttribute('type') !== 'text') {

		let item;
		switch (keycode.toLowerCase()) {
			case '+': case '=':
				difficulty_select_key(1);
			break;
			case '-':
				difficulty_select_key(-1);
			break;
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
			case 'g':
				item = document.getElementById('gameplay').childNodes[0];
				item.click();
				current.blur();
			break;
			case 'm':
				toggle_sound();
				item = document.getElementById('sound').childNodes[1].childNodes[0];
				item.click();
			break;
			case 'n':
				document.getElementById('ghostname').focus();
				e.preventDefault();
			break;
			case 's':
				item = document.getElementById('photos').childNodes[0];
				item.click();
				current.blur();
			break;
			case 'l':
				item = document.getElementById('roll').childNodes[0];
				item.click();
				current.blur();
			break;
			case 'x':
				reset();
			break;
			case ' ':
				let map = parent.getAttribute('data-map');
				if (map) { map_select(map); e.preventDefault(); }
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
				let clue = clues.childNodes[x].childNodes[1];
				if (clue.innerHTML === keycode) {
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
			let timer = timers[x];
			hotkey = timer.getAttribute('data-hotkey');
			if (hotkey && keycode.toLowerCase() === hotkey.toLowerCase()) {
				timer.click();
			} }
		}

	}

}

function select_lang(e) {
	lang_use = e.target.value;
	do_storage('set','lang',lang_use);

	populate_phrases();
	populate_clues();
	populate_timers();
	set_timers();
	populate_ghosts(ghosts);
	populate_photos();
	populate_roll();
	populate_difficulties();
	populate_gameplay();
}

function map_select(map) {
	use_map = map;
	let maps_ul = document.getElementById('maps');
	for (let x = 0; x < maps_ul.childNodes.length; x++) {
		let map_li = maps_ul.childNodes[x];
		let span = map_li.childNodes[0];
		span.classList.remove('selected');
		if (map_li.getAttribute('data-map') === map) { span.classList.add('selected'); }
	}
	set_timers();
}

function difficulty_select(difficulty) {
	use_diff = difficulty;
	let difficulties_ul = document.getElementById('difficulties');
	for (let x = 0; x < difficulties_ul.childNodes.length; x++) {
		let difficulty_li = difficulties_ul.childNodes[x];
		let span = difficulty_li.childNodes[0];
		span.classList.remove('selected');
		if (difficulty_li.getAttribute('data-difficulty') === difficulty) { span.classList.add('selected'); }
	}
	set_timers();
	check_ghosts();
}

function difficulty_select_key(val) {
	let difficulties_ul = document.getElementById('difficulties');
	for (let x = 0; x < difficulties_ul.childNodes.length; x++) {
		let difficulty_li = difficulties_ul.childNodes[x];
		let span = difficulty_li.childNodes[0];
		let target;
		if (in_array('selected',span.classList)) {
			target = difficulties_ul.childNodes[x + val]
			if (target) { target.childNodes[1].click(); }
			break;
		}
	}
	set_timers();
	check_ghosts();
}

function set_timers() {
	let map		= maps[use_map];
	let diff	= difficulties[use_diff];

	if (diff) {
		let timers_div = document.getElementById('timer_list');
		for (let x = 0; x < timers_div.childNodes.length; x++) {
			let timer = timers_div.childNodes[x];
			let index = timer.getAttribute('data-index');
			switch (index) {
				case 'start':
					timer.setAttribute('data-time',diff.timers['start']);
					timer.disabled = false;
				break;
				case 'hunt':
					if (map) {
						timer.setAttribute('data-time',diff.timers['hunt_' + map.size] + diff.timers['grace']);
						timer.disabled = false;
					}
				break;
				case 'cursed':
					if (map) {
						timer.setAttribute('data-time',diff.timers['hunt_' + map.size] + diff.timers['cursed']);
						timer.disabled = false;
					}
				break;
			}
			if (in_array('current',timer.classList)) { timer.click(); }
		}
	}
}

function do_timer(act,which) {
	let timer = timings[which];
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
						let timers_div = document.getElementById('timer_list');
						for (let x = 0; x < timers_div.childNodes.length; x++) {
							let timer = timers_div.childNodes[x];
							if (in_array('current',timer.classList)) {
								element.innerHTML = timer.getAttribute('data-time');
							}
						}
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

function toggle_dark(persistent = false) {
	if (!in_array('dark',document.body.classList)) {
		document.body.classList.add('dark');
		if (persistent) { do_storage('set','dark',1); }
	} else {
		document.body.classList.remove('dark');
		if (persistent) { do_storage('set','dark',0); }
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
	let alone_0 = document.getElementById('ghost').childNodes[1].childNodes[0];
	let alone_1 = document.getElementById('ghost').childNodes[2].childNodes[0];
	let alone_2 = document.getElementById('ghost').childNodes[3].childNodes[0];
	if (alone_0.checked) {
		alone_1.click();
	} else if (alone_1.checked) {
		alone_2.click();
	} else {
		alone_0.click();
	}
}

function toggle_sound() {
	sound = !sound;
	do_storage('set','mute',(sound ? '0' : '1'));
	let link = document.getElementById('links').childNodes[0].childNodes[3];
	link.classList.toggle('on');
}

function count_points(slider) {
	if (typeof slider !== 'undefined') { slider.parentNode.nextSibling.innerHTML = slider.value; }

	let result = 0;
	let points = 0;

	let counts = {};
	for (let x = 0; x < photo_count; x++) {
		let type = parseInt(document.getElementsByName('photo_' + x)[0].value);
		let slider = parseInt(document.getElementsByName('slider_' + x)[0].value);
		if (type && slider) {
			counts[type] = (counts[type] ? counts[type] : 0) + 1;
			if (!photos[type][5] || (photos[type][5] && photos[type][5] >= counts[type])) {
				points += photos[type][slider];
			}
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
	document.querySelector('div#photos > div > h2').innerHTML = points + 'P = $' + result;
}

function reset() {
	let check			= [];
	let clues_ul	= document.getElementById('clues');
	let ghosts_ul	= document.getElementById('ghosts');

	document.body.classList.toggle('hidden');
	setTimeout(function() { document.body.classList.toggle('hidden'); },200);

	for (let x = 0; x < ghosts_ul.childNodes.length; x++) {
		let ghost = ghosts_ul.childNodes[x];
		ghost.classList = [];
	}

	document.getElementById('ghostname').value = '';
	let ghost = document.getElementById('ghost').childNodes[1].childNodes[0];
	ghost.click();

	for (let x = 0; x < clues_ul.childNodes.length; x++) {
		check[0] = clues_ul.childNodes[x].childNodes[3].childNodes[0];
		check[1] = clues_ul.childNodes[x].childNodes[4].childNodes[0];
		if (check[0].checked) { check[0].nextSibling.click(); }
		if (check[1].checked) { check[1].nextSibling.click(); }
	}

	if (clocks['main']) { document.getElementById('play').click(); }
	let timers = document.getElementById('timers').childNodes[5];
	for (let x = 0; x < timers.childNodes.length; x++) { if (timers.childNodes[x].nodeName === 'INPUT') {
		let timer = timers.childNodes[x];
		if (in_array('current',timer.classList)) { timer.click(); break; }
	} }

	for (let x = 0; x <= photos.length; x++) {
		document.getElementsByName('photo_' + x)[0].value = 0;
		document.getElementsByName('slider_' + x)[0].value = 0;
		document.getElementsByName('slider_' + x)[0].parentNode.nextSibling.innerHTML = 0;
		count_points();
	}

	roll_select('clear');
}

// Modify this to check based on supplied evidence, difficulty and such, and return array of possible ghosts
// This will let us determine whether a given combination can be ruled out

function check_ghosts() {
	let diff			= difficulties[use_diff];
	let checked_y = [];
	let checked_n = [];
	let ul_clues = document.getElementById('clues');
	let x; // Counter
	let key; // General key

	// Structure: 'text','number','image','tick','cross'

	// Determine current state
	checked = []; // Clear global checklist
	for (x = 0; x < ul_clues.childNodes.length; x++) {
		let checkbox_y = ul_clues.childNodes[x].childNodes[3].childNodes[0];
		let checkbox_n = ul_clues.childNodes[x].childNodes[4].childNodes[0];
		let clue = ul_clues.childNodes[x];
		if (!checkbox_y.checked) { clue.classList.remove('selected'); } else {
			checked_y.push(checkbox_y.value);
			checked.push(checkbox_y.value);
			clue.classList.add('selected');
		}
		if (checkbox_n.checked) { checked_n.push(checkbox_n.value); }
	}

	// Take a copy of the ghost object for us to eliminate ghosts
	let possible = clone(ghosts);

	// Eliminate ghosts based on positive selection
	for (key in possible) { if (possible.hasOwnProperty(key)) {
		for (x = 0; x < checked_y.length; x++) {
			if (!in_array(checked_y[x],possible[key]['clues'])) { delete possible[key]; break }
		}
	} }

	/*
	// Eliminate ghosts based on non-selected "always" clues
	if (diff.use_always_clues && checked_y.length === 2) {
		for (let key in possible) { if (possible.hasOwnProperty(key)) {
			for (let x = 0; x < possible[key]['clues_always'].length; x++) {
				if (!in_array(possible[key]['clues_always'][x],checked_y)) { delete possible[key]; break; }
			}
		} }
	}
	*/

	// Eliminate ghosts based on non-selected "always" clues
	if (diff.use_always_clues) {
		for (let key in possible) { if (possible.hasOwnProperty(key)) {

			// Get the number of clues matched per ghost
			let matched = [];
			for (let x = 0; x < checked_y.length; x++) {
				if (in_array(checked_y[x],possible[key]['clues'])) { matched.push(checked_y[x]); }
			}

			// If all but one clue is matched for a particular ghost, and a required clue isn't one of them, exclude the ghost
			if (possible[key]['clues'].length - matched.length === 1) {
				for (let x = 0; x < possible[key]['clues_always'].length; x++) {
					if (!in_array(possible[key]['clues_always'][x],checked_y)) { delete possible[key]; break; }
				}
			}

		} }
	}

	// Eliminate ghosts based on negative selection
	for (let key in possible) { if (possible.hasOwnProperty(key)) {
		for (x = 0; x < checked_n.length; x++) {
			if (in_array(checked_n[x],possible[key]['clues'])) { delete possible[key]; break }
		}
	} }

	show_ghosts(possible);
}

function populate_phrases() {
	let phrases = document.querySelectorAll('*[data-phrase]');
	for (let x = 0; x < phrases.length; x++) {
		let attr = phrases[x].getAttribute('data-phrase');
		let string = langs[lang_use].phrases[attr];
		if (string) {
			if (phrases[x].nodeName === 'INPUT') {
				phrases[x].value = string;
			} else {
				phrases[x].innerHTML = string;
			}
		}
	}
}

function populate_clues() {
	let clues_ul = Object.assign(document.getElementById('clues'),{innerHTML:''});
	let count = 0;
	for (let x = 0; x < clues.length; x++) {
		count++;
		let li					= document.createElement('LI');
		let span_number	= document.createElement('SPAN');
		let span_image	= document.createElement('SPAN');
		let span_y			= document.createElement('SPAN');
		let span_n			= document.createElement('SPAN');
		let label_y			= document.createElement('LABEL');
		let label_n			= document.createElement('LABEL');
		let check_y			= document.createElement('INPUT');
		let check_n			= document.createElement('INPUT');

		li.setAttribute('data-clue',clues[x]);
		li.innerHTML = langs[lang_use].phrases['clue_' + clues[x]];
		check_y.name = 'clue_y[]'; check_y.type = 'checkbox'; check_y.value = clues[x];
		check_n.name = 'clue_n[]'; check_n.type = 'checkbox'; check_n.value = clues[x];

		span_number.innerHTML = count.toString();

		label_y.appendChild(check_y); label_y.appendChild(span_y);
		label_n.appendChild(check_n); label_n.appendChild(span_n);
		li.appendChild(span_number);
		li.appendChild(span_image);
		li.appendChild(label_y); li.appendChild(label_n);

		// Structure: 'text','number','image','tick','cross'

		clues_ul.appendChild(li);
	}
}

function populate_timers() {
	let timers_div = Object.assign(document.getElementById('timer_list'),{innerHTML:''});
	let hotkeys = ['Q','W','E','R','T','Y','U','I','O','P'];
	let count = 0;
	for (let key in timers) { if (timers.hasOwnProperty(key)) {
		let timer = Object.assign(document.createElement('INPUT'),{
			type:				'button',
			name:				'timer[]',
			disabled:		timers[key].disabled,
		});
		timer.setAttribute('data-index',key);
		timer.setAttribute('data-time',timers[key].time);
		timer.setAttribute('data-hotkey',hotkeys[count]);
		timer.setAttribute('data-phrase','timer_' + key);
		timer.setAttribute('value','[' + hotkeys[count] + '] ' + langs[lang_use].phrases['timer_' + key]);
		if (timers[key].default) {
			timer.classList.add('current');
			document.getElementById('timer').innerHTML = timers[key].time.toString();
		}
		timers_div.appendChild(timer);
		count++;
	} }
}

function populate_ghosts(ghosts) {
	// Structure: 'text','number','image','tick','cross'

	// Display descriptions of all applicable ghosts
	let ghosts_ul = document.getElementById('ghosts');

	// Remove any entries for re-population
	while (ghosts_ul.firstChild) { ghosts_ul.removeChild(ghosts_ul.lastChild); }

	for (let key in ghosts) { if (ghosts.hasOwnProperty(key)) {
		let content = document.createElement('LI');
		content.setAttribute('data-type',key);
		let exclude = Object.assign(document.createElement('DIV'),{classList:['exclude'],title:'Exclude ghost'});
		let heading = Object.assign(document.createElement('h3'),{innerHTML:langs[lang_use].phrases['ghost_' + key]});

		let icons = document.createElement('SPAN');
		for (let x = 0; x < ghosts[key]['clues'].length; x++) {
			let icon = document.createElement('SPAN');
			icon.setAttribute('data-type',ghosts[key]['clues'][x]);
			if (in_array(ghosts[key]['clues'][x],checked)) { icon.classList.add('checked'); }
			icon.title = langs[lang_use].phrases['clue_' + ghosts[key]['clues'][x]];
			icons.appendChild(icon);
		}
		heading.appendChild(icons);
		content.appendChild(exclude);
		content.appendChild(heading);

		let desc = document.createElement('P');
		desc.innerHTML = ghosts[key]['description'];

		let useful_container = document.createElement('UL');
		let useful = langs[lang_use].phrases['ghost_' + key + '_useful'];
		if (!useful.length) {
			useful_container.appendChild(Object.assign(document.createElement('LI'),{innerHTML: langs[lang_use].phrases.no_info}));
		} else {
			for (let x = 0; x < useful.length; x++) {
				useful_container.appendChild(Object.assign(document.createElement('LI'),{innerHTML: useful[x]}));
			}
		}
		content.appendChild(useful_container);

		ghosts_ul.appendChild(content);
	} }

}

function populate_photos() {
	let tbody = Object.assign(document.querySelector('div#photos tbody'),{innerHTML:''});
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
			opt.innerHTML = langs[lang_use].phrases['photo_' + photos[y][0]];
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
}

function populate_roll() {
	let roll_container = document.querySelector('div#roll > div');
	let count = 1; // Child element to start with
	for (let roll in rolls) { if (rolls.hasOwnProperty(roll)) {

		let div = Object.assign(roll_container.childNodes[count],{innerHTML:'',className:'roll_group'});

		let div_groups = document.createElement('DIV');
		for (let group in rolls[roll].groups) { if (rolls[roll].groups.hasOwnProperty(group)) {
			let item = document.createElement('SPAN');
			item.setAttribute('data-name',roll + '_' + group);
			item.innerHTML = langs[lang_use].phrases['roll_cat_' + group];
			div_groups.appendChild(item);
			item.addEventListener('click',() => { roll_select(item); });
		} }
		div.appendChild(div_groups);

		let div_items = document.createElement('DIV');
		for (let x = 0; x < rolls[roll].items.length; x++) {
			let item = rolls[roll].items[x];

			let item_prefix = 'item_' + roll + '_';
			let check		= document.createElement('INPUT');
			check.type	= 'checkbox';
			check.id		= item_prefix + item;
			check.name	= 'item[]';
			check.setAttribute('data-name',item);

			let label = document.createElement('LABEL');
			label.setAttribute('for',item_prefix + item);
			label.setAttribute('data-name',item);

			let span				= document.createElement('SPAN');
			span.innerHTML	= langs[lang_use].phrases['roll_' + item];

			label.appendChild(span);
			div_items.appendChild(check);
			div_items.appendChild(label);

		}
		div.appendChild(div_items);

		let input = Object.assign(document.createElement('INPUT'),{
			type:		'button',
			value:	'Roll ' + langs[lang_use].phrases['roll_cat_' + roll],
		});
		div.appendChild(input);
		input.addEventListener('click',() => { roll_submit(div); });

		count++; // Move to next child element

	} }
}

function populate_difficulties() {
	let difficulties_div = Object.assign(document.getElementById('difficulties'),{innerHTML:''});
	let count = 0;
	for (let key in difficulties) { if (difficulties.hasOwnProperty(key)) {
		let difficulty = document.createElement('LI');
		difficulty.setAttribute('data-difficulty',key);

		let span = document.createElement('SPAN');
		let name = Object.assign(document.createElement('SPAN'),{
			innerHTML:	langs[lang_use].phrases['diff_' + key],
		});

		difficulty.appendChild(span);
		difficulty.appendChild(name);
		difficulties_div.appendChild(difficulty);

		if (!count) { setTimeout(() => { difficulty_select(key); },20); }
		count++;
	} }
}

function populate_gameplay() {
	let gameplay_div = Object.assign(document.getElementById('gameplay'),{innerHTML:''});
	for (let x = 0; x < gameplay.length; x++) {
		let div = Object.assign(document.createElement('DIV'),{classList: ['body']});
		let list = document.createElement('OL');

		let phrases = langs[lang_use].phrases['gameplay_' + gameplay[x] + '_items'];
		for (let x = 0 ; x < phrases.length; x++) {
			list.appendChild(Object.assign(document.createElement('LI'),{innerHTML: phrases[x]}));
		}

		div.appendChild(Object.assign(document.createElement('H3'),{innerHTML: langs[lang_use].phrases['gameplay_' + gameplay[x]] + ':'}));
		div.appendChild(list);
		gameplay_div.appendChild(div);
	}
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
		let choice_opt_y = clue.childNodes[3].childNodes[0];
		let choice_opt_n = clue.childNodes[4].childNodes[0];
		if (!in_array(clue.getAttribute('data-clue'),available_clues)) { // If this clue isn't applicable, disable it

			clue.classList.add('disabled');

			// Disable this clue's unchecked choices

			if (!choice_opt_y.checked) { choice_opt_y.disabled = true; }
			if (!choice_opt_n.checked) { choice_opt_n.disabled = true; }

		} else { // If this clue is applicable, enable its selection

			clue.classList.remove('disabled');

			// Re-enable this clue's positive and negative choices
			choice_opt_y.disabled = false;
			choice_opt_n.disabled = false;

			// When this clue is marked positive, disable its negative option
			if (choice_opt_y.checked) {
				choice_opt_n.disabled = true;
			}

		}
	}

	let ghosts_ul = document.getElementById('ghosts');
	let ghost;

	for (let x = 0; x < ghosts_ul.childNodes.length; x++) {
		ghost = ghosts_ul.childNodes[x];

		for (let y = 0; y < ghost.childNodes[1].childNodes[1].childNodes.length; y++) {
			let ghost_child = ghost.childNodes[1].childNodes[1].childNodes[y];
			ghost_child.classList.remove('checked');
		}

		if (ghosts.hasOwnProperty(ghost.getAttribute('data-type'))) { // If this ghost is in the valid choices
			for (let y = 0; y < ghost.childNodes[1].childNodes[1].childNodes.length; y++) {
				clue = ghost.childNodes[1].childNodes[1].childNodes[y];
				clue.classList.remove('checked');
				if (in_array(ghosts[ghost.getAttribute('data-type')]['clues'][y],checked)) { // EMF, etc. is selected
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
				let item = roll_groups[x].childNodes[1].childNodes[y];
				if (item.nodeName === 'INPUT') { item.checked = false; }
			}
		}

	} else {

		let roll = item.getAttribute('data-name').split('_');
		let roll_items = item.parentNode.nextSibling;
		for (let x = 0; x < roll_items.childNodes.length; x++) {
			if (roll_items.childNodes[x].nodeName === 'INPUT') {
				let item = roll_items.childNodes[x];
				item.checked = false;
				item.className = '';

				let check_name = item.getAttribute('data-name');
				if (in_array(check_name,rolls[roll[0]].groups[roll[1]].items)) {
					item.checked = true;
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
	if (obj == null || typeof obj != 'object') { return obj; }
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

function do_storage(act,name,value = '') {
	name = prefix + name;
	let result = '';
	switch (act) {
		case 'set': localStorage.setItem(name,value); break;
		case 'get': result = localStorage.getItem(name); if (result === null) { result = ''; } break;
		case 'del': localStorage.removeItem(name); break;
	}
	return result;
}
