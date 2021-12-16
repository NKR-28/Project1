// Comment!


var random_api_url = 'https://randomuser.me/api/';
var dnd_api_url = 'https://www.dnd5eapi.co/api/';
var dnd_api_skills = 'https://www.dnd5eapi.co';
var modifiers_array = [];
var ability_scores_array = [];
var skills_array = [];
var armor_class;






function generate_random_class() {
  $.ajax({
    url: dnd_api_url + "classes",
    dataType: 'json',
    success: function(data) {

      var randomClass = data.results[Math.floor(Math.random()*data.results.length)];

      console.log(randomClass.name);
    }
  });
};



// Generate random name
function generate_random_name() {
  $.ajax({
    url: random_api_url,
    dataType: 'json',
    success: function(data) {
      console.log(data.results[0].name.first, data.results[0].name.last);
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
      console.log(randomAlignment.name);
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
      console.log(randomRace.name);
    }
  });
};

//Random Ability Scores


function generate_ability_scores() {
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
        modifiers_array[index] = ability_scores_array[index][2];
      });
    }
  });


  //Random Skills
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
            armor_class = (10+ability_scores_array[2][2]);
            //console.log(armor_class);
          }
        });
      });
      //console.log(skills_array);
    }
  });
  console.log(ability_scores_array);
  console.log(armor_class);

  //var armor_class = (10+(ability_scores_array[2][2]));

};


function generate_character() {
  generate_random_name();
  generate_ability_scores();
  generate_random_race();
  generate_random_alignment();
  generate_random_class();

};

generate_character();



