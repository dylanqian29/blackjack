import React, { Component } from "react";
import Hand from "./Hand";
import axios from "axios";
import $ from "jquery";
import Modal from "./Modal";
import Dealer from "./Dealer";
import "../css/Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckId: "1u04d3mkv63f",
      cards: 52,
      dealer: [],
      player: [],
      dealerPoints: 0,
      playerPoints: 0,
      user: "player"
    };
    this.handleStart = this.handleStart.bind(this);
    this.getCards = this.getCards.bind(this);
    this.handleDeal = this.handleDeal.bind(this);
    this.convertValue = this.convertValue.bind(this);
    this.reset = this.reset.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.handleStand = this.handleStand.bind(this);
    this.handleHit = this.handleHit.bind(this);
  }

  reset() {
    this.setState({
      deckId: "1u04d3mkv63f",
      cards: 52,
      dealer: [],
      player: [],
      dealerPoints: 0,
      playerPoints: 0,
      user: "player"
    });
  }

  getCards(numberOfCards, callback) {
    $.ajax({
      url: `https://deckofcardsapi.com/api/deck/1u04d3mkv63f/draw/?count=${numberOfCards}`,
      type: "GET",
      success: function(data) {
        callback(data);
      },
      error: function() {
        console.log("Failed to get");
      }
    });
  }

  handleDeal() {
    this.getCards(4, data => {
      this.state.player.push(data.cards[0]);
      this.state.player.push(data.cards[2]);
      let newPlayerPoints = this.state.playerPoints;
      newPlayerPoints += this.convertValue(data.cards[0].value);
      newPlayerPoints += this.convertValue(data.cards[2].value);
      this.state.dealer.push(data.cards[1]);
      this.state.dealer.push(data.cards[3]);
      let newDealerPoints = this.state.dealerPoints;
      // newDealerPoints += this.convertValue(data.cards[1].value);
      newDealerPoints += this.convertValue(data.cards[3].value);
      let newPlayer = this.state.player;
      let newDealer = this.state.dealer;
      this.setState({
        dealer: newDealer,
        player: newPlayer,
        dealerPoints: newDealerPoints,
        playerPoints: newPlayerPoints
      });
    });
  }
  handleStart() {
    axios
      .get("https://deckofcardsapi.com/api/deck/1u04d3mkv63f/shuffle/")
      .then(response => {
        console.log("Successful Shuffled");
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleHit() {
    if (this.state.user === "player") {
      this.getCards(1, data => {
        this.state.player.push(data.cards[0]);
        let newPlayer = this.state.player;
        let newPlayerPoints = this.state.playerPoints;
        if (newPlayer.length > 1) {
          newPlayerPoints += this.convertValue(data.cards[0].value);
        }
        this.setState({
          player: newPlayer,
          playerPoints: newPlayerPoints
        });
      });
    } else {
      this.getCards(1, data => {
        this.state.dealer.push(data.cards[0]);
        let newDealer = this.state.dealer;
        let newDealerPoints = this.state.dealerPoints;
        if (newDealer.length > 1) {
          newDealerPoints += this.convertValue(data.cards[0].value);
        }
        this.setState({
          dealer: newDealer,
          dealerPoints: newDealerPoints
        });
      });
    }
  }

  convertValue(value) {
    if (value === "ACE") {
      return 1;
    } else if (value === "JACK" || value === "QUEEN" || value === "KING") {
      return 10;
    } else {
      return Number(value);
    }
  }

  calculatePoints(user, card, sign) {
    if (user === "player") {
      let newPoints =
        this.state.playerPoints + Number(sign + this.convertValue(card.value));
      this.setState({
        playerPoints: newPoints
      });
    } else if (user === "dealer") {
      let newPoints =
        this.state.dealerPoints + Number(sign + this.convertValue(card.value));
      this.setState({
        dealerPoints: newPoints
      });
    }
  }

  handleStand() {
    this.setState({
      user: "dealer"
    });
  }

  render() {
    var busted, winner;
    var end = false;
    if (this.state.playerPoints > 21) {
      busted = true;
      end = true;
    }

    let dealerValue = this.state.dealer.reduce((acc, curr) => {
      return (acc += this.convertValue(curr.value));
    }, 0);

    if (this.state.user === "dealer" && dealerValue > 21) {
      busted = true;
      end = true;
    } else if (this.state.user === "dealer" && dealerValue < 17) {
      this.handleHit();
    } else if (this.state.user === "dealer") {
      if (dealerValue > this.state.playerPoints) {
        winner = "dealer";
      } else if (dealerValue < this.state.playerPoints) {
        winner = "player";
      } else if (dealerValue === this.state.playerPoints) {
        winner = "even";
      }
      end = true;
    }

    return (
      <div className="Table">
        <button className="circle-button" onClick={() => this.handleStart()}>
          Start
        </button>
        <button className="circle-button" onClick={() => this.handleDeal()}>
          Deal
        </button>
        <button className="circle-button" onClick={() => this.reset()}>
          Reset
        </button>
        <Dealer
          cards={this.state.dealer}
          points={this.state.dealerPoints}
          user="dealer"
          calculatePoints={this.calculatePoints}
          end={end}
          totalPoints={dealerValue}
        />
        {(busted || winner) && (
          <Modal
            reset={this.reset}
            busted={busted}
            user={this.state.user}
            winner={winner}
          />
        )}
        <Hand
          cards={this.state.player}
          points={this.state.playerPoints}
          user="player"
          calculatePoints={this.calculatePoints}
          convertValue={this.convertValue}
          reset={this.reset}
          end={end}
        />
        <button className="circle-button" onClick={() => this.handleHit()}>
          Hit
        </button>
        <button className="circle-button" onClick={() => this.handleStand()}>
          Stand
        </button>
      </div>
    );
  }
}

export default Table;
