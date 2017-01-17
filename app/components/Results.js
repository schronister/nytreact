// Include React
var React = require("react");
var helpers = require("./utils/helpers.js");
var moment = require("moment");
var padleft = {marginLeft:"10px"}


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
            return <div key={i} id={i}><p key={obj.headline.main}><a target='_blank' href={obj.web_url}><em>{obj.headline.main}</em></a> - {moment(obj.pub_date).format("MMMM Do, YYYY")}
            <button style={padleft} id={i} onClick={()=>this.props.save(obj)}>Save Article</button></p></div>
           }.bind(this))
          }
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
