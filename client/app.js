// STEP 2, MORE COMPLICATED CODE FOLLOWS:

import React, { Component } from 'react';

//import any other components here
import HelloWorld from '../src/helloworld';
import Article from '../src/article';
import ArticleModal from '../src/article-modal';

//import CSS here, so webpack knows to include in bundle
import style from '../style/scss/main.css';

//this is the component that generates the body of the page
class App extends Component {
  constructor(props) {
    super(props);

    this.toggleSummaries = this.toggleSummaries.bind(this);
    this.timer = this.timer.bind(this);

    //default state
    //this keeps track of "live" data on the browser
    this.state = {
      articles: null,
      error: null,
      loaded: false,
      showSummaries: false,
      timer: 10,
    };
  }

  componentDidMount() {
    //fetching data clientside
    fetch('/api/articles').then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);

      //send data to our state
      //which will trigger render()
      this.setState({
        articles: data.items,
        loaded: true
      });
    }).catch((error) => {
      console.log(error);

      this.setState({
        error: error,
        loaded: true
      });
    });

    this.interval = setInterval( () => {
        this.timer();
    }, 1000);
  }

  timer() {
    if (this.state.timer === 1) {
      clearInterval(this.interval);
    }
    this.setState( (prevState, props) => ({
      timer: prevState.timer - 1
    }));
  }

  //click handler for button
  toggle() {
    console.log('toggle button clicked');
  }

  toggleSummaries() {
    this.setState( (prevProps, props) => ({
      showSummaries: !prevProps.showSummaries
    }));
  }

  render() {
    const {loaded, error, articles, showSummaries} = this.state;
    //  code above is equal to this:
    //  const loaded = this.state.loaded;
    //  const error = this.state.error;
    //  const articles = this.state.articles;

    if (error) {
      //render this when there's error getting data
      return <div>Sorry! Something went wrong</div>;
    } else if (!loaded) {
      //render while content is loading
      return <div>Loading...</div>;
    } else {
      //render articles
      let articleJSX = [];

      articles.map((article, idx) => {
        articleJSX.push(
          <ArticleModal
            key={idx}
            article={ article }
            timer={ this.state.timer }
          />
        );
      });

      let timer = this.state.timer > 0 ? this.state.timer : "";

      return (
        <div className="landing-container">
          <HelloWorld />
          <div className ="article-container">
            <p className="count-down">{ timer }</p>
            {articleJSX}
          </div>
        </div>
      );

    }
  }
}

export default App;
