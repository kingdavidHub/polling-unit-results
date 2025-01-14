async function getPollingUnits() {
  try {
    const response = await fetch("/api/polling-units");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    displayResults(data);
  } catch (error) {
    console.error("Error fetching polling unit results:", error);
  }
}

const displayResults = (data) => {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (data.length === 0) {
    resultsContainer.innerHTML =
      "<p>No results found for this polling unit.</p>";
    return;
  }

  data.forEach((result) => {
    const resultElement = document.createElement("div");
    resultElement.classList.add("result-item");
    resultElement.innerHTML = `
            <h3>${result.polling_unit_name}</h3>
            <p>Polling unit number: ${result.polling_unit_number}</p>
            <p>Ward ID: ${result.ward_id}</p>
            <p>Location: Lat : ${result.lat} Long: ${result.long}</p>
        `;
    resultsContainer.appendChild(resultElement);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  getPollingUnits();
});
