import React from 'react';

export default class ResultsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { places: [] , filteredData: [] };

        this.createPlace = this.createPlace.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }


    componentDidMount() {
        this.loadData();
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDMJ89iDBtg94S6Z9a3Q0i-bsybJ-3YmCI&libraries=places')
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