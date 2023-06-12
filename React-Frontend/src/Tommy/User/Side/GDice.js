import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export class GDice extends React.Component {
  state = {
    rand: Math.trunc(Math.random() * 6 + 1),
    tot: 0,
    player1: 0,
    player2: 0,
    crr: 1,
  };

  componentDidMount = () => {
    document.querySelector(".Gscore1").textContent = 0;
    document.querySelector(".Gscore2").textContent = 0;
    document.querySelector(".Gtotal").textContent = 0;
    document.querySelector(".Gdice").style.display = "none";
  };

  hidden = () => {
    document.querySelector(".Gdice").style.display = "none";
    document.querySelector(".Gcenter2").style.display = "none";
    document.querySelector(".Gcenter3").style.display = "none";
    document.querySelector(".Gcenter1").style.top = "230px";
  };

  Click1 = () => {
    document.querySelector(".Gscore1").textContent = 0;
    document.querySelector(".Gscore2").textContent = 0;
    document.querySelector(".Gtotal").textContent = 0;
    document.querySelector(".Gdice").style.display = "none";
    document.querySelector(".Gcon1").classList.add("Gactive");
    document.querySelector(".Gcon2").classList.remove("Gactive");
    document.querySelector(".Gcenter2").style.display = "block";
    document.querySelector(".Gcenter3").style.display = "block";
    document.querySelector(".Gcenter1").style.top = "50px";
    document.querySelector(".Gcon1").classList.remove("Gactive1");
    document.querySelector(".Gcon2").classList.remove("Gactive1");
    this.setState({ crr: 1, tot: 0, player1: 0, player2: 0 });
  };

  Click2 = () => {
    this.setState({ rand: Math.trunc(Math.random() * 6 + 1) });
    document.querySelector(
      ".Gdice"
    ).src = `./Images/dice-${this.state.rand}.png`;
    document.querySelector(".Gdice").style.display = "block";
    this.setState({ tot: this.state.tot + this.state.rand });
    document.querySelector(`.Gtotal${this.state.crr}`).textContent =
      this.state.tot + this.state.rand;
    if (this.state.rand == 1) {
      if (document.querySelector(".Gcon1").classList.contains("Gactive")) {
        document.querySelector(".Gcon1").classList.remove("Gactive");
        document.querySelector(".Gcon2").classList.add("Gactive");
      } else {
        document.querySelector(".Gcon1").classList.add("Gactive");
        document.querySelector(".Gcon2").classList.remove("Gactive");
      }
      document.querySelector(`.Gtotal${this.state.crr}`).textContent = 0;
      if (this.state.crr == 1) this.setState({ crr: 2 });
      else this.setState({ crr: 1 });
      this.setState({ tot: 0 });
    }
  };

  Click3 = () => {
    if (this.state.crr == 1) {
      this.setState({ player1: this.state.player1 + this.state.tot });
      document.querySelector(".Gplayer1").textContent =
        this.state.player1 + this.state.tot;
    } else {
      this.setState({ player2: this.state.player2 + this.state.tot });
      document.querySelector(".Gplayer2").textContent =
        this.state.player2 + this.state.tot;
    }
    this.setState({ tot: 0 });

    if (document.querySelector(".Gcon1").classList.contains("Gactive")) {
      document.querySelector(".Gcon1").classList.remove("Gactive");
      document.querySelector(".Gcon2").classList.add("Gactive");
    } else {
      document.querySelector(".Gcon1").classList.add("Gactive");
      document.querySelector(".Gcon2").classList.remove("Gactive");
    }
    document.querySelector(".Gdice").style.display = "none";
    document.querySelector(`.Gtotal${this.state.crr}`).textContent = 0;
    if (this.state.crr == 1 && this.state.player1 + this.state.tot > 100) {
      document.querySelector(".Gcon1").classList.add("Gactive1");
      document.querySelector(".Gcon2").classList.remove("Gactive");
      this.hidden();
    } else if (
      this.state.crr == 2 &&
      this.state.player2 + this.state.tot > 100
    ) {
      document.querySelector(".Gcon1").classList.remove("Gactive");
      document.querySelector(".Gcon2").classList.add("Gactive1");
      this.hidden();
    }
    if (this.state.crr == 1) this.setState({ crr: 2 });
    else this.state.crr = 1;
  };

  render = () => {
    return (
      <div className="div1">
        <div class="Gcon">
          <div class="Gcon1 Gactive">
            <p class="Gplayer">Player 1</p>
            <h1 class="Gscore1 Gplayer1">43</h1>
            <div class="Gtot">
              <p class="Gcurrent">current</p>
              <h3 class="Gtotal Gtotal1">0</h3>
            </div>
          </div>
          <div class="Gcon2">
            <p class="Gplayer">Player 2</p>
            <h1 class="Gscore2 Gplayer2">11</h1>
            <div class="Gtot">
              <p class="Gcurrent">current</p>
              <h3 class="Gtotal Gtotal2">0</h3>
            </div>
            <pre class="Gcenter1" onClick={this.Click1}>
              🏓 New Game
            </pre>
            <pre class="Gcenter2" onClick={this.Click2}>
              🎲 Roll Dice
            </pre>
            <img src="./Images/dice-3.png" alt="dice picture" class="Gdice" />
            <pre class="Gcenter3" onClick={this.Click3}>
              🛒 Hold
            </pre>
            <Link
              to={{
                pathname: "/Home",
                state: {
                  ...this.props.location.state,
                },
              }}
              className="name lname"
            >
              <pre class="move1 Gcenter1" onClick={this.Click1}>
                🏠 Home
              </pre>
            </Link>

            <Link
              to={{
                pathname: "/Games",
                state: {
                  ...this.props.location.state,
                },
              }}
              className="name lname"
            >
              <pre class="move2 Gcenter1" onClick={this.Click1}>
                🎰 Games
              </pre>
            </Link>
          </div>
        </div>
      </div>
    );
  };
}
