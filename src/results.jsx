// This is a place holder for the initial application state.
const state = [

];

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");
var headerNode = document.getElementById("header");

class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <header>
                <h1><a href="/index.html">OverBored</a></h1>
            </header>
        );
    }
}

class MyComponent extends React.Component {
    render() {
        return (
            <main>
                <div id="results">
                    <div id="head">
                        <FilterList />
                    </div>
                    <div id="table">
                        <ResultsTable />
                    </div>
                </div>
            </main>
        );
    }
}

class FilterList extends React.Component {
    render(){
        return (
            <div>
                List of filters
            </div>
        )
    }
}

class ResultsTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [{name: "Blue Wall", price:"2", distance:"0", numberOfPeople:"100", activityLvl:"1"},
                {name: "Rec Center", price: "1", distance: "0", numberOfPeople: "100", activityLvl: "3"},
                {name: "Cinemark Movie Theater", price: "2", distance: "3", numberOfPeople: "100", activityLvl: "1"},
                {name: "Central Rock Gym", price: "3", distance: "5", numberOfPeople:"100", activityLvl: "3"},
                {name: "Mt. Tom", price: "1", distance: "14", numberOfPeople: "100", activityLvl: "3"},
                {name: "Pinz", price: "2", distance: "3", numberOfPeople: "6", activityLvl: "2"}],
            filteredData: []
        }
    }

    render() {
        let priceVar = 2000;
        let distanceVar = 1000;
        let numberOfPeopleVar = 7;
        let activityLvlVar = 1;
        this.state.filteredData = this.state.data.filter(function(location) {
            return location.price <= priceVar && location.distance <= distanceVar && location.numberOfPeople >= numberOfPeopleVar && location.activityLvl <= activityLvlVar;
        });
        let rows = this.state.filteredData.map(location => {
            return <LocationRow key = {
                location.name
            } filteredData = {
                location
            }
            />
        })
        const borderedStyle = {border: "1px Solid Silver", padding: 6};
        return (
            <table>
                <thead>
                <tr style = {borderedStyle}>
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
        )
    }
}

const LocationRow = (props) => {
    return (
        <tr>
            <td>
                {props.filteredData.name}
            </td>
            <td>
                {priceEval(props.filteredData.price)}
            </td>
            <td>
                {distEval(props.filteredData.distance)}
            </td>
            <td>
                {peopleEval(props.filteredData.numberOfPeople)}
            </td>
            <td>
                {activityEval(props.filteredData.activityLvl)}
            </td>
        </tr>
    )
}

function priceEval(price){
    if(price == 1)
        return "$";
    else if(price == 2)
        return "$$";
    else
        return "$$$";
}

function distEval(distance){
    if(distance == 0)
        return "On Campus";
    else
        return distance + " miles";
}

function peopleEval(people){
    if(people == 100)
        return "Any";
    else
        return people + " or fewer"
}

function activityEval(activity){
    if(activity == 1)
        return "Low";
    else if(activity == 2)
        return "Medium";
    else
        return "High";

}



// This renders the JSX component inside the content node:
ReactDOM.render(<Header />, headerNode);
ReactDOM.render(<MyComponent />, contentNode);