# Phasmophobia Ghost Finder
A tool to be used alongside the game Phasmophobia, to help with identifying the ghost, as well as calculating photograph value, randomising items for challenges, and maps to help you find your way.

## General gameplay assistance
At the bottom of the page, under the ghost types, several lists of useful gameplay information are available, including hints on evidence and non-evidence items, cursed items, hunts, and more detailed information for technical players.

## Screen flexibility
The ghost finder has been designed to automatically resize itself to fit many different screen sizes, from 1920x1080 to the smallest mobile screen.

## Maps
All current maps are availlable directly above the clue selection, which show camera, circuit breaker, ouija board and other item locations. These were all created by third parties and all credits within the images have been maintained.

## Difficulty
Upon selecting a difficulty, certain timers will update - selecting a map will also adjust the timers depending on the map size, taking the difficulty into account.

## Clue selection
Below the maps, the available evidence items are shown, with tick and cross choices to either include or disregard each one, to help narrow down the current ghost.

When an evidence item is included or disregarded, other evidence items that do not match any remaining ghost types will be disabled, to simplify the evidence-gathering process.

Additionally, when a ghost has a guaranteed evidence item on a particular difficulty, and this evidence item is not included, the ghost in question will be disregarded.

## Timers
Various timers have been configured to assist with making sure you're not caught out by an expiring incense, non-professional hunt latency, etc. Simply select the timer you wish to use and hit the green button to start the timer.

Hunt timers include the grace period at the start of the hunt, where the ghost appears but is not yet lethal.

The timer will make a ticking sound three times at 30s remaining, twice at 20s, once at 10s, and once for the final 5 seconds, after which an alarm will sound and the timer panel will flash. Selecting the Mute option will prevent these sounds from playing.

If the timer is paused before reaching zero, pressing Play again will resume from the current point, and upon hitting zero, will reset to its original time.

## Photo calculator
Pulling out the Photos tab will bring up the photo value calculator, which allows you to see how much money you'll earn from the photos you've taken.

Do note that only one Ghost photo counts towards your rewards in-game, regardless of the ability to select multiple in the calculator.

## Roll randomisers
Pulling out the Roll tab will bring up the map and item randomiser, which allows you to select any number of random items.

Clicking an item will surround it with a solid border, and using a "Roll" button will choose a random selected item. Additional items may be selected without clearing the existing chosen items.

## Keyboard shortcuts
The tool includes built-in support for keyboard shortcuts to make it easier to switch out, hit a key and return to the game.

| Key   | Description                                                                                                                                                 |
|-------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0-9   | Toggle each evidence item to either confirm or disregard, to help identify the ghost. When the Photos tab is pulled out, toggles the individual photo types |
| [ / ] | Cycle through the available maps: press Space to select map; Enter to open. When the Photos tab is pulled out, allows the selection of photo quality        |
| + / - | Increase or decrease difficulty                                                                                                                             |
| Q-U   | Select a timer, and use # to start or stop. Press the letter key again to reset                                                                             |
| ,     | Toggle 1.5x ghost step speed                                                                                                                                |
| .     | Start or stop default step timer, to check against ghost step speed                                                                                         |
| #     | Start or stop selected timer                                                                                                                                |
| A     | Toggle alone / all players ghost                                                                                                                            |
| C     | Toggle compact mode (ghost hints hidden)                                                                                                                    |
| D     | Toggle dark mode                                                                                                                                            |
| F     | Toggle fullscreen                                                                                                                                           |
| S     | Pulls out the Photos tab                                                                                                                                    |
| L     | Pulls out the Roll tab                                                                                                                                      |
| M     | Mute timer sounds                                                                                                                                           |
| X     | Reset the ghost finder for the next ghost. Will not change the selected map, difficulty or timer                                                            | 

## Multi-language functionality
To add another language to the tool, you will need to do the following:

- Copy `langs/en.js` to a new file, named with the language code you wish to use
- Modify the first line to match the property to the filename

```javascript
langs.en = { // Property here should match this language name
```

- Change any phrases as required to the designated language - do not change the property names as these are pointers the tool uses to find the various phrases
- Add your new language file into the `<head>` tag of index.html, as shown:

```html
<!-- Language files here -->
<script src="langs/en.js"></script>
<!-- Language files here -->
```