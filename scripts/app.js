const cityForm = document.querySelector('form');

const card=document.querySelector('.card');

const details= document.querySelector('.details');

const time=document.querySelector('.card img ');

const icon=document.querySelector('.icon img')


const updateUI=(data)=>{

    // const cityDetails =data.cityDetails;
    // const weather =data.weather;

    //destructure properties
    const{ cityDetails,weather}=data;

    //update details template

    details.innerHTML=`
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
    `;

    //update day/night and icon images

    const iconSrc =`img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src',iconSrc);

    let timeSrc=null;
    if(weather.IsDayTime){
        timeSrc='img/day.svg'
    }else{
        timeSrc='img/night.svg'
    }
    time.setAttribute('src',timeSrc)

    //remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city)=>{
    
    const cityDetails = await getCity(city);

    const weather = await getWeather(cityDetails.Key);

    return{cityDetails,weather};
}

cityForm.addEventListener('submit',e=>{
    e.preventDefault();

    const city =cityForm.city.value;

    cityForm.reset();

    //update ui with new city
    updateCity(city)
        .then(data=>updateUI(data))
        .catch(err => console.log(err));

});