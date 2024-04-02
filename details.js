// Function to extract the country name from the URL query parameter
function getCountryNameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("country");
}

// Function to fetch country details from the API based on the country name
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



// Function to display country details on the details page
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
    // Remove the loader
    const loader = document.querySelector(".loader");
    loader.classList.add("close");

    // Populate the elements with country details
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

    // Add code to populate other details here if needed
}

// Call the function to display country details when the page loads
window.addEventListener("load", () => {
    displayCountryDetails();
});
