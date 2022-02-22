let ghosts =
	{
	"banshee": {
		"name":					"Banshee",
		"clues":				["dots","prints","orb"],
		"clues_always":	[],
		"useful":				[
			"Hunts only its target and only checks target sanity before hunting, unless target is outside",
			"Can teleport to target at start of hunt, if they had ghost LoS within 20s",
			"Will often wander to target",
			"Prefers singing during ghost events; these drain +5% sanity",
			"May shriek through paramic"
		]
	},
	"demon": {
		"name":					"Demon",
		"clues":				["prints","temps","writing"],
		"clues_always":	[],
		"useful":				[
			"Crucifixes have +2m range",
			"Can hunt at 70% sanity",
			"Low chance to hunt at any sanity level",
			"Delay between hunts is reduced to 20s",
			"Smudges last 2/3 as long: 60s",
			"Sanity loss triggers cost 20% less sanity"
		]
	},
	"goryo": {
		"name":					"Goryo",
		"clues":				["emf","dots","prints"],
		"clues_always":	["dots"],
		"useful":				[
			"Will never perform a long roam from the ghost room",
			"Won't show dots with people in the ghost room",
			"Dots can only be observed through a camera",
			"Nightmare mode: dots are guaranteed"
		]
	},
	"hantu": {
		"name":					"Hantu",
		"clues":				["orb","prints","temps"],
		"clues_always":	["temps"],
		"useful":				[
			"2x as likely to turn off breaker",
			"Speed never ramps during hunt; moves slower in warm rooms, faster in cold",
			"Moves at player speed at 9&deg;C; speed changes every 3&deg;C (37.4&deg;F) up to 150% player at 0&deg;C, and 85% player at 15&deg;C",
			"Can breathe mist in rooms below 3&deg;C (37.4&deg;F) when hunting",
			"Nightmare mode: freezing is guaranteed"
		]
	},
	"jinn": {
		"name":					"Jinn",
		"clues":				["emf","prints","temps"],
		"clues_always":	[],
		"useful":				[
			"Will never turn off breaker",
			"With breaker on, chance to drop sanity by 25% within 3m",
			"During hunt with breaker on, will be 2.5x player speed when chasing, until within 2m of target"
		]
	},
	"mare": {
		"name":					"Mare",
		"clues":				["box","orb","writing"],
		"clues_always":	[],
		"useful":				[
			"Cannot turn light switches on",
			"Prefers to turn off lights as interactions",
			"Can instantly turn off switches as they are turned on",
			"Prefers to blow up lights during ghost events",
			"Will attempt long roams to escape lit rooms",
			"Room lights on reduces hunt threshold to 40%",
			"Room lights off increases hunt threshold to 60%"
		]
	},
	"mimic": {
		"name":					"Mimic",
		"clues":				["box","orb","prints","temps"],
		"clues_always":	[],
		"useful":				[
			"Can behave as any other ghost, including hunt behaviour and triggers",
			"Will change behaviour no more than once per-minute",
			"Shows false ghost orbs"
		]
	},
	"myling": {
		"name":					"Myling",
		"clues":				["emf","prints","writing"],
		"clues_always":	[],
		"useful":				[
			"Speaks more often to the paramic",
			"Footsteps are very quiet during hunts; equipment malfunctions before footsteps are heard"
		]
	},
	"obake": {
		"name":					"Obake",
		"clues":				["emf","orb","prints"],
		"clues_always":	["prints"],
		"useful":				[
			"Can leave 6-finger fingerprints",
			"-25% chance to leave fingerprints",
			"Fingerprints can disappear after 50% of normal time",
			"Nightmare mode: fingerprints are guaranteed"
		]
	},
	"oni": {
		"name":					"Oni",
		"clues":				["emf","dots","temps"],
		"clues_always":	[],
		"useful":				[
			"One of the most active ghost types",
			"Can throw items at high speed",
			"Will not perform the mist ball ghost event",
			"Prefers physical form for ghost events"
		]
	},
	"onryo": {
		"name":					"Onryo",
		"clues":				["box","orb","temps"],
		"clues_always":	[],
		"useful":				[
			"Will blow out candles more often than other ghosts",
			"50% chance to hunt when flame is extinguished below 80% sanity (except first three blowouts)",
			"+25% hunt chance per dead player",
			"Can hunt from 60% sanity without flame in room",
			"Candles act as crucifixes; 3M hunt blocking range. Has precedence over crucifix",
			"When candle prevents hunt, it is blown out"
		]
	},
	"phantom": {
		"name":					"Phantom",
		"clues":				["box","dots","prints"],
		"clues_always":	[],
		"useful":				[
			"Disappears but remains when photo is taken while not hunting",
			"Sanity drops 2x when visible (stops if hidden due to photo)",
			"Can wander to indoor player",
			"Blinks very slowly during hunt"
		]
	},
	"poltergeist": {
		"name":					"Poltergeist",
		"clues":				["box","prints","writing"],
		"clues_always":	[],
		"useful":				[
			"Can throw several items at once",
			"Reduces witness sanity by 2x thrown items"
		]
	},
	"raiju": {
		"name":					"Raiju",
		"clues":				["dots","emf","orb"],
		"clues_always":	[],
		"useful":				[
			"Can hunt at 65% when near electronics",
			"Greatly increased speed during hunt when near electronics",
			"Has an increased range of electrical disruption"
		]
	},
	"revenant": {
		"name":					"Revenant",
		"clues":				["orb","temps","writing"],
		"clues_always":	[],
		"useful":				[
			"Travels very fast when it can see a player",
			"Travels very slowly when not seeing players"
		]
	},
	"shade": {
		"name":					"Shade",
		"clues":				["emf","temps","writing"],
		"clues_always":	[],
		"useful":				[
			"Very inactive",
			"Ghost event chance linked to sanity loss; normal chances below 50%",
			"Prefers breath ghost events",
			"Prefers shadow form during ghost events",
			"Cannot hunt above 35% sanity",
			"Won't try to hunt with &gt;1 person in room"
		]
	},
	"spirit": {
		"name":					"Spirit",
		"clues":				["box","emf","writing"],
		"clues_always":	[],
		"useful":				[
			"Smudges last twice as long: 180s"
		]
	},
	"twins": {
		"name":					"Twins",
		"clues":				["box","emf","temps"],
		"clues_always":	[],
		"useful":				[
			"Both twins can interact one after the other",
			"Decoy twin will not trigger sensors or give evidence (except EMF)",
			"During hunts, main twin moves at -10%, decoy moves at +10%",
			"Decoy hunts will start immediately after a decoy interaction",
			"Each twin has its own hunting sound (rumoured)"
		]
	},
	"wraith": {
		"name":					"Wraith",
		"clues":				["box","emf","dots"],
		"clues_always":	[],
		"useful":				[
			"When loud-stepping after salt, no footprints show",
			"After stepping in salt, becomes permanently more active",
			"Can teleport near a random indoor player and leave EMF"
		]
	},
	"yokai": {
		"name":					"Yokai",
		"clues":				["box","dots","orb"],
		"clues_always":	[],
		"useful":				[
			"Increased activity when speaking near the ghost",
			"Can hunt below 80% when players are talking nearby",
			"Can only hear players &lt;2m away during hunts"
		]
	},
	"yurei": {
		"name":					"Yurei",
		"clues":				["orb","dots","temps"],
		"clues_always":	[],
		"useful":				[
			"Chance to drop sanity by 13% within 3m (closes a nearby door)",
			"Cannot roam while smudged"
		]
	}
}
;