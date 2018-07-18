import React, { Component } from "react";
import Card from "./Card";
import "../css/Hand.css";

class Hand extends Component {
  render() {
    let points;
    points = this.props.points;
    return (
      <div className="Hand">
        {this.props.cards.map((card, index) => (
          <Card
            card={card}
            index={index}
            key={index}
            user={this.props.user}
            calculatePoints={this.props.calculatePoints}
            end={this.props.end}
          />
        ))}
        <div className="pokerchip black" user={`player:${points}`} />
      </div>
    );
  }
}

export default Hand;
