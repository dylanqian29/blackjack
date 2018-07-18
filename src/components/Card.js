import React, { Component } from "react";
import "../css/Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    if (this.props.index === 0 && this.props.user === "dealer") {
      this.state = {
        face: "down"
      };
    } else {
      this.state = {
        face: "up"
      };
    }

    this.handleFlip = this.handleFlip.bind(this);
  }

  handleFlip() {
    let newFace = this.state.face === "up" ? "down" : "up";
    this.state.face === "up"
      ? this.props.calculatePoints(this.props.user, this.props.card, "-")
      : this.props.calculatePoints(this.props.user, this.props.card, "+");
    this.setState({
      face: newFace
    });
  }

  render() {
    let card;
    let value =
      this.props.card.value === "10" ? "10" : this.props.card.value.charAt(0);
    let face = this.state.face;

    if (this.props.end === true && this.state.face === "down") {
      this.setState({
        face: "up"
      });
    }

    if (face === "up") {
      card = (
        <div className="card">
          <div className="mark top">{value}</div>
          <div className="content ">
            <h1>{this.props.card.value}</h1>
            <h2>
              <sup>OF</sup>
              <span className="dark">{this.props.card.suit}</span>
            </h2>
          </div>
          <div className="mark upside-down">{value}</div>
        </div>
      );
    } else if (face === "down") {
      card = (
        <div className="card">
          <div className="mark top" />
          <div className="content ">
            <h2>
              <sup />
              <span className="dark">
                <img
                  src="https://s3-us-west-1.amazonaws.com/wework-dylan/wework.png"
                  alt=""
                  height="130"
                  width="130"
                />
              </span>
            </h2>
          </div>
          <div className="mark upside-down" />
        </div>
      );
    }
    return (
      <div className={`Card${this.props.index}`} onClick={this.handleFlip}>
        {card}
      </div>
    );
  }
}

export default Card;
