let searchBtn = document.querySelector('.btn');
let locationname = document.querySelector('.location')
let curr_temp = document.querySelector('.data')
let humid = document.querySelector('.humid')
let wind = document.querySelector('.wind')
let image = document.querySelector('.main-content img')
let container = document.querySelector('.container')
let main_content = document.querySelector('.main-content')
let error = document.querySelector('.not-found')
let container_hide = document.querySelector('.container-hide')

// Click event on a search Button to search the weather of city
searchBtn.addEventListener('click',function(){
    let city = document.querySelector('.search input').value;
    const ApiKey = '4d8f68f3a047a69766809f45bf6cebba';
    
    // Fetches the api to show the data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`)
    .then(res=>res.json())
    .then(data=>{
     
       container.style.display = 'block';
       
       // To handle the 404 error in the api    
       if(data.cod == '404'){
        container_hide.style.display = 'none'
        error.style.display = 'block'
       }
       else{
        container_hide.style.display = 'block'
        error.style.display = 'none'

        // Remove the animation class
       main_content.style.animation = 'none';
       // Trigger reflow
       void main_content.offsetWidth;
       // Re-apply the animation class
       main_content.style.animation = 'temp 1s ease';

       //Humid animation Control
       humid.style.animation = 'none'; 
       void humid.offsetWidth;   
       humid.style.animation = 'humid_anim 1s ease';

       //Wind animation Control
       wind.style.animation = 'none'; 
       void wind.offsetWidth;   
       wind.style.animation = 'wind_anim 1s ease';

       //To show the image based on the weather    
       switch(data.weather[0].main){
        case 'Clouds':
            image.src='images/cloud.png';
            break;
        case 'Clear':
            image.src='images/clear.png';
            break;
        case 'Mist':
            image.src='images/mist.png';
            break;
        case 'Haze':
            image.src='images/mist.png';
            break;
        case 'Rain':
            image.src='images/rain.png';
            break;
        case 'Snow':
            image.src='images/snow.png';
            break;
        default:
            image.src='images/cloud.png';
        }
        
        locationname.innerHTML= data.weather[0].description;
        curr_temp.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`
        humid.innerHTML = `${data.main.humidity}%`
        wind.innerHTML = `${parseInt(data.wind.speed)}km/hr`
       }
       
    })
})





