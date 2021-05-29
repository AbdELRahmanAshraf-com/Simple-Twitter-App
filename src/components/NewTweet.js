import React, { Component } from "react"
import { connect } from "react-redux"
import { handleAddTweet } from "../actions/tweets"
import { Redirect } from "react-router-dom"
class NewTweet extends Component {
  state = {
    text: "",
    toHome: false,
  }
  handleChange = e => {
    const text = e.target.value
    this.setState(() => ({
      text,
    }))
  }
  handleSubmit = e => {
    e.preventDefault()
    const { text } = this.state
    const { dispatch, id } = this.props
    dispatch(handleAddTweet(text, id))

    this.setState(() => ({
      text: "",
      toHome: id ? false : true,
    }))
  }
  render() {
    const { text, toHome } = this.state
    const tweetLeft = 280 - text.length
    if (toHome) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h3 className='center'>New Tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            value={text}
            onChange={this.handleChange}
            placeholder="What's happening?"
            className='textarea'
            maxLength={280}
            id='textarea'
          />
          {tweetLeft <= 100 && <div className='tweet-length'>{tweetLeft}</div>}
          <button type='submit' className='btn' disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)
