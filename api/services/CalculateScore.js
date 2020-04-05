module.exports = function({
    years,
    numberOfRespirations,
    oxygenSaturation,
    anyAdditionalO2,
    systolicPressure,
    heartRate,
    stateOfConsciousness,
    bodyTemperature}) {

    let score = 0;
    let mark3 = false;

    if(years >= 65) { score += 3; mark3 = true; }

    if(numberOfRespirations <= 8 || numberOfRespirations >= 25) { score += 3; mark3 = true; }
    else if(numberOfRespirations >= 21 && numberOfRespirations <= 24) score += 2;
    else if(numberOfRespirations >= 9 && numberOfRespirations <= 11) score += 1;

    if(oxygenSaturation <= 91) { score += 3; mark3 = true; }
    else if(oxygenSaturation >= 92 && oxygenSaturation <= 93) score += 2;
    else if(oxygenSaturation >= 94 && oxygenSaturation <= 95) score += 1;

    if(anyAdditionalO2) score += 2;

    if(systolicPressure <= 90 || systolicPressure >= 220) { score += 3; mark3 = true; }
    else if(systolicPressure >= 91 && systolicPressure <= 100) score += 2;
    else if(systolicPressure >= 101 && systolicPressure <= 110) score += 1;

    if(heartRate <= 40 || heartRate >= 131) { score += 3; mark3 = true; }
    else if(heartRate >= 111 && heartRate <= 130) score += 2;
    else if(heartRate >= 41 && heartRate <= 50) score += 1;
    else if(heartRate >= 91 && heartRate <= 110) score += 1;

    if(stateOfConsciousness === 'Somnolent' ||
       stateOfConsciousness === 'Lethargic' ||
       stateOfConsciousness === 'Comatose' ||
       stateOfConsciousness === 'Confused'
    ) { score += 3; mark3 = true; }

    if(bodyTemperature  <= 35.0 ) { score += 3; mark3 = true; }
    else if(bodyTemperature >= 39.1) score += 2;
    else if(bodyTemperature >= 35.1 && bodyTemperature <= 36.0) score += 1;
    else if(bodyTemperature >= 38.1 && bodyTemperature <= 39.0) score += 1;

    if(mark3 === true && score < 7) return 2;
    if(score === 0) return 0;
    else if(score >= 1 && score <= 4) return 1;
    else if(score >= 5 && score <= 6) return 2;
    else if(score === 7) return 3;
    else return 4;
}