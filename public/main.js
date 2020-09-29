

const time = document.getElementById('Time');
greeting = document.getElementById('greeting');
var name = document.getElementById('name');

function showTime() {
    let today = new Date();
    hour = today.getHours();
    min = today.getMinutes();
    //sec = today.getSeconds();

    // sets AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';
    // 12 hour format
    hour = hour % 12 || 12;

    //Time.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${sec}`;
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
        //console.log(photoData)
        setPhoto(photoData)
    }
    catch (error) {
        console.log(error)
    }   
}

function setPhoto(photoData) {
    document.body.style.backgroundImage = `url(${photoData.urls.full})`;
}


//changes background and greeting based on time of day
function setBgGreeting() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 12) {
        //document.body.style.backgroundImage = "url('../public/imgs/morning.jpg')";
        greeting.textContent = 'Good Morning,';
    }
    else if (hour < 18) {
        //document.body.style.backgroundImage = "url('../public/imgs/field.jpg')";
        greeting.textContent = 'Good Afternoon,';
        document.body.style.color = 'white';
    }
    else {
        //document.body.style.backgroundImage = "url('../public/imgs/evening.jpg')";
        greeting.textContent = 'Good Evening,';
        document.body.style.color = 'white';
    }
}



showTime();
getPhoto();
setBgGreeting();



