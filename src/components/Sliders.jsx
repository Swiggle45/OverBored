import React from 'react';

export default class Sliders extends React.Component {
    constructor() {
        super();
    }

    render() {
        let distanceSlider = document.getElementById("distanceSlider");
        let distanceOut = document.getElementById("distanceValue");
        distanceOut.innerHTML = distanceSlider.value;

        distanceSlider.oninput = function () {
            let value = this.value;

            distanceOut.innerHTML = value;
        }

        let priceSlider = document.getElementById("priceSlider");
        let priceOut = document.getElementById("priceValue");
        priceOut.innerHTML = priceSlider.value;

        priceSlider.oninput = function () {
            let value = this.value;

            priceOut.innerHTML = value;
        }

        let peopleSlider = document.getElementById("peopleSlider");
        let peopleOut = document.getElementById("peopleValue");
        peopleOut.innerHTML = peopleSlider.value;

        peopleSlider.oninput = function () {
            let value = this.value;

            peopleOut.innerHTML = value;
        }

        let activitySlider = document.getElementById("activitySlider");
        let activityOut = document.getElementById("activityValue");
        activityOut.innerHTML = activitySlider.value;

        activitySlider.oninput = function () {
            let value = this.value;

            activityOut.innerHTML = value;
        }
        return {
        }
    }
}