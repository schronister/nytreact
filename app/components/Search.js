// Include React
var React = require("react");
var Results = require("./Results");
var helpers = require("./utils/helpers.js");
var regWidth = {width:300, textAlign:'center', margin:'0px auto'};

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
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="row">
              <label htmlFor="topic" className="col-sm-2 control-label">Topic</label>
              <div className="col-sm-9">
              <input
                value={this.state.topic}
                type="text"
                className="form-control"
                id="topic"
                onChange={this.handleChange}
                required
              />
              </div>
              </div>
              <div className="row">
              <label htmlFor="startYear" className="col-sm-2 control-label">Starting Year</label>
              <div className="col-sm-9">
              <input
                value={this.state.startYear}
                type="number"
                className="form-control"
                id="startYear"
                onChange={this.handleChange}
                required
              />
              </div>
              </div>
              <div className="row">
              <label htmlFor="endYear" className="col-sm-2 control-label">Ending Year</label>
              <div className="col-sm-9">
              <input
                value={this.state.endYear}
                type="number"
                className="form-control"
                id="endYear"
                onChange={this.handleChange}
                required
              />
              </div>
              </div>
              <br />
              <br />
              <div className="row">
              <button style={regWidth}
                className="btn btn-primary btn-big btn-block"
                type="submit"
              >
                Search
              </button>
            </div>
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
