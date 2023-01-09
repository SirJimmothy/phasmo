
let ghosts = {
	banshee:			{clues: ["dots","prints","orb"],				clues_always: [],         clues_fake: []},
	demon:				{clues: ["prints","temps","writing"],		clues_always: [],         clues_fake: []},
	deogen:				{clues: ["box","dots","writing"],				clues_always: ['box'],    clues_fake: []},
	goryo:				{clues: ["emf","dots","prints"],				clues_always:	["dots"],   clues_fake: []},
	hantu:				{clues: ["orb","prints","temps"],				clues_always: ["temps"],  clues_fake: []},
	jinn:					{clues: ["emf","prints","temps"],				clues_always: [],         clues_fake: []},
	mare: 				{clues: ["box","orb","writing"],				clues_always: [],         clues_fake: []},
	mimic:				{clues: ["box","orb","prints","temps"],	clues_always: ["orb"],    clues_fake: ["orb"]},
	moroi:				{clues: ["box","temps","writing"],			clues_always: ['box'],    clues_fake: []},
	myling:				{clues: ["emf","prints","writing"],			clues_always: [],         clues_fake: []},
	obake:				{clues: ["emf","orb","prints"],					clues_always: ["prints"], clues_fake: []},
	oni:					{clues: ["emf","dots","temps"],					clues_always: [],         clues_fake: []},
	onryo:				{clues: ["box","orb","temps"],					clues_always: [],         clues_fake: []},
	phantom:			{clues: ["box","dots","prints"],				clues_always: [],         clues_fake: []},
	poltergeist:	{clues: ["box","prints","writing"],			clues_always: [],         clues_fake: []},
	raiju:				{clues: ["dots","emf","orb"],						clues_always: [],         clues_fake: []},
	revenant:			{clues: ["orb","temps","writing"],			clues_always: [],         clues_fake: []},
	shade:				{clues: ["emf","temps","writing"],			clues_always: [],         clues_fake: []},
	spirit:				{clues: ["box","emf","writing"],				clues_always: [],         clues_fake: []},
	thaye:				{clues: ["dots","orb","writing"],				clues_always: [],         clues_fake: []},
	twins:				{clues: ["box","emf","temps"],					clues_always: [],         clues_fake: []},
	wraith:				{clues: ["box","emf","dots"],						clues_always: [],         clues_fake: []},
	yokai:				{clues: ["box","dots","orb"],						clues_always: [],         clues_fake: []},
	yurei:				{clues: ["orb","dots","temps"],					clues_always: [],         clues_fake: []},
};

let timers = {
	start:					{name:"Start",					time:300,	default:false,	disabled:true},
	hunt:						{name:"Hunt",						time:0,		default:false,	disabled:true},
	cursed:					{name:"Cursed Hunt",		time:0,		default:false,	disabled:true},
	post_hunt:			{name:"Post-Hunt",			time:25,	default:false,	disabled:false},
	smudge:					{name:"Smudge",					time:90,	default:true,		disabled:false},
	smudge_spirit:	{name:"Spirit Smudge",	time:180,	default:false,	disabled:false},
	smudge_demon:		{name:"Demon Smudge",		time:60,	default:false,	disabled:false},
};

let maps = {
	bleasdale:	{size:"sml",file:"map_bleasdale.png"},
	brownstone:	{size:"med",file:"map_highschool.png"},
	edgefield:	{size:"sml",file:"map_edgefield.png"},
	grafton:		{size:"sml",file:"map_grafton.png"},
	maple:			{size:"med",file:"map_maple.png"},
	prison:			{size:"med",file:"map_prison.png"},
	ridgeview:	{size:"sml",file:"map_ridgeview.png"},
	sunny:			{size:"lar",file:"map_sunny_meadows.png"},
	tanglewood:	{size:"sml",file:"map_tanglewood.png"},
	willow:			{size:"sml",file:"map_willow.png"},
	woodwind:		{size:"sml",file:"map_woodwind.png"},
};

// Cursed hunts ignore the default grace period, so the cursed hunt grace period is added to the cursed hunt timer
let difficulties = {
	ama:	{timers:{start:300,	hunt_sml:20,hunt_med:35,hunt_lar:50,grace:5,cursed:21},hidden_clues:0},
	int:	{timers:{start:150,	hunt_sml:24,hunt_med:44,hunt_lar:54,grace:4,cursed:21},hidden_clues:0},
	pro:	{timers:{start:0,		hunt_sml:33,hunt_med:53,hunt_lar:63,grace:3,cursed:21},hidden_clues:0},
	har:	{timers:{start:0,		hunt_sml:33,hunt_med:53,hunt_lar:63,grace:2,cursed:21},hidden_clues:1},
};

let clues = ["dots","emf","prints","temps","orb","writing","box"];

let photos = [
	// ["phrase",			1st,2st,3st,limit]
	["none",					0,	0,	0,	0],
	["bone",					2,	5,	10,	1],
	["cursed_item",		1,	2,	5,	1],
	["dead_body",			1,	2,	5,	0],
	["dots_ghost",		1,	2,	5,	0],
	["dirty_water",		2,	5,	10,	0],
	["finger_prints",	1,	2,	5,	0],
	["footsteps",			1,	2,	5,	0],
	["ghost",					5,	10,	20,	1],
	["ghost_writing",	1,	2,	5,	0],
	["interaction",		1,	2,	5,	0],
	["stepped_salt",	1,	2,	5,	0],
	["used_crucifix",	2,	5,	10,	0],
];
let photo_count = 10;
let star_count = 3;

let rolls = {
	maps:{
		items:["bleasdale","brownstone","edgefield","grafton","maple","prison","ridgeview","sunny","tanglewood","willow","woodwind"],
		groups:{
			clear:	{items:[]},
			all:		{items:[]},
			small:	{items:["bleasdale","edgefield","grafton","ridgeview","tanglewood","willow","woodwind"]},
			medium:	{items:["brownstone","maple","prison"]},
			large:	{items:["sunny"]},
		},
	},
	items:{
		items:["can","cru","dot","emf","fla","gwb","glo","lig","mos","par","cam","sal","san","sms","snd","spb","sfl","thm","tri","uvl","vid"],
		groups:{
			clear:			{items:[]},
			all:				{items:[]},
			evidence:		{items:["emf","dot","gwb","spb","thm","uvl","vid"]},
			secondary:	{items:["can","cru","fla","glo","lig","mos","par","cam","sal","san","sms","snd","sfl","tri"]},
			lights:			{items:["can","fla","sfl"]},
			electric:		{items:["emf","dot","fla","mos","par","cam","snd","spb","sfl","thm","uvl","vid"]},
		},
	},
};
