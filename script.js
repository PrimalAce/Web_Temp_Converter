document.addEventListener('DOMContentLoaded', function() { // Wait for the DOM to load

    const temperatureInput = document.getElementById('temperature');
    const unitSelect = document.getElementById('unit');
    const resultInput = document.getElementById('result');
    const resultUnitSelect = document.getElementById('resultUnit');
    const historyToggle = document.getElementById('historyToggle');
    const historySection = document.getElementById('historySection');
    const historyList = document.getElementById('historyList');


    let conversions = JSON.parse(localStorage.getItem('conversions')) || [];


    function convertTemperature() {
        const temperature = parseFloat(temperatureInput.value); // Convert input to a number

        if (isNaN(temperature)) {
            resultInput.value = '';  // Clear the result if invalid input
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

        // Save to history
        addToHistory(temperature, initialUnit, convertedTemperature.toFixed(2), resultUnit);
    }


    function addToHistory(temp, unit, result, resultUnit) {
        conversions.unshift({
            temperature: temp,
            unit: unit,
            result: result,
            resultUnit: resultUnit,
            timestamp: new Date().toISOString()
        });

        // Keep only last 50 conversions
        if (conversions.length > 50) {
            conversions.pop();
        }

        localStorage.setItem('conversions', JSON.stringify(conversions));
        updateHistoryDisplay();
    }


    function getTimeAgo(timestamp) {
        const now = new Date();
        const past = new Date(timestamp);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30);

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
        return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    }


    function updateHistoryDisplay() {
        if (conversions.length === 0) {
            historyList.innerHTML = '<p style="text-align: center; color: #999;">No conversions yet</p>';
            return;
        }

        historyList.innerHTML = conversions.map(conv => `
            <div class="history-item">
                <strong>${conv.temperature}° ${conv.unit.charAt(0).toUpperCase() + conv.unit.slice(1)}</strong> → <strong>${conv.result}° ${conv.resultUnit.charAt(0).toUpperCase() + conv.resultUnit.slice(1)}</strong>
                <div class="history-time">${getTimeAgo(conv.timestamp)}</div>
            </div>
        `).join('');
    }


    // Toggle history section
    historyToggle.addEventListener('click', function() {
        historySection.style.display = historySection.style.display === 'none' ? 'block' : 'none';
    });

    // Real-time conversion listeners
    temperatureInput.addEventListener('keyup', convertTemperature);
    unitSelect.addEventListener('change', convertTemperature);
    resultUnitSelect.addEventListener('change', convertTemperature);

    // Load and display history on page load
    updateHistoryDisplay();
});
