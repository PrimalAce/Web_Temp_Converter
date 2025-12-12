document.addEventListener('DOMContentLoaded', function() { // Wait for the DOM to load

    const temperatureInput = document.getElementById('temperature');
    const unitSelect = document.getElementById('unit');
    const convertBtn = document.getElementById('convertBtn');
    const resultInput = document.getElementById('result');
    const resultUnitSelect = document.getElementById('resultUnit');


    function convertTemperature() {
        const temperature = parseFloat(temperatureInput.value); // Convert input to a number

        if (isNaN(temperature)) {
            alert("Please enter a valid number.");
            return;
        }

        let initialUnit = unitSelect.value;
        let resultUnit = resultUnitSelect.value;


        let convertedTemperature;

        if (initialUnit === 'celsius' && resultUnit === 'fahrenheit') {
            convertedTemperature = (temperature * 9/5) + 32;
        } else if (initialUnit === 'fahrenheit' && resultUnit === 'celsius') {
            convertedTemperature = (temperature - 32) * 5/9;
        } else { // Same units, no conversion needed
            convertedTemperature = temperature;
        }

        resultInput.value = convertedTemperature.toFixed(2);  // Display result with 2 decimal places
    }


    convertBtn.addEventListener('click', convertTemperature);

    // Optional: Convert on Enter key press in the input field
    temperatureInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            convertTemperature();
        }
    });
});
