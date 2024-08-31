document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ""){
        clearinfo();

        showWarning('Carregando...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=45f9da70db5ff7bf458aa506aedeede1&units=metric&lang=pt_br`;
        
        let result = await fetch(url);
        let json = await result.json();
         
        console.log(json)
        if(json.cod === 200){
            CreateWeather({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                Windspeed: json.wind.speed,
                Windangle: json.wind.deg
            })
        }else{
            clearinfo()
            showWarning('localização nao escontrada')
        }
    }else{
        clearinfo()
    };
});

const showWarning = (msg) => {
    document.querySelector('.aviso').innerHTML = msg
}

const CreateWeather = (json) =>{
    showWarning('');
    
    document.querySelector('.resultado').style.display = 'block';
    
    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
   
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`;
    
    document.querySelector('.ventoInfo').innerHTML = `${json.Windspeed}<span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').setAttribute('style', `transform: rotate(${json.Windangle}deg)`)

    document.querySelector('#searchInput').value = '';
}

const clearinfo = () => {
    showWarning('');

    document.querySelector('.resultado').style.display = 'none';
}