import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBusiness, addPlace,fetchRestaurants } from "../actions/index";
import { bindActionCreators } from "redux";


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ""
    };


    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  componentDidMount() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.addPlace(position.coords.latitude, position.coords.longitude)
      })
    }
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    // We need to go and fetch weather data
    this.props.fetchBusiness(this.state.term);
    this.setState({ term: "" });
  }

  render() {

    var loadingIcon;
        if (!this.props.currentLocation) {
            loadingIcon = <i className="fa fa-cog fa-spin fa-3x fa-fw margin-bottom"></i>;
            return (
              <div className="loading-icon">{loadingIcon}</div>
            )
        } else  {

            return (
              <div>
              <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                  placeholder="Search by Shop Name"
                  className="form-control"
                  value={this.state.term}
                  onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
                </form>
                <div className = "col-md-5 col-md-offset-5">
                  {
                    this.props.currentLocation ?
                    <button type="button" className="btn btn-primary" onClick = {() => this.props.fetchRestaurants(this.props.currentLocation.lat,this.props.currentLocation.lon)}>Get Google Shops</button>

                    : null
                  }
                </div>

              </div>

            )

        }





  }
}

function mapStateToProps({ currentLocation}) {
  return { currentLocation };
}

export default connect(mapStateToProps, {fetchBusiness ,addPlace,fetchRestaurants})(SearchBar);
