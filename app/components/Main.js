// Include React
var React = require("react");

// Helper Function
var helpers = require("./utils/helpers.js");

var Main = React.createClass({
  getInitialState: function(){
    return {
      saved:[],
    }
  },
//get any database info when loading
  componentWillMount: function() {
    helpers.searchTermsFromDB().then(function(data){
      console.log(data, "data");
      this.setState({ saved: data });
    }.bind(this));
    
  },

//save an article to the database
  saveArticle: function(obj){
    console.log(obj);
    helpers.saveToDB(obj.headline.main, obj.pub_date, obj.web_url);
    if (this.state.saved){
      var oldState = this.state.saved;
      oldState.push({title:obj.headline.main, date:obj.pub_date,url:obj.web_url});
      this.setState({saved:oldState});
    }
    
  },

  // Here we render the component
  render: function() {

    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h1>New York Times Article Scrubber</h1>
            <p><em>Find the best NYT Articles here!</em></p>
            <a className="btn btn-default" href="#/search">Search for articles</a>
            <a className="btn btn-default" href="#/saved">Go to saved articles</a>
          </div>
          <div className="container">

            {/* Added this.props.children to dump all of the child components into place */}
            {this.props.children && React.cloneElement(this.props.children, {save:this.saveArticle, savedArticles:this.state.saved})}

          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
