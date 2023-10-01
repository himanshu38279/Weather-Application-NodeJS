console.log("client data run in the browser")

fetch("https://puzzle.mead.io/puzzle").then((Response)=>{
    Response.json().then((data)=>{
        console.log(data)
    })
})

// fetch("http://localhost:3000/weather?address=boston").then((Response)=>{
//     Response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//         console.log(data.forcast)
//         console.log(data.place_name)}
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const message1= document.getElementById('message_1')
const message2= document.getElementById('message_2')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value
    console.log(location)
    message1.innerHTML="Weather Forcast Data Loading ....."
    message2.innerHTML=""
    fetch(`/weather?address=${location}`).then((Response)=>{
    Response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            message2.innerHTML= data.error
        }else{
            // const forcastingdatacome= 
            message1.innerHTML = data.place_name
            message2.innerHTML= data.forcast 

        console.log(data.forcast)
        console.log(data.place_name)}
    })
})

})