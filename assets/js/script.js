// Comment!

var random_api_url = "https://randomuser.me/api/";
var dnd_api_url = "https://www.dnd5eapi.co/api/";
var dnd_api_skills = "https://www.dnd5eapi.co";

var ability_scores_array = [];
var skills_array = [];
var armor_class;
var maximum_HP;
var initiative;

let skills = [];
// onclick("");

// Generate random name
function generate_random_name() {
  $.ajax({
    url: random_api_url,
    dataType: "json",
    success: function (data) {
      var random_name = data.results[0].name.first + " " + data.results[0].name.last;
      generate_random_alignment(random_name)
    },
  });
}

// Generate random Alignment
function generate_random_alignment(randomName) {
  $.ajax({
    url: dnd_api_url + "alignments",
    dataType: "json",
    success: function (data) {
      var randomAlignment =
        data.results[Math.floor(Math.random() * data.results.length)];
      generate_random_race(randomName, randomAlignment.name)
    },
  });
}

//Generate Random Race
function generate_random_race(randomName, random_alignment) {
  $.ajax({
    url: dnd_api_url + "races",
    dataType: "json",
    success: function (data) {
      var randomRace =
        data.results[Math.floor(Math.random() * data.results.length)];
      

      generate_random_class(randomName, random_alignment,randomRace.name);
    },
  });
}

function generate_random_class(randomName, random_alignment, randomRace) {
  $.ajax({
    url: dnd_api_url + "classes",
    dataType: "json",
    success: function (data) {
      var randomClass = data.results[Math.floor(Math.random() * data.results.length)];
      

      // console.log("Alignment: " + random_alignment);
      // console.log("Name " + randomName);
      // console.log("Race: " + randomRace);
      // console.log("Class: " + randomClass.name);

      generate_ability_scores(randomName, random_alignment, randomRace, randomClass.name);
    },
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Random Ability Scores
function generate_ability_scores(randomName, random_alignment, randomRace, randomClass) {
  // Randomly assign ability scores
  $.ajax({
    url: dnd_api_url + "ability-scores",
    dataType: "json",
    success: function (data) {
      let standard_array = [8, 10, 12, 13, 14, 15];

      $(data.results).each(function (index) {
        let random_score =
          standard_array[Math.floor(Math.random() * standard_array.length)];
        var scoreIndex = standard_array.indexOf(random_score);
        standard_array.splice(scoreIndex, 1);
        ability_scores_array[index] = {
          abilityName: data.results[index].name,
          score: random_score,
          modifier: Math.floor((random_score - 10) / 2),
        };
      });


      
      if (randomRace == "Dragonborn") {
        // STR+2
        ability_scores_array[4].score = ability_scores_array[4].score + 2;
        ability_scores_array[4].modifier = Math.floor((ability_scores_array[4].score - 10) / 2);
        // CHA+1
        ability_scores_array[0].score = ability_scores_array[0].score + 1;
        ability_scores_array[0].modifier = Math.floor((ability_scores_array[0].score - 10) / 2);

      } 

      else if (randomRace == "Dwarf") {
        // CON+2
        ability_scores_array[1].score = ability_scores_array[1].score + 2;
        ability_scores_array[1].modifier = Math.floor((ability_scores_array[1].score - 10) / 2);
      }
      
      else if (randomRace == "Elf") {
        // DEX+2
        ability_scores_array[2].score = ability_scores_array[2].score + 2;
        ability_scores_array[2].modifier = Math.floor((ability_scores_array[2].score - 10) / 2);
      } 

      else if (randomRace == "Gnome") {
        // INT+2
        ability_scores_array[3].score = ability_scores_array[3].score + 2;
        ability_scores_array[3].modifier = Math.floor((ability_scores_array[3].score - 10) / 2);
      } 

      else if (randomRace == "Half-Elf") {
        // INT+2
        ability_scores_array[3].score = ability_scores_array[3].score + 2;
        ability_scores_array[3].modifier = Math.floor((ability_scores_array[3].score - 10) / 2);

        // Random Ability Score +1 (X2)
        let random_skill = getRandomInt(6);
        ability_scores_array[random_skill].score =
          ability_scores_array[random_skill].score + 1;
        ability_scores_array[random_skill].modifier = Math.floor(
          (ability_scores_array[random_skill].score - 10) / 2
        );

        random_skill = getRandomInt(6);
        ability_scores_array[random_skill].score =
          ability_scores_array[random_skill].score + 1;
        ability_scores_array[random_skill].modifier = Math.floor(
          (ability_scores_array[random_skill].score - 10) / 2
        );

      } 

      else if (randomRace == "Half-Orc") {
        // STR+2
        ability_scores_array[4].score = ability_scores_array[4].score + 2;
        ability_scores_array[4].modifier = Math.floor((ability_scores_array[4].score - 10) / 2);


        // CON+1
        ability_scores_array[1].score = ability_scores_array[1].score + 1;
        ability_scores_array[1].modifier = Math.floor((ability_scores_array[1].score - 10) / 2);
      } 

      else if (randomRace == "Halfling") {
        // DEX+2
        ability_scores_array[2].score = ability_scores_array[2].score + 2;
        ability_scores_array[2].modifier = Math.floor((ability_scores_array[2].score - 10) / 2);
      } 
      
      else if (randomRace == "Human") {
        // +1 All Ability Scores
        ability_scores_array[0].score = ability_scores_array[0].score + 1;
        ability_scores_array[0].modifier = Math.floor((ability_scores_array[0].score - 10) / 2);

        ability_scores_array[1].score = ability_scores_array[1].score + 1;
        ability_scores_array[1].modifier = Math.floor((ability_scores_array[1].score - 10) / 2);

        ability_scores_array[2].score = ability_scores_array[2].score + 1;
        ability_scores_array[2].modifier = Math.floor((ability_scores_array[2].score - 10) / 2);

        ability_scores_array[3].score = ability_scores_array[3].score + 1;
        ability_scores_array[3].modifier = Math.floor((ability_scores_array[3].score - 10) / 2);

        ability_scores_array[4].score = ability_scores_array[4].score + 1;
        ability_scores_array[4].modifier = Math.floor((ability_scores_array[4].score - 10) / 2);

        ability_scores_array[5].score = ability_scores_array[5].score + 1;
        ability_scores_array[5].modifier = Math.floor((ability_scores_array[5].score - 10) / 2);
      } 
  
      else if (randomRace == "Tiefling") {
        // CHA+2
        ability_scores_array[0].score = ability_scores_array[0].score + 2;
        ability_scores_array[0].modifier = Math.floor((ability_scores_array[0].score - 10) / 2);

        // INT+1
        ability_scores_array[3].score = ability_scores_array[3].score + 1;
        ability_scores_array[3].modifier = Math.floor((ability_scores_array[3].score - 10) / 2);
      }

      if (randomClass.name == "Barbarian") {
        maximum_HP = 12 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Bard") {
        maximum_HP = 8 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Cleric") {
        maximum_HP = 8 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Druid") {
        maximum_HP = 8 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Fighter") {
        maximum_HP = 10 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Monk") {
        maximum_HP = 8 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Paladin") {
        maximum_HP = 10 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Ranger") {
        maximum_HP = 10 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Rogue") {
        maximum_HP = 8 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Sorcerer") {
        maximum_HP = 6 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Warlock") {
        maximum_HP = 8 + ability_scores_array[1].modifier;
      } else if (randomClass.name == "Wizard") {
        maximum_HP = 6 + ability_scores_array[1].modifier;
      } else {
        maximum_HP = 10 + ability_scores_array[1].modifier;
      }


      initiative = ability_scores_array[2].modifier;
      armor_class = 10 + ability_scores_array[2].modifier;

      $.ajax({
        url: dnd_api_url + "skills",
        dataType: "json",
        success: function (data) {
          // console.log(data.results);
          $(data.results).each(function (index) {
            $.ajax({
              url: dnd_api_skills + data.results[index].url,
              dataType: "json",
              success: function (data) {
                // console.log(data);
                for (let i = 0; i < 6; i++) {
                  if (data.ability_score.name == ability_scores_array[i].abilityName) {
                    //console.log(ability_scores_array[i][2]);
                    var skillsArray = {
                      name: data.name,
                      abilityScore: data.ability_score.name,
                      modifier: ability_scores_array[i].modifier,
                    };


                    var skill_node = document.getElementById('random_skills');
                    var newLine_a = document.createElement('p');
                    newLine_a.innerHTML = skillsArray.name + " Mod. : " + skillsArray.modifier;
                    skill_node.appendChild(newLine_a);
                    skills_array.push(skillsArray);
                  }
                }
              },
            });
          });
          print_character(randomName, random_alignment, randomRace, randomClass, ability_scores_array, skills_array, initiative, armor_class, maximum_HP);



          // Print things and save to local storage??
          if (initiative < 0) {
            console.log("Initiative Modifier: " + initiative);
          } else {
            initiative = "+" + initiative;
            console.log("Initiative Modifier: " + initiative);
          }
          
          console.log("Alignment: " + random_alignment);
          console.log("Name: " + randomName);
          console.log("Race: " + randomRace);
          console.log("Class: " + randomClass);
          console.log("Max HP: " + maximum_HP);
          console.log("Armor Class: " + armor_class);
          console.log(ability_scores_array);
          console.log(skills_array);




          $("#saveBtn").click(function() {
            var person = {
              name: randomName,
              initiative: initiative,
              alignment: random_alignment,
              race: randomRace,
              class: randomClass,
              health: maximum_HP,
              ac: armor_class,
              ability_scores: ability_scores_array,
              skills: skills_array
            };
            localStorage.setItem('character', JSON.stringify(person));

            document.getElementById("saveBtn").innerHTML = "Saved!";
          });







        },
      });
    },
  });
}



// Print to page (everything except skills)
function print_character(randomName, random_alignment, randomRace, randomClass, abilityScoresArray, skillsArray, initiative, armor_class, maxHP) {

  $(abilityScoresArray).each(function(index) {
    var node = document.getElementById('abilities');
    var newLine = document.createElement('p');
    newLine.innerHTML = abilityScoresArray[index].abilityName + " Score: " + abilityScoresArray[index].score + " Modifier: " + abilityScoresArray[index].modifier;
    node.appendChild(newLine);
  })

  document.getElementById("randomRace").innerHTML = randomRace;
  document.getElementById("randomAlignment").innerHTML = random_alignment;
  document.getElementById("randomClass").innerHTML = randomClass;
  document.getElementById("randomName").innerHTML = randomName;
  document.getElementById("randomInitiative").innerHTML = initiative;
  document.getElementById("randomHP").innerHTML = maximum_HP;
  document.getElementById("randomAC").innerHTML = armor_class;
  
}




function generate_character() {
  generate_random_name();

}

generate_character();



$("#backBtn").click(function() {
  location.href = '../index.html';
});

$("#savedCharactersBtn").click(function() {
  location.href = './index3.html';
});