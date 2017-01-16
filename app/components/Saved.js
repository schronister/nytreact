// Include React
var React = require("react");
var moment = require("moment");

var Saved = React.createClass({
  // Here we render the component
  render: function() {

    return (


        <div className="row">

          <div className="col-lg-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Saved Articles</h3>
              </div>
              <div className="panel-body">
                {
                  this.props.savedArticles.map(function(obj, i){
                    console.log(obj);
                  return <div key={i} id={i}><p key={obj.title}><em>{obj.title}</em> - {moment(obj.date).format("MMMM Do, YYYY")} - <a href={obj.url}>Link  </a>
                  <button id={i} onClick={()=>this.props.save(obj)}>Delete</button></p></div>
                 }.bind(this))
                }
              </div>
            </div>

          </div>

        </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
