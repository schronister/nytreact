// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var Main = React.createClass({
  getInitialState: function(){
    return {
      saved:[],
    }
  },
//get any database info when loading
  componentWillMount: function() {
    helpers.getSavedFromDB().then(function(data){
      console.log(data, "data");
      this.setState({ saved: data });
    }.bind(this));
    
  },

//save an article to the database
  saveArticle: function(obj){
    helpers.saveToDB(obj.headline.main, obj.pub_date, obj.web_url);
    if (this.state.saved){
      var oldState = this.state.saved;
      oldState.push({title:obj.headline.main, date:obj.pub_date,url:obj.web_url});
      this.setState({saved:oldState});
    }
    
  },
  //delete a saved article
  deleteArticle: function(obj){
    helpers.deleteFromDB(obj.title);

    //remove it from state as well
    var oldState = this.state.saved;
    for (var i = 0; i < oldState.length; i++){
      if (oldState[i].title === obj.title){
        oldState.splice(i, 1);
      }
    }
    this.setState({saved:oldState});
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

            {/*Used cloneElement to send the state info into props for the child components*/}
            {this.props.children && React.cloneElement(this.props.children, {save:this.saveArticle, savedArticles:this.state.saved, delete:this.deleteArticle})}

          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
