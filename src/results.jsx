import React from 'react';
import 'isomorphic-fetch';
import Header from './components/Header.jsx'
import ResultsTable from './components/ResultsTable.jsx'
import Filters from './components/Filters.jsx'


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


