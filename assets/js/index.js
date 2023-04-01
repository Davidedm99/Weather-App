const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const back = document.querySelector('.background');

search.addEventListener('click', ()=>{

    const APIKey = '38dfe973a5a37e70283a4da4f6d13ba9';
    const city = document.querySelector('.search-box input').value;

    if(city === ''){
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).
        then(response => response.json()).then(json => {
            console.log(json);

           if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
           } 

           error404.style.display = 'none';
           error404.classList.add('fadeIn');

           const image = document.querySelector('.weather-box img');
           const temperature = document.querySelector('.weather-box .temperature');
           const description = document.querySelector('.weather-box .description');
           const humidity = document.querySelector('.weather-details .humidity span');
           const wind = document.querySelector('.weather-details .wind span');

           switch(json.weather[0].main){
            case 'Clear':
                image.src = 'assets/images/clear.png';
                back.style.backgroundImage = 'url(https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618__480.jpg)';
                break;

            case 'Rain':
                image.src = 'assets/images/rain.png';
                back.style.backgroundImage = 'url(https://cdn.pixabay.com/photo/2020/03/17/20/23/rain-4941771__480.jpg)';
                break;

            case 'Snow':
                image.src = 'assets/images/snow.png';
                back.style.backgroundImage = 'url(https://www-cdn.eumetsat.int/files/2022-04/AdobeStock_blizzard_snow_aspot.jpg)';
                break;

            case 'Clouds':
                image.src = 'assets/images/clouds.png';
                back.style.backgroundImage = 'url(https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/sky-1107579_1920.jpg)';
                break; 
                
            case 'Haze':
                image.src = 'assets/images/haze.png';
                back.style.backgroundImage = 'url(https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWlzdHxlbnwwfHwwfHw%3D&w=1000&q=80)';
                break;    

            default:
                image.src = '';    
           }

           back.style.backgroundRepeat = "repeat-y";
           back.style.backgroundPosition = "center";
           back.style.backgroundSize = "cover";

           temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span`;
           description.innerHTML = `${json.weather[0].description}`;
           humidity.innerHTML = `${json.main.humidity}%`
           wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

           weatherBox.style.display = '';
           weatherDetails.style.display = '';
           weatherBox.classList.add('fadeIn');
           weatherDetails.classList.add('fadeIn');
           container.style.height = '605px';

        })
})