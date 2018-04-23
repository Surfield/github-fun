import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Results from "./results"
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organization: "",
      githubData: null,
      contributionList: [],
    };

    this.search = this.search.bind(this);
  }

  validateForm() {
    return this.state.organization.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  search = query => {
    fetch(`https://api.github.com/orgs/${query}/repos`, {
      accept: 'application/json',
    })
    .then(response => response.json())
    .then(myJson =>
      this.setState({
        githubData: myJson
      })
    ).then(this.getRepos(this.state.githubData))
    .catch(error => console.error(error));
  }

  getRepos = data => {
    let arr = [];
    if(data){
      data.forEach((val, key) => {
        this.search2(arr, val.name, val.contributors_url);
      })
    }
    this.setState({
      contributionList: arr,
    })
  }

  search2 = (arr, name, query) => {
    fetch(`${query}?per_page=1`, {
      accept: 'application/json',
    })
    .then(response => response.headers.forEach((val, key) => {
      if(key === 'link'){
        let word = val.split(',')[1].split(';')[0];
        let num = parseInt(word.substring(word.indexOf("&page=")+6,word.length-1), 10);
        console.log(num);
        arr.push({name,num});
      }
    }))
    .catch(error => console.error(error));
  }

  

  searchLog = query => {
    fetch(`https://api.github.com/orgs/${query}/repos`, {
      accept: 'application/json',
    })
    .then(response => response.headers.forEach((val, key) => {
            console.log(key, val)
    }))
    .catch(error => console.error(error));
  }

  handleSubmit = event => {
    event.preventDefault();
    this.search(this.state.organization);
    // this.getRepos(this.state.githubData);
  }


  render() {
    return (
      <div className="App container">
        <h3 className="col-sm-4">Search GitHub organization: </h3>
        <div className="col-sm-8 search">
          <form onSubmit={this.handleSubmit}>
            <div className="col-sm-10">
              <FormGroup controlId="organization">
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.organization}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <div className="col-sm-2">
              <Button
                disabled={!this.validateForm()}
                type="submit"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
        <Results {...this.state}/>
      </div>
    );
  }
}