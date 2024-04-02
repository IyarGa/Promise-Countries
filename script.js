
// Function to fetch countries data from the API
async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
            throw new Error("Unable to fetch countries data.");
        }
        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

// Function to create country HTML element
function createCountryElement(country) {
    const countryElement = document.createElement("a");
    const countryName=country.name.common;
    const countryRegion = country.region; // Get the region of the country
    countryElement.href = `details.html?country=${encodeURIComponent(country.name.common)}`;
    countryElement.classList.add("country", "scale-effect");
    countryElement.setAttribute("data-country-name", country.name.common);
    countryElement.setAttribute("data-region", countryRegion); // Set the region attribute


    // Extract the flag URL from the API response
    const flagUrl = country.flags.svg;

    countryElement.innerHTML =
        `<div class="country-flag">
      <img src="${flagUrl}" alt="${country.name.common} Flag" />
    </div>
    <div class="country-info">
      <h2 class="country-title">${country.name.common}</h2>
      <ul class="country-brief">
        <li><strong>Population: </strong>${country.population}</li>
        <li><strong>Region: </strong>${country.region}</li>
        <li><strong>Capital: </strong>${country.capital}</li>
      </ul>
    </div>`;
    return countryElement;
}

// Function to display countries on the main page
async function displayCountries() {
    const countries = await fetchCountries();
    const countriesContainer = document.querySelector(".countries-grid");
    countries.forEach(country => {
        const countryElement = createCountryElement(country);
        countriesContainer.appendChild(countryElement);
    });
}

// Call the function to display countries when the page loads
window.addEventListener("load", () => {
    displayCountries();
    document.querySelector(".search-input").addEventListener("input", handleSearch);
});



function handleSearch() {
    const searchInput = document.querySelector(".search-input");
    const searchTerm = searchInput.value.trim().toLowerCase();
    const countries = document.querySelectorAll(".country");

    countries.forEach(country => {
        const countryName = country.getAttribute("data-country-name").toLowerCase();
        if (countryName.includes(searchTerm)) {
            country.style.display = "block"; // Show matching countries
        } else {
            country.style.display = "none"; // Hide non-matching countries
        }
    });
}

// Filter countries by continent
function filterByContinent(continent) {
    const countries = document.querySelectorAll(".country");

    countries.forEach(country => {
        const countryRegion = country.getAttribute("data-region");
        if (continent === "all" || countryRegion === continent) {
            country.style.display = "block"; // Show countries matching the selected continent
        } else {
            country.style.display = "none"; // Hide countries not matching the selected continent
        }
    });
}

//Event listener for continent dropdown
//Event listener for dropdown header to toggle dropdown body visibility

document.querySelector(".dropdown-wrapper").addEventListener("click", function () {
    const dropdownBody = document.querySelector(".dropdown-body");
    dropdownBody.classList.toggle("show");
});
// Event listener for continent dropdown
document.querySelector(".dropdown-body").addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        const selectedRegion = event.target.getAttribute("data-region");
        filterByContinent(selectedRegion);
    }
});


// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-theme");
}

// Function to update theme toggle button icon
function updateThemeButtonIcon() {
    const themeIcon = document.querySelector(".theme-icon i");
    if (document.body.classList.contains("dark-theme")) {
        // If dark mode is active, change the icon to sun
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun-bright");
    } else {
        // If dark mode is not active, change the icon back to moon
        themeIcon.classList.remove("fa-sun-bright");
        themeIcon.classList.add("fa-moon");
    }
}

// Event listener for theme switcher button
document.querySelector(".theme-toggle").addEventListener("click", function() {
    toggleDarkMode();
    updateThemeButtonText();
    updateThemeButtonIcon();
});

// Function to update theme switcher button text
function updateThemeButtonText() {
    const themeText = document.querySelector(".theme-text");
    const currentMode = document.body.classList.contains("dark-theme") ? "Light Mode" : "Dark Mode";
    themeText.textContent = currentMode;
}


// Call the function to update theme switcher button text and icon when the page loads
window.addEventListener("load", function() {
    updateThemeButtonText();
    updateThemeButtonIcon();
});
