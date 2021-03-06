import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Message.css";

export const messageType = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export class Message extends Component {
  render() {
    const { text, author, img } = this.props;

    const classes = classNames("text", {
      "message-sender": author !== "Bot Bob",
      "message-bot": author === "Bot Bob",
    });

    return (
      <div className={classes}>
        <div className="message__img">
          <img className="img-author" src={img} alt="" />
        </div>
        <div className="message">
          <b className="message__author">{author}</b>
          <p className="message__text">{text}</p>
        </div>
      </div>
    );
  }
}
Message.propTypes = messageType;
