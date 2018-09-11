import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async onSubmit(dispatch, event) {
    event.preventDefault();

    const { name, email, phone } = this.state;

    //Validation
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const updateContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "put",
        body: JSON.stringify(updateContact),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const json = await res.json();

    dispatch({ type: "UPDATE_CONTACT", payload: json });

    //Clear the state and thus the input
    this.setState({ name: "", email: "", phone: "", errors: {} });

    //Redirect to home
    this.props.history.push("/");
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const json = await res.json();

    const contact = json;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }
  //Not calling the backend
  // const { dispatch, contacts } = value;
  // const { id } = this.props.match.params;
  // const { name, email, phone } = contacts[id - 1];
  // const { errors } = this.state;
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    className="form-control form-control-lg"
                    placeholder="Enter Name..."
                    name="name"
                    value={name}
                    onChange={this.onChange.bind(this)}
                    label="Name"
                    error={errors.name}
                  />
                  <TextInputGroup
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Email..."
                    name="email"
                    value={email}
                    onChange={this.onChange.bind(this)}
                    label="Email"
                    error={errors.email}
                  />
                  <TextInputGroup
                    className="form-control form-control-lg"
                    placeholder="Enter Phone..."
                    name="phone"
                    value={phone}
                    onChange={this.onChange.bind(this)}
                    label="Phone"
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
