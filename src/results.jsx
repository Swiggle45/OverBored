import React from 'react';
import 'isomorphic-fetch';
import Header from './components/Header.jsx'


// This grabs the DOM element to be used to mount React components.
export default class Results extends React.Component {
    constructor() {
        super();
        this.state = {
            price: 3,
            distance: 25,
            numberOfPeople: 11,
            activityLvl: 3
        }
    }
    render() {
        return (
            <div id="results">
                <Header/>
            <main>
                <div>
                    <div id="main">
                        <div id="table">
                            <ResultsTable priceVar={this.state.price}
                                          distVar={this.state.distance}
                                          peopleVar={this.state.numberOfPeople}
                                          activityVar={this.state.activityLvl} />
                        </div>
                    </div>
                    <div id="line"></div>
                    <div id="sidebar">
                        <Filters price={this.state.price} changePrice={(price) => this.setState({ price: price })}
                                 dist={this.state.distance} changeDist={(distance) => this.setState({ distance: distance })}
                                 people={this.state.numberOfPeople} changePeople={(numberOfPeople) => this.setState({ numberOfPeople: numberOfPeople })}
                                 activity={this.state.activityLvl} changeActivity={(activity) => this.setState({ activityLvl: activity })} />
                    </div>
                    <div id="sliders">

                    </div>
                </div>
            </main>
            </div>
        );
    }
}

class ResultsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { places: [] , filteredData: [] };

        this.createPlace = this.createPlace.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps === this.props) {
            return;
        }
        this.loadData();
    }

    loadData() {
        fetch(`/api/results`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log("Total count of records:", data._metadata.total_count);
                    this.setState({ places: data.records });
                });
            } else {
                response.json().then(error => {
                    alert("Failed to fetch places:" + error.message)
                });
            }
        }).catch(err => {
            alert("Error in fetching data from server:", err);
        });
    }

    createPlace(newPlace) {
        fetch('/api/results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPlace),
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(updatedPlace => {
                        const newPlaces = this.state.places.concat(updatedPlace);
                        this.setState({ places: newPlaces, filteredData: this.state.filteredData });
                    });
                }
                else {
                    res.json()
                        .then(error => {
                            alert('Failed to add issue: ' + error.message);
                        });
                }
            });
    }

    setFilter(query) {
        this.props.router.push({ pathname: this.props.location.pathname, query });
    }

    render() {
        let priceVar = this.props.priceVar;
        let distanceVar = parseInt(this.props.distVar);
        let numberOfPeopleVar = parseInt(this.props.peopleVar);
        let activityLvlVar = this.props.activityVar;
        this.state.filteredData = this.state.places.filter(function (location) {
            return location.price <= priceVar && location.distance <= distanceVar && location.numberOfPeople <= numberOfPeopleVar && location.activityLvl <= activityLvlVar;
        });
        let rows = this.state.filteredData.map(location => {
            return <LocationRow key={
                location.name
            } places={
                location
            }
            />
        })
        const borderedStyle = { border: "1px Solid Silver", padding: 6 };
        return (
            <div>
                <div id="newPlace">
                    <AddPlace createPlace={this.createPlace} />
                </div>
                <table>
                    <thead>
                    <tr style={borderedStyle}>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Distance</th>
                        <th>Number of People</th>
                        <th>Activity Level</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>

        )
    }
}

let LocationRow = (props) => {
    return (
        <tr>
            <td>
                {props.places.name}
            </td>
            <td>
                {priceEval(props.places.price)}
            </td>
            <td>
                {distEval(props.places.distance)}
            </td>
            <td>
                {peopleEval(props.places.numberOfPeople)}
            </td>
            <td>
                {activityEval(props.places.activityLvl)}
            </td>
        </tr>
    )
}

class Filters extends React.Component {
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

class AddPlace extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let form = document.forms.placeAdd;
        this.props.createPlace({
            name: form.name.value,
            price: form.price.value,
            distance: form.distance.value,
            numberOfPeople: form.numberOfPeople.value,
            activityLvl: form.activityLvl.value,
        });
        // Clear the form for the next input.
        form.name.value = '';
        form.price.value = '';
        form.distance.value = '';
        form.numberOfPeople.value = '';
        form.activityLvl.value = '';
    }

    render() {
        return (
            <div>
                <form name="placeAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="price" placeholder="Price" />
                    <input type="text" name="distance" placeholder="Distance" />
                    <input type="text" name="numberOfPeople" placeholder="Number of People" />
                    <input type="text" name="activityLvl" placeholder="Activity Level" />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}


function priceEval(price) {
    if (price == 1)
        return "$";
    else if (price == 2)
        return "$$";
    else
        return "$$$";
}

function distEval(distance) {
    if (distance == 0)
        return "On Campus";
    else
        return distance + " miles";
}

function peopleEval(people) {
    if (people >= 11)
        return "Any";
    if (people == 1)
        return people;
    else
        return people + " or fewer"
}

function activityEval(activity) {
    if (activity == 1)
        return "Low";
    else if (activity == 2)
        return "Medium";
    else
        return "High";

}


