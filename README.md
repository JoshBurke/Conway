
# Conway's Game of Life
## Functionality:
As of now, each time the page is loaded it has a random seed. Click to play/pause.

You can run the simulation by clicking [here](http://htmlpreview.github.com/?https://github.com/JoshBurke/Conway/blob/master/docs/index.html).

-Josh Burke

## Update Notes:

### December 27, 2017

This update:
* New settings menu next to simulation display
* Variable size, density, and fps settings
* Some slight optimization to simulation
* Frame delay display
* Fixed bug with bottom row and rightmost column, where they weren't being rendered correctly
* New CSS stylesheet

### December 25, 2017

This is my work-in-progess implementation of Conway's Game of Life. I've always been fascinated by the concept of emergence, and Conway's Game is a nice demonstration of how simple processes can work together to become more complex.
This project is also serving as my first solo web project.

Going forward with this project I'd like to optimize the simulation. It runs pretty slow at this point. Another task would be to automate the process of finding repeating patterns - running the simulation for a few thousand iterations and then locating patterns with period > 2. I'd also like to add options for seed density, seed serializing/deserializing, replaying seeds, starting new seeds *without* refreshing, and maybe some time controls once the simulation is fast enough. Once I learn more about common repeaters I think it would be cool to be able to load examples of them as seeds, so that someone new to the game could learn about them as well.
