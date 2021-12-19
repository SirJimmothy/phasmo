
let gameplay = {
	'Gameplay': [
		'Crouching reduces your visible area to the ghost, and allows you to see the floor in dark areas',
		'Sprinting allows movement at 150% for 3.5s with 5s cooldown - scales for partial use',
		'Bones can spawn in any unenclosed locations; will not spawn in cabinets, but can spawn inside raised door frames, towels, and carpets',
		'Ghost events (ghost appearance, walking to a player, mist balls, and loud breaths) reduce the target\'s sanity by 10%. All ghost events target a single player, and the ghost can teleport near a player in order to perform an event',
		'Ghosts can only hear player microphones (and held electronics) in an 8M radius on the same floor',
		'The breaker will always start on in Amateur difficulty, and off in all others',
		'Up to 9 lights witches may be on on small maps, 8 on medium, and 7 on large maps',
		'If the breaker is popped by turning on too many lights, all lights will be switched off',
	],
	'Evidence items': [
		'Thermometers update slowly; have patience',
		'Freezing temps counts as below 0&deg;C or 32&deg;F, or if you see breath mist',
		'EMF values: 2 for interaction; 3 for throw; 4 for ghost event. 25% chance to become 5 for EMF 5 ghosts',
		'Truck EMF board registers EMF as 1 less than real values, with optional extra +/-1 variation: EMF 3 can show as 1, 2 or 3',
		'Spirit boxes will work anywhere inside the map, but the ghost will only listen to someone in a room with no lights on, within 3M of the ghost',
		'DOTS sensors show periodic moving silhouettes of ghosts, if the ghost is in the room',
		'Video and regular cameras can see ghost orbs. Ghost orbs move around the room and behave like bubbles',
		'When written in, writing books will levitate and the pen will scribble - this can be observed via cameras',
		],
	'Non-Evidence Items': [
		'Cameras can be used to take photos of fingerprints, footsteps, ghosts, bones, dead bodies, dirty water, and general interactions',
		'Photo opportunities last 20s from inception. The closer, the better quality and the more money received',
		'For dirty water and ghost writing, two photos can be taken: once for the photo itself and another for the interaction event',
		'Sound sensors reveal room names in the truck, and indicate interactions within an area',
		'Paramic has 40M range (your ears hear further), but can detect inaudible interactions',
		'UV lights and glowsticks illuminate fingerprints and footsteps (fingerprints fade after 2m). Glowsticks dim after 1m',
		'Footsteps are made after the ghost steps in salt; place at chokepoints to increase chance',
		'Sanity pills raise individual sanity by 40% (amateur), 35% (intermed.), 30% (pro), 25% (nightmare)',
		'Candles prevent passive sanity loss within a 1M radius (held or placed)',
		'Crucifixes prevent ghosts from hunting within a 3M radius (held or placed)',
		'Once a crucifix prevents a hunt, the ghost may not attempt to hunt for 5s',
		'Smudge sticks prevent hunts within 6M range twice; at the start and 6s later. Smudges cannot be stacked',
	],
	'Cursed Items': [
		'All maps will contain one cursed item: ouija board, tarot cards, voodoo doll or mirror',
		'Cursed items will start a hunt when they run out or break',
		'Cursed hunts cannot be prevented, have a 1s grace period, are 20s longer, and subsequent hunts follow suit',
		'Ghosts make no noise during cursed hunts',
		'Ouija board questions cost 5% for sanity, age, and length of death questions, 20% number of people in room questions, and 40% for location questions. Demons take 20% less sanity for successful questions',
		'Always say goodbye to the ouija board before walking away - or be hunted!',
		'Mirrors will show the area of the ghost room, but drain sanity by 7.5% per second',
		'Music boxes will attract a nearby ghost and make it sing and try to find the box; sanity drops when music is audible',
		'If the box is &lt;5M from the ghost and the player gets close to the ghost during music, the ghost will spawn, and upon reaching the music box or after 5s spawned, will attempt to hunt',
		'Using a voodoo doll will make the ghost perform an interaction, at the cost of 10% sanity. The heart pin will trigger a hunt',
		'Using a voodoo doll at &lt;10% sanity uses all pins and begins a hunt',
		'Using a summoning circle will cost 80% sanity and trigger a ghost event',
		'Tarot cards: Tower forces interaction / Devil forces ghost event / Death forces hunt / Fortune gives +/- 25% sanity / Sun gives 100% sanity / Moon takes 100% sanity / Hermit Returns ghost to their room / Hanged Man kills the player / Priestess revives dead teammate / Fool repeats previous card',
		'Lighting the summoning circle during a hunt will result in your immediate death',
	],
	'Hunts': [
		'Hunts can occur once the average sanity of the group falls below 50%. The frequency of hunt attempts depends on the individual ghost, however the lower the average sanity, the higher the hunt chance',
		'When a hunt starts, all outer doors become locked and light switches cannot be used',
		'Grace periods: All difficulties have 3s after hunt commencement before the ghost searches for players. Nightmare difficulty has 1s',
		'Once a hunt ends, there is a 25s cooldown after which another hunt may be attempted',
		'In Nightmare difficulty, if a player dies during a hunt, the hunt length will be extended',
		'Ghosts move at base player speed, which rapidly increases whenever chasing a player, up to 150%. When LoS is lost, ghost maintains current speed until they reach last LoS point, after which they slowly reduce to base speed',
		'Ghosts can only hear player microphones - other sounds do not attract the ghost',
		'Ghosts can detect powered-on player-held electronics (incl. flashlights, but not headcams) within their hearing range; turn off or toggle away from these to avoid detection',
		'Doors block line of sight; closing these behind you can prevent the ghost from gaining speed',
		'Players can hide behind doors while holding them - ghosts may move unheld doors, exposing hidden players',
		'If a ghost sees a player enter a closet or locker, they will attempt to open them, even if the doors are held. Keep pulling them closed to survive',
		'Making sound or activating electronics inside a locker will cause the ghost to force open the doors; this is rarely survivable',
		'Smudge sticks may be used within 6M of a ghost to cause the ghost to wander randomly and forget all targets for 6s',
		'Smudge sticks may also be used by a non-chased player, even in the truck, if the ghost is chasing another player',
	],
};

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
			"Hunts only its target, unless target is outside",
			"Can teleport to target at start of hunt, if they had ghost LoS within 20s",
			'Prefers singing during ghost events',
			"May shriek through paramic",
		],
	},
	"demon": {
		"name":					"Demon",
		"clues":				['prints','temps','writing'],
		"useful":				[
			"Can hunt at any sanity level",
			"Successful ouija board questions cost no extra sanity",
			"Smudges last 2/3 as long: 60s",
		],
	},
	"goryo": {
		"name":					"Goryo",
		"clues":				['emf','dots','prints'],
		"useful":				[
			'Rarely roams outside its ghost room',
			"Won\'t show dots with people in the ghost room",
			"Dots can only be observed through a camera",
			"Nightmare mode: dots are guaranteed",
		],
	},
	"hantu": {
		"name":					"Hantu",
		"clues":				['orb','prints','temps'],
		"useful":				[
			"Moves ~15% slower in warmer rooms",
			"Moves ~15% faster in colder rooms",
			'Can breathe mist when hunting',
		],
	},
	"jinn": {
		"name":					"Jinn",
		"clues":				['emf','prints','temps'],
		"useful":				[
			"Will not turn off breaker",
			"With breaker on, chance to drop sanity by 25% within 3m",
			"During hunt with breaker on, will be 2.5x player speed until within 2m of target",
		],
	},
	"mare": {
		"name":					"Mare",
		"clues":				['box','orb','writing'],
		"useful":				[
			"Cannot turn light switches on",
			"Prefers to turn off lights as interactions",
			"Can instantly turn off switches as they are turned on",
			'Prefers to blow up lights during ghost events',
			"Room lights on reduces hunt threshold to 40%",
			"Room lights off increases hunt threshold to 60%",
		],
	},
	"mimic": {
		"name":					"Mimic",
		"clues":				['box','prints','temps'],
		"useful":				[
			'Can behave as any other ghost, including hunt behaviour and triggers',
			"Shows false ghost orbs",
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
	"obake": {
		"name":					"Obake",
		"clues":				['emf','orb','prints'],
		"useful":				[
			"Can leave 6-finger fingerprints",
			"-25% chance to leave fingerprints",
			"Fingerprints can disappear after 30s",
			"Nightmare mode: fingerprints are guaranteed",
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
	"onryo": {
		"name":					"Onryo",
		"clues":				['box','orb','temps'],
		"useful":				[
			"Can hunt from 60% sanity without flame in room",
			"Chance to hunt when flame is extinguished",
			"The more dead players, the higher hunt chance when flame extinguished",
			"Flames act as crucifixes; 3M hunt blocking range. Has precedence over crucifix",
			"When flame prevents hunt, it is blown out",
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
	"raiju": {
		"name":					"Raiju",
		"clues":				['dots','emf','orb'],
		"useful":				[
			"Can hunt at 70% when near electronics",
			"Increases speed during hunt when near electronics",
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
			'Very inactive',
			'Prefers breath ghost events',
			'Cannot hunt above 35% sanity',
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
	"twins": {
		"name":					"Twins",
		"clues":				['box','emf','temps'],
		"useful":				[
			"Both twins can interact simultaneously",
			"Decoy twin will give no evidence (except EMF) or trigger sensors",
			"During hunts, main twin moves at -10%, decoy moves at +10%",
			'Cursed hunts can occur from either twin location',
		],
	},
	"wraith": {
		"name":					"Wraith",
		"clues":				['box','emf','dots'],
		"useful":				[
			"When loud-stepping after salt, no footprints show",
			"After stepping in salt, becomes permanently more active",
			"Can teleport near a random indoor player and leave EMF",
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
			"Chance to drop sanity by 14% within 3m",
			'Ability can pretend to be a ghost event (lights will not turn off)',
			"Cannot roam while smudged",
		],
	}
};

let photos = [
	['--------',			0,0,0],
	['Bone',					40,55,70],
	['Cursed Item',		30,45,60],
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
			'maple':			'Maple Lodge Campsite',
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
		let all = rolls[key].groups.all;
		all.items.push(key2);
	} }
} }

let maps = [
	{'name':'Tanglewood Street',			'file':'map_tanglewood.png'},
	{'name':'Willow Street',					'file':'map_willow.png'},
	{'name':'Ridgeview Road',					'file':'map_ridgeview.png'},
	{'name':'Edgefield Street',				'file':'map_edgefield.png'},
	{'name':'Grafton Farmhouse',			'file':'map_grafton.png'},
	{'name':'Bleasdale Farmhouse',		'file':'map_bleasdale.png'},
	{'name':'Brownstone High School',	'file':'map_highschool.png'},
	{'name':'Maple Lodge Campsite',		'file':'map_maple.png'},
	{'name':'Prison',									'file':'map_prison.png'},
	{'name':'Asylum',									'file':'map_asylum.png'},
];

let files = {};
let media = {
	'click':	{'type':'audio','file':'click.mp3'},
	'alarm':	{'type':'audio','file':'alarm.mp3'},
};

if (document.addEventListener) {
	document.addEventListener('click',		(e) => { click(e); },false);
	document.addEventListener('keydown',	(e) => { keydown(e); },false);
	document.addEventListener('keypress',	(e) => { keypress(e); },false);
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

window.onload = load;
function load() {

	// Populate gameplay
	let gameplay_div = document.getElementById('gameplay');
	for (let key in gameplay) if (gameplay.hasOwnProperty(key)) { {
		let div = Object.assign(document.createElement('DIV'),{classList: ['body']});
		let list = document.createElement('OL');
		for (let x = 0 ; x < gameplay[key].length; x++) {
			list.appendChild(Object.assign(document.createElement('LI'),{innerHTML: gameplay[key][x]}));
		}
		div.appendChild(Object.assign(document.createElement('H3'),{innerHTML: key + ':'}));
		div.appendChild(list);
		gameplay_div.appendChild(div);
	} }

	// Load clues and ghosts into page

	if (parseInt(getcookie('dark').toString())) { toggle_dark(); }
	if (parseInt(getcookie('mute').toString())) {
		let sound = document.getElementById('sound').childNodes[0].childNodes[0];
		sound.checked = false;
		toggle_sound();
	}

	let clues_ul = document.getElementById('clues');
	let count = 0;

	// Populate clues
	for (let key in clues) {
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
	for (let x = 0; x < timers.length; x++) {
		let timer = timers[x];
		if (timers[x].nodeName === 'INPUT' && timer.getAttribute('data-hotkey') === 'true') {
			timer.setAttribute('data-hotkey',hotkeys[count]);
			timer.value = '[' + hotkeys[count] + '] ' + timer.value;
			count++;
		}
	}

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
							let grace = 3;
							switch (target.name) {
								case 'button_01': val = 300;					break;
								case 'button_02': val = 150;					break;
								case 'button_03': val = 90;						break;
								case 'button_04': val = 180;					break;
								case 'button_05': val = 60;						break;
								case 'button_06': val = 25;						break;
								case 'button_07': val = 0;						break;
								case 'button_08': val = 20 + grace;		break;
								case 'button_09': val = 40 + grace;		break;
								case 'button_10': val = 50 + grace;		break;
								case 'button_11': val = 23 + grace;		break;
								case 'button_12': val = 43 + grace;		break;
								case 'button_13': val = 53 + grace;		break;
								case 'button_14': val = 33 + grace;		break;
								case 'button_15': val = 53 + grace;		break;
								case 'button_16': val = 63 + grace;		break;
							}
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
				default:

					if (target.nodeName === 'SPAN' && parent.nodeName === 'LABEL' && parent_parent.nodeName === 'LI') {
						setTimeout(function() { check_ghosts(); },10); // Give time for the checkbox to self-toggle
					}
					if (target.nodeName === 'SPAN' && parent_parent.id === 'sound') {
						setTimeout(() => {
							toggle_sound();
						},50);
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
								item = document.getElementById('sound').childNodes[0].childNodes[0];
								item.click();
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
					let map = maps_div.childNodes[item].childNodes[0];
					map.focus();
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

		let item;
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
			case 'g':
				item = document.getElementById('gameplay').childNodes[0];
				item.click();
				current.blur();
			break;
			case 'm':
				toggle_sound();
				item = document.getElementById('sound').childNodes[0].childNodes[0];
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
						element.innerHTML = timer.start.toString();
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
	setcookie('mute',(sound ? '0' : '1'));
	let link = document.getElementById('links').childNodes[0].childNodes[3];
	link.classList.toggle('on');
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
	let check			= [];
	let clues			= document.getElementById('clues');
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

	for (let x = 0; x < clues.childNodes.length; x++) {
		check[0] = clues.childNodes[x].childNodes[3].childNodes[0];
		check[1] = clues.childNodes[x].childNodes[4].childNodes[0];
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
		let clue = ul_clues.childNodes[x];
		if (!checkbox_y.checked) { clue.classList.remove('selected'); } else {
			checked_y.push(checkbox_y.value);
			checked.push(checkbox_y.value);
			clue.classList.add('selected');
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

	// Remove any entries for re-population
	while (ghosts_ul.firstChild) { ghosts_ul.removeChild(ghosts_ul.lastChild); }

	for (let key in ghosts) { if (ghosts.hasOwnProperty(key)) {
		let content = document.createElement('LI');
		content.setAttribute('data-type',key);
		let exclude = Object.assign(document.createElement('DIV'),{classList:['exclude'],title:'Exclude ghost'});
		let heading = Object.assign(document.createElement('h3'),{innerHTML:key});

		let icons = document.createElement('SPAN');
		for (let x = 0; x < ghosts[key]['clues'].length; x++) {
			let icon = document.createElement('SPAN');
			icon.setAttribute('data-type',ghosts[key]['clues'][x]);
			if (in_array(ghosts[key]['clues'][x],checked)) { icon.classList.add('checked'); }
			icon.title = clues[ghosts[key]['clues'][x]];
			icons.appendChild(icon);
		}
		heading.appendChild(icons);
		content.appendChild(exclude);
		content.appendChild(heading);

		let desc = document.createElement('P');
		desc.innerHTML = ghosts[key]['description'];

		let useful_container = document.createElement('UL');
		for (let x = 0; x < ghosts[key]['useful'].length; x++) {
			useful_container.appendChild(Object.assign(document.createElement('LI'),{innerHTML: ghosts[key]['useful'][x]}));
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
		let choice_opt_1 = clue.childNodes[3].childNodes[0];
		let choice_opt_2 = clue.childNodes[4].childNodes[0];
		if (!in_array(clue.getAttribute('data-clue'),available_clues)) { // If this clue isn't applicable, disable it

			clue.classList.add('disabled');

			// Disable this clue's unchecked choices

			if (!choice_opt_1.checked) { choice_opt_1.disabled = true; }
			if (!choice_opt_2.checked) { choice_opt_2.disabled = true; }

		} else { // If this clue is applicable, enable its selection

			clue.classList.remove('disabled');

			// Re-enable this clue's positive and negative choices
			choice_opt_1.disabled = false;
			choice_opt_2.disabled = false;

			// When this clue is marked positive, disable its negative option
			if (choice_opt_1.checked) {
				choice_opt_2.disabled = true;
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
