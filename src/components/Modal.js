import React from "react";
import "../css/Modal.css";

function Modal(props) {
  let result;

  if (props.user === "player" && props.busted) {
    result = (
      <div>
        <div className="first">You are busted, I am sorry</div>
        <div> Good Luck on your next game</div>
      </div>
    );
  } else if (props.user === "dealer" && props.busted) {
    result = (
      <div>
        <div className="first">Congratulations</div>
        <div>The Dealer is Busted</div>
      </div>
    );
  } else if (props.user === "dealer" && props.winner === "dealer") {
    console.log("dealer win");
    result = (
      <div>
        <div className="first">Sorry</div>
        <div>Dealer just won</div>
      </div>
    );
  } else if (props.user === "dealer" && props.winner === "player") {
    console.log("player win");
    result = (
      <div>
        <div className="first">Congratulations</div>
        <div>You just beat the dealer</div>
      </div>
    );
  } else if (props.user === "dealer" && props.winner === "even") {
    console.log("even");

    result = (
      <div>
        <div className="first">Congratulations</div>
        <div>You can get your money back</div>
      </div>
    );
  }

  return (
    <div className="Modal">
      <div className="modal-content">
        <div className="close" onClick={() => props.reset()}>
          +
        </div>
        <img
          src="https://s3-us-west-1.amazonaws.com/wework-dylan/weworkLogo.png"
          alt=""
        />
        {result}
        <button className="button" onClick={() => props.reset()}>
          reset
        </button>
      </div>
    </div>
  );
}

export default Modal;
