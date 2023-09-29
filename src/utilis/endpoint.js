const request = require('request')

const endpoint= (lat,log,callback)=>{
       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(log)}&appid=e0e0737fc26fc80b53c3d8eb490df684&units=imperial`;
  
      request({url,json:true},(error,{body})=>{
          if(error){
              callback("Unable to connect the weather service!",undefined)
          }else if(body.message){
              callback("Unable to find location",undefined)
  
          }else{
             callback(undefined,`${body.weather[0].description}. It is currently ${body.main.temp} degree out . It is fell like ${body.main.feels_like} degree out`
  
             )
          }
  
      })
  }

  module.exports=endpoint