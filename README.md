# Design and Development Challenge – Bowling Score

## Requirement
Create a program which, given a valid sequence of rolls for one line of American Ten-Pin Bowling, produces the total score for the game. Fork this repository, build your program in the language of your choice, then submit a pull request with your code.

## Tasks which are out of scope
*   No need to check for valid rolls.
*   No need to check for correct number of rolls and frames.
*   No need to provide scores for intermediate frames.

## Scoring Logic
*   Each game, or "line" of bowling, includes ten turns, or "frames" for the bowler.
*   In each frame, the bowler gets up to two tries to knock down all the pins.
*   If in two tries, he fails to knock them all down, his score for that frame is the total number of pins knocked down in his two tries.
*   If in two tries he knocks them all down, this is called a "spare" and his score for the frame is ten plus the number of pins knocked down on his next throw (in his next turn).
*   If on his first try in the frame he knocks down all the pins, this is called a "strike". His turn is over, and his score for the frame is ten plus the simple total of the pins knocked down in his next two rolls.
*   If he gets a spare or strike in the last (tenth) frame, the bowler gets to throw one or two more bonus balls, respectively. These bonus throws are taken as part of the same turn. If the bonus throws knock down all the pins, the process does not repeat: the bonus throws are only used to calculate the score of the final frame.
*   The game score is the total of all frame scores.

## Validation Test Cases
Use the test cases from the table below to validate the scoring logic of your program. For program input, "X" indicates a strike, "/" indicates a spare, "-" indicates a miss, and a number indicates the number of pins knocked down in the roll.

| Program Input         | Scoring Calculation                                                                                                             | Total Score |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------|-------------|
| XXXXXXXXXXXX          | (10+10+10) + (10+10+10) + (10+10+10) + (10+10+10) + (10+10+10) + (10+10+10) + (10+10+10) + (10+10+10) + (10+10+10) + (10+10+10) | 300         |
| 9-9-9-9-9-9-9-9-9-9-  | 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9                                                                                           | 90          |
| 5/5/5/5/5/5/5/5/5/5/5 | (10+5) + (10+5) + (10+5) + (10+5) + (10+5) + (10+5) + (10+5) + (10+5) + (10+5) + (10+5)                                         | 150         |
| X7/9-X-88/-6XXX81     | (10+7+3) + (7+3+9) + 9 + (10+0+8) + 8 + (8+2+0) + 6 + (10+10+10) + (10+10+8) + (10+8+1)                                         | 167         |

## Installation & Use
1.  Install npm if you do not currently have it. Follow the instructions [here](https://docs.npmjs.com/getting-started/installing-node).
2.  Install Ember-CLI by running the following command in your command line `npm install -g ember-cli@2.11`
3.  You will need Bower as well.  To install globally: `npm install -g bower`.  
...Full Ember Installation instructions found [here](https://guides.emberjs.com/v2.13.0/getting-started/) if you have any issues.
4.  Clone project to local machine.
5.  From the split-happens directory, run `bower install`.  This will install bootstrap files and any other dev dependencies listed in bower.json
6.  From the same directory, start Ember server in your command-line with this command: `ember server`
7.  The server may take a minute or two to fully start.  After you see a "Build successful" message in the cmd prompt, you can open the EmberJS app in your browser.  Navigate to [http://localhost:4200](http://localhost:4200).  
...Enter scores and have fun!




