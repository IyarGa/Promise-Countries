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
function createCountryElement(country) {
    const countryElement = document.createElement("a");
    const countryName=country.name.common;
    const countryRegion = country.region;
    countryElement.href = `details.html?country=${encodeURIComponent(country.name.common)}`;
    countryElement.classList.add("country", "scale-effect");
    countryElement.setAttribute("data-country-name", country.name.common);
    countryElement.setAttribute("data-region", countryRegion);
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


async function displayCountries() {
    const countries = await fetchCountries();
    const countriesContainer = document.querySelector(".countries-grid");
    countries.forEach(country => {
        const countryElement = createCountryElement(country);
        countriesContainer.appendChild(countryElement);
    });
}
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
            country.style.display = "block";
        } else {
            country.style.display = "none";
        }
    });
}

function filterByContinent(continent) {
    const countries = document.querySelectorAll(".country");
    countries.forEach(country => {
        const countryRegion = country.getAttribute("data-region");
        if (continent === "all" || countryRegion === continent) {
            country.style.display = "block";
        } else {
            country.style.display = "none";
        }
    });
}
document.querySelector(".dropdown-wrapper").addEventListener("click", function () {
    const dropdownBody = document.querySelector(".dropdown-body");
    dropdownBody.classList.toggle("show");
});
document.querySelector(".dropdown-body").addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        const selectedRegion = event.target.getAttribute("data-region");
        filterByContinent(selectedRegion);
    }
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-theme");
}

function updateThemeButtonIcon() {
    const themeIcon = document.querySelector(".theme-icon i");
    if (document.body.classList.contains("dark-theme")) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun-bright");
    } else {
        themeIcon.classList.remove("fa-sun-bright");
        themeIcon.classList.add("fa-moon");
    }
}
document.querySelector(".theme-toggle").addEventListener("click", function() {
    toggleDarkMode();
    updateThemeButtonText();
    updateThemeButtonIcon();
});
function updateThemeButtonText() {
    const themeText = document.querySelector(".theme-text");
    const currentMode = document.body.classList.contains("dark-theme") ? "Light Mode" : "Dark Mode";
    themeText.textContent = currentMode;
}



window.addEventListener("load", function() {
    updateThemeButtonText();
    updateThemeButtonIcon();
});
