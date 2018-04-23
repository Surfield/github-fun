import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import _ from "lodash";

const LISTS = {
  'Stars': 'stargazers_count',
  'Forks': 'forks',
  'Contributors': 'num'
}

export default class Results extends Component {
  renderReposList(data, listName) {
    return _.orderBy(data, [LISTS[listName]], ['desc']).map(
      (repo) => <ListGroupItem
              key={repo.id}
              href={repo.html_url}
            >
              {repo.num ? `${repo.name} Contributors: ${repo.num}` : `${repo.name} Stars: ${repo.stargazers_count} Forks: ${repo.forks}`}
            </ListGroupItem>  
    );
  }

  renderRepos(data, listName) {
    return (
      <div className="repo">
        <ListGroup>
        <h3>{listName}:</h3>
          {this.renderReposList(data, listName)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="col-sm-3">
          {this.props.githubData ? this.renderRepos(this.props.githubData, 'Stars') : null}
        </div>
        <div className="col-sm-3">
          {this.props.githubData ? this.renderRepos(this.props.githubData, 'Forks') : null}
        </div>
        <div className="col-sm-3">
          {this.props.githubData ? this.renderRepos(this.props.contributionList, 'Contributors') : null}
        </div>
      </div>
    );
  }
}