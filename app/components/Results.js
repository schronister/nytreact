// Include React
var React = require("react");
var helpers = require("./utils/helpers.js");
var moment = require("moment");


var Results = React.createClass({
  
  // Here we render the component
  render: function() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
          {
            this.props.results.map(function(obj, i){
            return <div key={i} id={i}><p key={obj.headline.main}><em>{obj.headline.main}</em> - {moment(obj.pub_date).format("MMMM Do, YYYY")} - <a href={obj.web_url}>Link  </a>
            <button id={i} onClick={()=>this.props.save(obj)}>Save Article</button></p></div>
           }.bind(this))
          }
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
