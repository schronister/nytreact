// Include React
var React = require("react");
var moment = require("moment");
var padleft = {marginLeft:"10px"}

var Saved = React.createClass({
  // Here we render the component
  render: function() {

    return (


        <div className="row">

          <div className="col-lg-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Saved Articles</h3>
              </div>
              <div className="panel-body text-center">
                {
                  this.props.savedArticles.map(function(obj, i){
                  return <div key={i} id={i}><p key={obj.title}><a target='_blank' href={obj.url}><em>{obj.title}</em></a> - {moment(obj.date).format("MMMM Do, YYYY")}
                  <button style={padleft} className='btn btn-danger' id={i} onClick={()=>this.props.delete(obj)}>Delete</button></p></div>
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
