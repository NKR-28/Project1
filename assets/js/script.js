// Comment!


var random_api_url = 'https://randomuser.me/api/';
var dnd_api_url = 'https://www.dnd5eapi.co/api/';
var dnd_api_skills = 'https://www.dnd5eapi.co';


var ability_scores_array = [];
var skills_array = [];
var armor_class;
var maximum_HP;
var initiative;







// Generate random name
function generate_random_name() {
  $.ajax({
    url: random_api_url,
    dataType: 'json',
    success: function(data) {
      console.log("Name: "+ data.results[0].name.first, data.results[0].name.last);
    }
  });
};



// Generate random Alignment
function generate_random_alignment() {
  $.ajax({
    url: dnd_api_url + "alignments",
    dataType: 'json',
    success: function(data) {
      var randomAlignment = data.results[Math.floor(Math.random()*data.results.length)];
      console.log("Alignment: " + randomAlignment.name);
    }
  });
};


//Generate Random Race
function generate_random_race() {
  $.ajax({
    url: dnd_api_url + "races",
    dataType: 'json',
    success: function(data) {
      var randomRace = data.results[Math.floor(Math.random()*data.results.length)];
      console.log("Race: " + randomRace.name);

      generate_random_class(randomRace.name);
    }
  });
};




function generate_random_class(randomRace) {
  $.ajax({
    url: dnd_api_url + "classes",
    dataType: 'json',
    success: function(data) {
      var randomClass = data.results[Math.floor(Math.random()*data.results.length)];
      console.log("Class: " + randomClass.name);

      generate_ability_scores(randomRace,randomClass);
    }
  });
};


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



//Random Ability Scores
function generate_ability_scores(randomRace, randomClass) {
  // Randomly assign ability scores
  $.ajax({
    url: dnd_api_url + "ability-scores",
    dataType: 'json',
    success: function(data) {
  
      let standard_array = [8,10,12,13,14,15];
  
      $(data.results).each(function(index) {
        let random_score = standard_array[Math.floor(Math.random()*standard_array.length)];
        var scoreIndex = standard_array.indexOf(random_score);
        standard_array.splice(scoreIndex, 1);
        ability_scores_array[index] = [data.results[index].name, random_score, Math.floor(((random_score)-10)/2)];
      });


      if (randomRace == "Dragonborn") {
        // STR+2
        ability_scores_array[4][1] = (ability_scores_array[4][1] + 2);
        ability_scores_array[4][2] = Math.floor(((ability_scores_array[4][1])-10)/2);
        // CHA+1
        ability_scores_array[0][1] = (ability_scores_array[0][1] + 1);
        ability_scores_array[0][2] = Math.floor(((ability_scores_array[0][1])-10)/2);
      }
      else if (randomRace == "Dwarf") {
        // CON+2
        ability_scores_array[1][1] = (ability_scores_array[1][1] + 2);
        ability_scores_array[1][2] = Math.floor(((ability_scores_array[1][1])-10)/2);
      }
      else if (randomRace == "Elf") {
        // DEX+2
        ability_scores_array[2][1] = (ability_scores_array[2][1] + 2);
        ability_scores_array[2][2] = Math.floor(((ability_scores_array[2][1])-10)/2);
      }
      else if (randomRace == "Gnome") {
        // INT+2
        ability_scores_array[3][1] = (ability_scores_array[3][1] + 2);
        ability_scores_array[3][2] = Math.floor(((ability_scores_array[3][1])-10)/2);
      }
      else if (randomRace == "Half-Elf") {
        // INT+2
        ability_scores_array[3][1] = (ability_scores_array[3][1] + 2);
        ability_scores_array[3][2] = Math.floor(((ability_scores_array[3][1])-10)/2);

        // Random Ability Score +1 X2
        let random_skill = getRandomInt(6);
        ability_scores_array[random_skill][1] = (ability_scores_array[random_skill][1] + 1);
        ability_scores_array[random_skill][2] = Math.floor(((ability_scores_array[random_skill][1])-10)/2);

        random_skill = getRandomInt(6);
        ability_scores_array[random_skill][1] = (ability_scores_array[random_skill][1] + 1);
        ability_scores_array[random_skill][2] = Math.floor(((ability_scores_array[random_skill][1])-10)/2);
      }
      else if (randomRace == "Half-Orc") {
        // STR+2
        ability_scores_array[4][1] = (ability_scores_array[4][1] + 2);
        ability_scores_array[4][2] = Math.floor(((ability_scores_array[4][1])-10)/2);

        // CON+1
        ability_scores_array[1][1] = (ability_scores_array[1][1] + 1);
        ability_scores_array[1][2] = Math.floor(((ability_scores_array[1][1])-10)/2);
      }
      else if (randomRace == "Halfling") {
        // DEX+2
        ability_scores_array[2][1] = (ability_scores_array[2][1] + 2);
        ability_scores_array[2][2] = Math.floor(((ability_scores_array[2][1])-10)/2);
      }
      else if (randomRace == "Human") {
        // +1 All Ability Scores
        ability_scores_array[0][1] = (ability_scores_array[0][1] + 1);
        ability_scores_array[0][2] = Math.floor(((ability_scores_array[0][1])-10)/2);
        ability_scores_array[1][1] = (ability_scores_array[1][1] + 1);
        ability_scores_array[1][2] = Math.floor(((ability_scores_array[1][1])-10)/2);
        ability_scores_array[2][1] = (ability_scores_array[2][1] + 1);
        ability_scores_array[2][2] = Math.floor(((ability_scores_array[2][1])-10)/2);
        ability_scores_array[3][1] = (ability_scores_array[3][1] + 1);
        ability_scores_array[3][2] = Math.floor(((ability_scores_array[3][1])-10)/2);
        ability_scores_array[4][1] = (ability_scores_array[4][1] + 1);
        ability_scores_array[4][2] = Math.floor(((ability_scores_array[4][1])-10)/2);
        ability_scores_array[5][1] = (ability_scores_array[5][1] + 1);
        ability_scores_array[5][2] = Math.floor(((ability_scores_array[5][1])-10)/2);
      }
      else if (randomRace == "Halfling") {
        // DEX+2
        ability_scores_array[2][1] = (ability_scores_array[2][1] + 2);
        ability_scores_array[2][2] = Math.floor(((ability_scores_array[2][1])-10)/2);
      }
      else if (randomRace == "Tiefling") {
        // CHA+2
        ability_scores_array[0][1] = (ability_scores_array[0][1] + 2);
        ability_scores_array[0][2] = Math.floor(((ability_scores_array[0][1])-10)/2);

        // INT+1
        ability_scores_array[3][1] = (ability_scores_array[3][1] + 1);
        ability_scores_array[3][2] = Math.floor(((ability_scores_array[3][1])-10)/2);
      }





      if (randomClass.name == "Barbarian") { 
        maximum_HP = (12 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Bard") { 
        maximum_HP = (8 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Cleric") { 
        maximum_HP = (8 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Druid") { 
        maximum_HP = (8 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Fighter") { 
        maximum_HP = (10 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Monk") { 
        maximum_HP = (8 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Paladin") { 
        maximum_HP = (10 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Ranger") { 
        maximum_HP = (10 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Rogue") { 
        maximum_HP = (8 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Sorcerer") { 
        maximum_HP = (6 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Warlock") { 
        maximum_HP = (8 + ability_scores_array[1][2]);
      }
      else if (randomClass.name == "Wizard") { 
        maximum_HP = (6 + ability_scores_array[1][2]);
      }
      else {
        maximum_HP = (10 + ability_scores_array[1][2]);
      }

      initiative = ability_scores_array[2][2];
      if (initiative < 0) {
        console.log("Initiative Modifier: " + initiative);
      }
      else {
        console.log("Initiative Modifier: +" + initiative);
      }


      //maximum_HP = ability_scores_array[1][2];
      console.log("Max HP: " + maximum_HP);

      armor_class = 10+ability_scores_array[2][2];
      console.log("Armor Class: " + armor_class);
    }
  });


  //Creates Skill array from ability score array
  $.ajax({
    url: dnd_api_url + "skills",
    dataType: 'json',
    success: function(data) {
      $(data.results).each(function(index) {
        $.ajax({
          url: dnd_api_skills + data.results[index].url,
          dataType: 'json',
          success: function(data) {
            for (let i=0;i < 6; i++) {
              if (data.ability_score.name == ability_scores_array[i][0]) {
                //console.log(ability_scores_array[3][2]);
                skills_array[index] = [data.name, data.ability_score.name, ability_scores_array[i][2]]
              }
            };
          }
        });
      });
    }
  });
};


function generate_character() {
  generate_random_name();
  generate_random_race();
  generate_random_alignment();

  console.log(skills_array);
  //console.log("Armor Class: " + armor_class);
  console.log(ability_scores_array);
};

generate_character();



