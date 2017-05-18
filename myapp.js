/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/
var skycons = new Skycons();

// you can add a icon to a html canvas. simply supply its element id and the weather you want to show.
skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
skycons.add("day1", Skycons.CLEAR_DAY);
skycons.add("day2", Skycons.CLOUDY);
skycons.add("day3", Skycons.RAIN);

// start all icons animation!
skycons.play();

// update a icon on  canvas by its id
skycons.set("today", Skycons.PARTLY_CLOUDY_NIGHT);

/*
Get value from Bootstrap dropdown menu
*/
$('#dropdown li').on('click', getCity);

// initialize taipei city weather
$(document).ready(function (c) {
  var city = $(c.target).text().substring(0, 3); // add this won't display "city undefined"
  console.log(city);
  $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taipei%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function (api) {
    // change temperature
    var temp = FToC(api.query.results.channel.item.condition.temp);
    console.log(temp);
    $(".temperature").text(temp);
    // change today date
    var date0 = api.query.results.channel.lastBuildDate;
    var date1 = date0.substring(5, 16);
    console.log(date1);
    $(".date").text(date1)
    // change today weather
    var todayWeather = api.query.results.channel.item.condition.text;
    console.log(todayWeather);
    $(".todayWeather").text(todayWeather);
    skycons.set("today", weatherIcon(todayWeather));
    // change forecast date
    var date1 = api.query.results.channel.item.forecast[1].date;
    var date2 = api.query.results.channel.item.forecast[2].date;
    var date3 = api.query.results.channel.item.forecast[3].date;
    console.log(date1);
    console.log(date2);
    console.log(date3);
    $("#date1").text(date1);
    $("#date2").text(date2);
    $("#date3").text(date3);
    // change forecast temperature
    var date1Low = FToC(api.query.results.channel.item.forecast[1].low);
    var date2Low = FToC(api.query.results.channel.item.forecast[2].low);
    var date3Low = FToC(api.query.results.channel.item.forecast[3].low);
    var date1High = FToC(api.query.results.channel.item.forecast[1].high);
    var date2High = FToC(api.query.results.channel.item.forecast[2].high);
    var date3High = FToC(api.query.results.channel.item.forecast[3].high);
    console.log(date1Low);
    console.log(date2Low);
    console.log(date3Low);
    console.log(date1High);
    console.log(date2High);
    console.log(date3High);
    $("#date1Low").text(date1Low);
    $("#date2Low").text(date2Low);
    $("#date3Low").text(date3Low);
    $("#date1High").text(date1High);
    $("#date2High").text(date2High);
    $("#date3High").text(date3High);
    // change forecast weather
    var day1weather = api.query.results.channel.item.forecast[1].text;
    var day2weather = api.query.results.channel.item.forecast[2].text;
    var day3weather = api.query.results.channel.item.forecast[3].text;
    skycons.set("day1", weatherIcon(day1weather));
    skycons.set("day2", weatherIcon(day2weather));
    skycons.set("day3", weatherIcon(day3weather));
    // change dropdown temperature
    var $dropdown = $("#dropdown li");
    $dropdown.each(function (index, element) {
      var cityName = $(this).text().slice(0, 3);
      console.log(cityName)
      var url = weather(cityName);
      $.getJSON(url, function (api) {
        var temp = FToC(api.query.results.channel.item.condition.temp);
        $(element).children('a').children('span').text(" " + temp + "°C");
      })
    })
  });
})

function getCity(c) {
  var city = $(c.target).text().substring(0, 3); // add this won't display "city undefined"
  console.log(city)
  $.getJSON(weather(city), function (api) {
    if (api.query.results) {
      // change temperature
      var temp = FToC(api.query.results.channel.item.condition.temp);
      console.log(temp);
      $(".temperature").text(temp);
      // change today date
      var date0 = api.query.results.channel.lastBuildDate;
      var date1 = date0.substring(5, 16);
      console.log(date1);
      $(".date").text(date1)
      // change today weather
      var todayWeather = api.query.results.channel.item.condition.text;
      console.log(todayWeather);
      $(".todayWeather").text(todayWeather);
      skycons.set("today", weatherIcon(todayWeather));
      // change forecast date
      var date1 = api.query.results.channel.item.forecast[1].date;
      var date2 = api.query.results.channel.item.forecast[2].date;
      var date3 = api.query.results.channel.item.forecast[3].date;
      console.log(date1);
      console.log(date2);
      console.log(date3);
      $("#date1").text(date1);
      $("#date2").text(date2);
      $("#date3").text(date3);
      // change forecast temperature
      var date1Low = FToC(api.query.results.channel.item.forecast[1].low);
      var date2Low = FToC(api.query.results.channel.item.forecast[2].low);
      var date3Low = FToC(api.query.results.channel.item.forecast[3].low);
      var date1High = FToC(api.query.results.channel.item.forecast[1].high);
      var date2High = FToC(api.query.results.channel.item.forecast[2].high);
      var date3High = FToC(api.query.results.channel.item.forecast[3].high);
      console.log(date1Low);
      console.log(date2Low);
      console.log(date3Low);
      console.log(date1High);
      console.log(date2High);
      console.log(date3High);
      $("#date1Low").text(date1Low);
      $("#date2Low").text(date2Low);
      $("#date3Low").text(date3Low);
      $("#date1High").text(date1High);
      $("#date2High").text(date2High);
      $("#date3High").text(date3High);
      // change forecast weather
      var day1weather = api.query.results.channel.item.forecast[1].text;
      var day2weather = api.query.results.channel.item.forecast[2].text;
      var day3weather = api.query.results.channel.item.forecast[3].text;
      skycons.set("day1", weatherIcon(day1weather));
      skycons.set("day2", weatherIcon(day2weather));
      skycons.set("day3", weatherIcon(day3weather));
    } else {
      console.info("reloading:", weather(city));
      getCity(c)
    }
  });
  // change city
  var $city = $(this).text().substring(0, 3);
  console.log($city);
  weather($city);
  $('button').text($city);

  // change dropdown temperature
  var $dropdown = $("#dropdown li");
  $dropdown.each(function (index, element) {
    var vm = this;
    var cityName = $(this).text().slice(0, 3);
    console.log(cityName)
    var url = weather(cityName);
    $.getJSON(url, function (api) {
      var temp = FToC(api.query.results.channel.item.condition.temp);
      $(element).children('a').children('span').text(" " + temp + "°C");
    })
  })
};

function FToC(F) {
  return Math.round((F - 32) * (5 / 9)).toString();
};

function weather(city) {
  switch (city) {
    case "臺北市":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taipei%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "新北市":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22New%20Taipei%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "臺中市":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taichung%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "臺南市":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Tainan%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "高雄市":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Kaohsiung%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "基隆市":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Keelung%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "桃園市":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taoyuan%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "新竹市":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Hsinchu%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "新竹縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Hsinchu%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "苗栗縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Miaoli%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "彰化縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Changhua%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "南投縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Nantou%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "雲林縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Yunlin%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "嘉義市":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Chiayi%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "嘉義縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Chiayi%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "屏東縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Pingtung%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "宜蘭縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Yilan%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "花蓮縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Hualien%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "臺東縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taitung%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "澎湖縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Penghu%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "金門縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Kinmen%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    case "連江縣":
      return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Lienchiang%20County%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  }
}

function weatherIcon(weatherName) {
  switch (weatherName) {
    case "Sunny":
      return "CLEAR_DAY";
    case "Clear Night":
      return "CLEAR_NIGHT";
    case "Partly Cloudy":
      return "PARTLY_CLOUDY_DAY";
    case "Cloudy":
      return "CLOUDY";
    case "Mostly Cloudy":
      return "CLOUDY";
    case "Rain":
      return "RAIN";
    case "Scattered Showers":
      return "RAIN";
    case "Showers":
      return "RAIN";
    case "Scattered Thunderstorms":
      return "RAIN";
    case "Thunderstorms":
      return "RAIN";
    case "Sleet":
      return "SLEET";
    case "Snow":
      return "SNOW";
    case "Windy":
      return "WIND";
    case "Breezy":
      return "WIND";
    case "Foggy":
      return "FOG";
  }
}