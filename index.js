const all = document.querySelector('.all');
const search = document.querySelector('#search-button');
const input = document.querySelector('#search-input');
const weather_main = document.querySelector('.weather-main');
const weather_additional = document.querySelector('.weather-additional');
const error = document.querySelector('.error');
const date = document.querySelector('.updated');
const main = document.querySelector('.main');
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("search-button").click();
    }});
search.addEventListener('click', ()=>{
    const APIKey = "9658e640c854a6edb90fc2f5fbac3c7d";
    const city = document.querySelector('.search input').value;
    console.log(city);
    if (city==='')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{
        const data = new Date();        
        date.innerHTML = data.getHours()+":"+data.getMinutes();
        
            if (json.cod==='404'){
                main.style.height='400px';
                weather_main.style.display='none';
                weather_additional.style.display='none';
                date.display='none';
                error.style.display='block';
                error.classList.add('fadeIn');
                return;
            }
            error.style.display='none';
            error.classList.remove('fadeIn');

            const img = document.querySelector('.weather-main img');

            switch (json.weather[0].main) {
                case 'Clear':
                    if (data.getHours()<18)
                        img.src = 'img/clearday.png';
                    else
                        img.src = 'img/clearnight.png'
                    break;

                case 'Rain':
                    img.src = 'img/rain.png';
                    break;

                case 'Snow':
                    img.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    img.src = 'img/cloud.png';
                    break;

                case 'Haze':
                    img.src = 'img/fog.png';
                    break;

                default:
                    img.src = '';
            }
            const temperature = document.querySelector('.temperature');
            const details = document.querySelector('.details');
            const humidity = document.querySelector('.humidity span');
            const real_feel = document.querySelector('.real-feel span');
            const wind = document.querySelector('.wind span');
            const min = document.querySelector('.min span');
            const max = document.querySelector('.max span');
            console.log(json);
            
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            details.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            real_feel.innerHTML = `${parseInt(json.main.feels_like)}<span>°C</span>`
            console.log(json.main.feels_like);
            // min.innerHTML=`${parseInt(json.main.temp_min)}<span>°C</span>`
            // max.innerHTML=`${parseInt(json.main.temp_max)}<span>°C</span>`
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            
            if (data.getHours()>16&&data.getHours()<6){
                console.log("night");
                main.style.backgroundColor="midnightblue";
                document.body.style.color = "whitesmoke";
                wind.style.color="whitesmoke";
                real_feel.classList.add("white");
                humidity.style.color="whitesmoke";
                details.style.color="whitesmoke";
                temperature.style.color="whitesmoke";
                document.querySelector('.search input').style.backgroundColor="midnightblue";
                document.querySelector('.search input').style.color="whitesmoke";
                const icons = document.querySelectorAll('i');
                icons.forEach((element) => {
                    element.style.color="whitesmoke";
                  });
            }
            else{
                main.style.backgroundColor="darkorange";
                input.style.backgroundColor="darkorange";
                date.style.color="#223a3a";
                details.style.color="223a3a";
            }
            main.style.height = '600px';
            weather_main.style.display = '';
            weather_additional.style.display = '';
            weather_main.classList.add('fadeIn');
            weather_additional.classList.add('fadeIn');
            // input.classList.add('fadeInSearch');
})
})