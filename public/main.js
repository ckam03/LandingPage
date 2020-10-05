const time = document.getElementById('Time');
let greeting = document.getElementById('greeting');
let name = document.getElementById('name');

function showTime() {
    let today = new Date();
    hour = today.getHours();
    min = today.getMinutes();

    // sets AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';
    // 12 hour format
    hour = hour % 12 || 12;
    Time.innerHTML = new Date().toLocaleTimeString();
    setTimeout(showTime, 1000);
}

async function getPhoto() {
    try {
        const response = await fetch('/photos/random', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        const photoData = await response.json();
        console.log(photoData)
        var unsplashImage = `url(${photoData.urls.full})`;
        savePhoto(unsplashImage)
    }
    catch (error) {
        console.log(error)
    }   
}

function setPhoto() {
    unsplashImage = localStorage.getItem('bg');
    document.body.style.backgroundImage = unsplashImage; 
}

function savePhoto(unsplashImage) {
        localStorage.setItem('bg', unsplashImage);
        setPhoto();

}

//changes background and greeting based on time of day
function setBgGreeting() {
    let today = new Date(),
        hour = today.getHours();
        minute = today.getMinutes();

    if (hour < 12) {
        greeting.textContent = 'Good Morning,';
    }

    else if (hour < 18) {

        greeting.textContent = 'Good Afternoon,';
        document.body.style.color = 'white';
    }
    else {

        greeting.textContent = 'Good Evening,';
        document.body.style.color = 'white';
    }
}
getPhoto();
showTime();
setBgGreeting();



