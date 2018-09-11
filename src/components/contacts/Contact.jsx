import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { Consumer } from "../../context";

class Contact extends Component {
  //   static propTypes = {
  //     name: PropTypes.bool.isRequired,
  //     email: PropTypes.string.isRequired,
  //     phone: PropTypes.string.isRequired
  //   };
  state = {
    showContactDetail: false,
    toRotate: false
  };

  showContactDetail(event) {
    this.setState({
      showContactDetail: !this.state.showContactDetail,
      toRotate: !this.state.toRotate
    });
  }

  async onDeleteClick(id, dispatch) {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "delete"
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { name, phone, email, id } = this.props.contact;
    const { showContactDetail, toRotate } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={this.showContactDetail.bind(this)}
                  className={classnames("fas fa-sort-down", {
                    "icon-open-rotate": toRotate,
                    "icon-close-rotate": !toRotate
                  })}
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>
              {showContactDetail ? (
                <ul className="list-group">
                  <li className="list-group-item">
                    <i className="fas fa-at mr-2" />
                    {email}
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-mobile-alt mr-2" />
                    {phone}
                  </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
