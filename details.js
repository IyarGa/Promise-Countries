function getCountryNameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("country");
}
async function fetchCountryDetails(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error("Unable to fetch country details.");
        }
        const [country] = await response.json();
        return country;
    } catch (error) {
        console.error("Error fetching country details:", error);
        return null;
    }
}

async function displayCountryDetails() {
    const countryName = getCountryNameFromUrl();
    if (!countryName) {
        console.error("Country name not found in URL.");
        return;
    }

    const country = await fetchCountryDetails(countryName);
    if (!country) {
        console.error("Country details not found.");
        return;
    }
    const loader = document.querySelector(".loader");
    loader.classList.add("close");
    const countryFlag = document.querySelector(".country-flag img");
    countryFlag.src = country.flags.svg;
    const countryNameElement = document.querySelector(".country-name");
    countryNameElement.textContent = countryName;
    const populationElement = document.querySelector(".population");
    populationElement.textContent = country.population;
    const regionElement = document.querySelector(".region");
    regionElement.textContent = country.region;
    const capitalElement = document.querySelector(".capital");
    capitalElement.textContent = country.capital;
}
window.addEventListener("load", () => {
    displayCountryDetails();
});
