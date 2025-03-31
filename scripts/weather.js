const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const lat = 7.377376537971772;
const lon = 3.950717703055265;
const appid = "1ffd377f92f6b3a42caed1a63b316572";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`;

const apiFetch = async () => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();            
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const displayResults = (data) => {
    let desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const temp = data.main.temp;
    const iconsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    currentTemp.innerHTML = `${temp}&deg;C`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

apiFetch();