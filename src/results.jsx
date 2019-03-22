// This is a place holder for the initial application state.
const state = [

];

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

class MyComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <header>
          <h1><a href="/index.html">OverBored</a></h1>
        </header>
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
  render(){
    const borderedStyle = {border: "1px Solid Silver", padding: 10};
    return (
      <table>
        <thead>
          <tr>
            <th style = {borderedStyle}>Results</th>
          </tr>
        </thead>
        <tbody>
            <ResultRow result_number={1}
             result_name="Blue Wall" />
            <ResultRow result_number={2}
             result_name="Totman Gym" />
        </tbody>     
        </table>
    )
  }
}

class ResultRow extends React.Component{
  render(){
    const borderedStyle = {border: "1px Solid Silver", padding: 10}
    return (
      <tr>
        <td style = {borderedStyle}>{this.props.result_name}</td>
      </tr>
      
    )
  }
}



// This renders the JSX component inside the content node:
ReactDOM.render(<MyComponent />, contentNode);
