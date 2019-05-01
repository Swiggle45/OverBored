import React from 'react';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="filters">
                <p>Distance<br />
                    <div className="slideContainer">
                        <input type="range" className="slider" id="distanceSlider" min="0" max="25" step="5" defaultValue="25" onChange={() => this.props.changeDist(document.getElementById("distanceSlider").value)} />
                    </div>
                    <div id="distanceValue">{distEval(this.props.dist)}</div>
                </p>

                <p>Price Range<br />
                    <div className="slideContainer">
                        <input type="range" className="slider" id="priceSlider" min="1" max="3" step="1" defaultValue="3" onChange={() => this.props.changePrice(document.getElementById("priceSlider").value)}></input>
                    </div>
                    <div id="priceValue">{priceEval(this.props.price)}</div>
                </p>

                <p>Number of People<br />
                    <div className="slideContainer">
                        <input type="range" className="slider" id="peopleSlider" min="1" max="11" step="1" defaultValue="11" onChange={() => this.props.changePeople(document.getElementById("peopleSlider").value)} />
                    </div>
                    <div id="peopleValue">{peopleEval(this.props.people)}</div>
                </p>

                <p>Activity Level<br />
                    <div className="slideContainer">
                        <input type="range" className="slider" id="activitySlider" min="1" max="3" step="1" defaultValue="3" onChange={() => this.props.changeActivity(document.getElementById("activitySlider").value)} />
                    </div>
                    <div id="activityValue">{activityEval(this.props.activity)}</div>
                </p>

                <p>Over 21?<br />
                    <div className="checkContainer">
                        <input type="checkbox" id="ageCheck"></input>
                    </div>
                </p>
                <script>

                </script>
            </div>
        );
    }
}