import Ember from 'ember';


export default Ember.Route.extend({

  model: function(){
    // var initialFrames = [];
    // for(var i=0; i<11; i++){
    //   var bonusFrame = false;
    //   if(i===10){
    //     bonusFrame = true;
    //   }
    //   initialFrames.push({frameId: i+1, roll1: null, roll2: null, frameScore: 0, bonusFrame: bonusFrame});
    // }

    var myModel = {
      rolls: [],
      frames: this.buildInitialFrames(),
      finalScore: 0
    };
    return myModel;
  },

  actions:{
    //Clicking the Calculate Score button triggers this action
    calcScore: function(){
      var frames = this.controller.get('model.frames');
      if(!Ember.isEmpty(frames)){
        var allRolls = this.getRolls(frames);
        this.calculateScore(allRolls);
        // this.controller.set('model.finalScore', this.calculateScore(allRolls));
      }
    },
    //Clicking the Reset Game button triggers this action
    resetGame: function(){
      var freshModel = {
        rolls: [],
        frames: this.buildInitialFrames(),
        finalScore: 0
      };
      this.controller.set('model', freshModel);
    }
  },

  //Build initial frames array.  Each item is a frame object containing the frameId, roll1 and roll2, frameScore, and bonusFrame (boolean)
  buildInitialFrames: function(){
    var initialFrames = [];
    for(var i=0; i<11; i++){
      var bonusFrame = false;
      if(i===10){
        bonusFrame = true;
      }
      initialFrames.push({frameId: i+1, roll1: null, roll2: null, frameScore: 0, bonusFrame: bonusFrame});
    }
    return initialFrames;
  },

  //Takes an array of frame objects, goes through each, pulls out rolls 1 and 2 (if they are not empty), and adds to a rolls array used to calculate score.  You will see empty rolls when a user gets a strike in a frame (roll2 will be empty).
  getRolls: function(frames){
    var allRolls = [];
    for(var i=0; i<frames.length; i++){
      if(!Ember.isEmpty(frames[i].roll1))
        allRolls.push(frames[i].roll1);
      if(!Ember.isEmpty(frames[i].roll2))
        allRolls.push(frames[i].roll2);
    }

    //If you don't feel like entering in the numbers in each frame in the UI, just uncomment one of the following at a time to test the logic... It prints frame and final scores in the console too... but will not enter the individual rolls into their little boxes.
    // Use these test cases to verify it's working...
    // allRolls = ['x','x','x','x','x','x','x','x','x','x','x','x']; //Final score should be 300
    // allRolls = [9,'-',  9,'-',  9,'-',  9,'-',  9,'-',  9,'-',  9,'-',  9,'-',  9,'-',  9,'-'];  //Final score should be 90
    // allRolls = [5,'/',  5,'/',  5,'/',  5,'/',  5,'/',  5,'/',  5,'/',  5,'/',  5,'/',  5,'/',  5];  //Final score should be 150
    // allRolls = ['x',  7,'/',  9,'-',  'x',  '-',8,  8,'/',  '-',6,  'x',  'X',  'X',  8,1];  //Final score should be 167
    return allRolls;
  },

  //Takes an array of valid scores, formats them (see formatRolls function), and calculates and sets frame score and final score.
  calculateScore: function(rolls){
    var score = 0;
    var totalRolls = 0;
    var game = this;

    //formats rolls for easier handling
    rolls = game.formatRolls(rolls);
    game.set('rolls', rolls);

    //for each of the 10 frames, check to see if score is a spare, strike, or number. Note, we replaced misses (-) with 0's in the formatRolls function.
    for(var frame=0; frame<10; frame++){
      if(game.isASpare(totalRolls)){
        score += 10 + game.getSpareScore(totalRolls);
        totalRolls += 2;
      }else if (game.isAStrike(totalRolls)){
        score += 10 + game.getStrikeScore(totalRolls);
        totalRolls++;
      }else{
        score += game.getNormalScore(totalRolls);
        totalRolls+=2;
      }
      console.debug('Frame: Current Score >>> ', (frame+1) + ': ' + score);
      //Sets frame score in UI by updating model.frames array
      this.controller.set('model.frames.'+frame+'.frameScore', score);
    }
    console.warn('FINAL score >>> ', score);
    //Sets final score in UI by updating model.finalScore
    this.controller.set('model.finalScore', score);
    return score;
  },

  //If the next roll is a /, this frame is a spare... send back true.
  isASpare: function (totalRolls){
    var rolls = this.get('rolls');
    if(rolls[totalRolls+1] === '/')
      return true;
    return false;
  },

  //if this roll is a X, send back true for being a strike
  isAStrike: function (totalRolls){
    var rolls = this.get('rolls');
    if(rolls[totalRolls] === 'X')
      return true;
    return false;
  },

  //if the next roll is a strike, 10 is returned... otherwise it returns the number of pins knocked down.  Next roll SHOULD never be a spare if entered correctly.
  getSpareScore: function (totalRolls){
    var rolls = this.get('rolls');
    return (rolls[totalRolls+2] === 'X') ? 10 : rolls[totalRolls+2];
  },

  //Gets next two roll scores and sends back the total.
  getStrikeScore: function (totalRolls){
    var rolls = this.get('rolls');
    var nextScore = (rolls[totalRolls+1] === 'X') ? 10 : rolls[totalRolls+1];
    var secondNextScore = (rolls[totalRolls+2] === 'X' || rolls[totalRolls+2] === '/') ? 10 : rolls[totalRolls+2];

    //If a spare, only send back the second value (of 10)
    if(rolls[totalRolls+2] === '/')
      return secondNextScore;
    //return total of both rolls in frame
    return nextScore + secondNextScore;
  },

  //returns frame score (sum of two rolls)
  getNormalScore: function (totalRolls){
    var rolls = this.get('rolls');
    return rolls[totalRolls] + rolls[totalRolls+1];
  },

  //Takes array of rolls and replaces all - with 0, capitalizes X's, or keeps the same value (number or /).  Makes it easier to work with later.
  formatRolls: function (rollsArray){
    return rollsArray.map(function(x){
      var val = null;
      if (x === '-'){
        val = 0;
      }else if(typeof(x) === 'string'){
        val = x.toUpperCase();
        //Anything entered in the textfield is considered a string... so we have to convert numbers back into actual numbers.
        if(val !== 'X' && val !== '/')
          val = Number(val);
      }else{
        val = x;
      }
      return val;
    });
  }
});
