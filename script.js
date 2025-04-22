const openModalButton = document.getElementById("open-modal");
const modalWindowOverlay = document.getElementById("modal-overlay");
const closeModalButton = document.getElementById("close-modal");
let Longitude = null;
let Latitude = null;
const city = Longitude + Latitude;
let API_KEY = "d7c757ee7b3a22b8f08a5822bcc1a414"



const errorMessage = document.getElementById("errorMessage");

const showModalWindow = ()=>{
    modalWindowOverlay.style.display = "flex";
    // console.log("hello");
}

const closeModalWindow = ()=>{
    modalWindowOverlay.style.display = "none";
    closeModalButton.style.cursor = "pointer";
}

openModalButton.addEventListener("click", showModalWindow);
closeModalButton.addEventListener("click", closeModalWindow);

// Geolocation api 
const getLocation=()=>{
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,errorModal);
       
    } else{
        errorMessage.innerHTML="Geolocation is not supported by this browser";
    }
}

const success = (position) => {
    // Update the variables with position data
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    
    console.log(`Latitude: ${Latitude}, Longitude: ${Longitude}`);
    
    // After we have coordinates, call the weather function
    getWeatherByLocation();
};

// Error handler for geolocation
const error = (err) => {
    console.error(`Error getting location: ${err.message}`);
};

const errorModal = ()=>{
    alert("sorry, no position available");
}

// Get weather Function
const getWeatherByLocation = async () => {
    try {
        
        const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}`;
        
        const response = await fetch(currentWeatherURL);
        const data = await response.json();
        
        console.log("Weather data:", data);

        if (data.cod === 200) {
            const weatherHTML = `
                <div class="weather-info">
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <div class="weather-main">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                        <p class="temp">${Math.round(data.main.temp)}°C</p>
                    </div>
                    <p class="description">${data.weather[0].description}</p>
                    <div class="weather-details">
                        <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind: ${data.wind.speed} m/s</p>
                    </div>
                </div>
            `;
            errorMessage.innerHTML = weatherHTML;
            
        } else {
            errorMessage.innerHTML = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Start the process by getting the user's geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    console.error("Geolocation is not supported by this browser");
}


// Carousel control
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 1;
    
    function updateCarousel() {
      projectCards.forEach((card, index) => {
        card.className = 'project-card';
        
        if (index === currentIndex) {
          card.classList.add('active');
        } else if (index === currentIndex - 1 || (currentIndex === 0 && index === projectCards.length - 1)) {
          card.classList.add('prev');
        } else if (index === currentIndex + 1 || (currentIndex === projectCards.length - 1 && index === 0)) {
          card.classList.add('next');
        } else {
          card.classList.add('hidden');
        }
      });
    }
    
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
      updateCarousel();
    });
    
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % projectCards.length;
      updateCarousel();
    });
    
    // Allow clicking on cards to navigate
    projectCards.forEach((card, index) => {
      card.addEventListener('click', function() {
        if (index !== currentIndex) {
          currentIndex = index;
          updateCarousel();
        }
      });
    });
    
    // Enable keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
        updateCarousel();
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % projectCards.length;
        updateCarousel();
      }
    });
    
    // Enable swipe on touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      if (touchStartX - touchEndX > 50) {
        // Swipe left
        currentIndex = (currentIndex + 1) % projectCards.length;
        updateCarousel();
      } else if (touchEndX - touchStartX > 50) {
        // Swipe right
        currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
        updateCarousel();
      }
    }
  });
  // Hamburger
  const hamburger = document.querySelector('.hamburger');
  const navItems = document.querySelector('.nav-items');
  
  hamburger.addEventListener('click', () => {
      navItems.classList.toggle('active');
      hamburger.classList.toggle('active');
  });
  
  // Close menu when clicking on a nav item
  document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
          navItems.classList.remove('active');
          hamburger.classList.remove('active');
      });
  });