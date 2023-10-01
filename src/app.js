const path = require('path')
const express = require('express')
const cors = require('cors');
const app = express()
const hbs = require('hbs')

const geocoder =require('./utilis/geocoder')
const endpoint = require('./utilis/endpoint') 

const partialpath = path.join(__dirname,'../templates/partial')
const viewpath = path.join(__dirname,'../templates/views')
// console.log(partialpath)
hbs.registerPartials(partialpath)
// set up the views directory 
app.set('views', viewpath);
app.set('view engine', 'hbs');

//s et up the public directory
const dirpath = path.join(__dirname,'../Public')
// console.log(path.join(__dirname,'../Public/help.html'))
// const helppath =path.join(__dirname,'../Public/help.html')
// console.log(__dirname,'../views')

// to see the static view page
app.use(express.static(dirpath))
app.use(cors());

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather app",
        name: "Himanshu Garg"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Page",
        name: "Himanshu Garg"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help Page",
        name : "Himanshu Garg"
    })
})

// app.get('/help/*',(req,res)=>{
//     res.send("help arical is not found")
// })



// console.log(__dirname)
// console.log(__filename)

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World</h1>')
// })

// app.get('/home',(req, res) => {
//     res.send([{
//         name:"Himanshu"
//     },
// {
//     name: "Ravi"
// }])
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather',(req, res) => {
    // console.log("hello")
    // console.log(req.query)
    if(!req.query.address){

        return res.send("Please provided the address")
    }


    geocoder(req.query.address,(error,{latitude,longitude,place_name}={})=>{
        if(error){
            // return console.log(error)
            return res.send({error})
        }
    
        endpoint(latitude,longitude,(error,endpointdata)=>{
            if(error){
                // return console.log(error)
                return res.send({error})
            }
            console.log(place_name)
            console.log(endpointdata)
          

            res.send({
                forcast: endpointdata,
                place_name,
                address: req.query.address
            })
        })
    })

    // res.send([{
    //     forcast: '50 degree',
    //     location: "delhi",
    //     address: req.query.address
    // }])
})



app.get('/help/*',(req,res)=>{
    res.render('help',{
        title:"Error Page",
        error:"help artical not found",
        name: "Himanshu Garg"
    })
})

app.get('*',(req,res)=>{
    res.render('what',{
        title:"Error Page",
        error:"Page not found 404",
        name: "Himanshu Garg"
    })
})

app.get('*',(req,res)=>{
    res.send('My page 404')
})

app.listen(3000,()=>{
    console.log("express server up on 3000 port")
})