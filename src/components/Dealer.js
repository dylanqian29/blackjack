import React, { Component } from "react";
import Card from "./Card";
import "../css/Dealer.css";

class Dealer extends Component {
  render() {
    let points;
    if (this.props.end === true) {
      points = this.props.totalPoints;
    } else {
      points = this.props.points;
    }
    return (
      <div className="Dealer">
        {this.props.cards.map((card, index) => (
          <Card
            card={card}
            key={index}
            index={index}
            user={this.props.user}
            calculatePoints={this.props.calculatePoints}
            end={this.props.end}
          />
        ))}
        <div className="pokerchip black" user={`dealer:${points}`} />{" "}
      </div>
    );
  }
}

export default Dealer;
