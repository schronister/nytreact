// Include React
var React = require("react");
var Results = require("./Results");
var helpers = require("./utils/helpers.js");

var Search = React.createClass({
  getInitialState: function(){
    return {topic:"",
            startYear:"",
            endYear:"",
            results:[],
            query:""}
  },
  //setting the query for NYT search
  setQuery: function(query) {
    this.setState({ query: query });
  },
  //handling the submission of the search form
  handleSubmit: function(event){
    event.preventDefault();

    this.setQuery({topic:this.state.topic, startYear: this.state.startYear, endYear:this.state.endYear});

  },
  //when query is updated, perform the search
   componentDidUpdate: function(prevProps, prevState){
    if (prevState.query != this.state.query){
      helpers.runQuery(this.state.query).then(function(data){
        //trim to top 5 results
        data.length = 5;
        this.setState({results: data});
      }.bind(this))
    }
  },
  //keep the state in sync with the form
  handleChange: function(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // Here we render the component
  render: function() {

    return (
      <div>
        <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h3>Search Term</h3>
              <input
                value={this.state.topic}
                type="text"
                className="form-control text-center"
                id="topic"
                onChange={this.handleChange}
                required
              />
              <h3>Start Year</h3>
              <input
                value={this.state.startYear}
                type="number"
                className="form-control text-center"
                id="startYear"
                onChange={this.handleChange}
                required
              />
              <h3>End Year</h3>
              <input
                value={this.state.endYear}
                type="number"
                className="form-control text-center"
                id="endYear"
                onChange={this.handleChange}
                required
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
        <Results results = {this.state.results} save={this.props.save}/>
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Search;
