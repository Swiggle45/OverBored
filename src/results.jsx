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
    constructor() {
        super();
        this.state = {
            data : [{name: "Blue Wall", price:"$$", distance:"On Campus", numberOfPeople:"Any", activityLvl:"low"},
                {name: "Rec Center", price: "$", distance: "On Campus", numberOfPeople: "Any", activityLvl: "high"}]
        }
    }

    render() {
        let rows = this.state.data.map(location => {
            return <LocationRow key = {
                location.name
            } data = {
                location
            }
            />
        })
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
            data : [{name: "Blue Wall", price:"$$", distance:"On Campus", numberOfPeople:"Any", activityLvl:"low"},
                {name: "Rec Center", price: "$", distance: "On Campus", numberOfPeople: "Any", activityLvl: "high"}]
        }
    }

    render() {
        let rows = this.state.data.map(location => {
            return <LocationRow key = {
                location.name
            }
                                data = {
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
                { props.data.name}
            </td>
            <td>
                {props.data.price}
            </td>
            <td>
                {props.data.distance}
            </td>
            <td>
                {props.data.numberOfPeople}
            </td>
            <td>
                {props.data.activityLvl}
            </td>
        </tr>
    )
}



// This renders the JSX component inside the content node:
ReactDOM.render(<Header />, headerNode);
ReactDOM.render(<MyComponent />, contentNode);