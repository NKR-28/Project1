// Comment!


var random_api_url = 'https://randomuser.me/api/';

$.ajax({
    url: random_api_url,
    dataType: 'json',
    success: function(data) {
      console.log(data.results[0].name.first, data.results[0].name.last);
    }
});


var dnd_api_url = 'https://www.dnd5eapi.co/api/';

$.ajax({
    url: dnd_api_url,
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
});

