const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response){
  response.render("index");
});


app.post("/",function(request,response){
  const city=request.body.city;
  const appid="token";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+appid;
  https.get(url, function(res){
    console.log(res.statusCode);
    res.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      response.render('result', {cityName:city,weatherDescription:weatherDescription,temp:temp,imgurl:imgurl});
    });
  });
});

app.listen(3000,function() {
  console.log("Server started on port 3000");
});
