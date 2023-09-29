const request = require('request')

const geocoder=(address,callback)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiaGltYW5zaHUzODI3OSIsImEiOiJja3BtdjlpejY0ODl5Mm9ueG5hNHk3cnQ2In0.bxeas-SkaecgxpjkvddM7A&limit=1"
    request({url,json:true},(error,{body})=>{
            if(error){
                callback("Unable to connect the weather service!",undefined)
            }else if(body.message){
                callback("Unable to find location! Try another search",undefined)
            }
            else if(body.features.length==0){
                callback("Unable to find location! Try another search",undefined)
            }
            else{
                callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            })
            }
            
        }) 
 
}

module.exports = geocoder