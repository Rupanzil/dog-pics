import { Component } from 'react'
import axios from 'axios'
import './DogPics.css'

export default class DogPics extends Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      breed: 'random',
    }
  }

  fetchData = async () => {
    const url = 'https://dog.ceo/api/breeds/image/random'
    const response = await axios.get(url)
    const imageUrl = response.data.message

    console.log(imageUrl)

    this.setState({ imageUrl: imageUrl })
  }

  fetchBreedData = async () => {
    const url = `https://dog.ceo/api/breed/${this.state.breed}/images/random`
    const response = await axios.get(url)
    const imageUrl = response.data.message

    console.log(imageUrl)

    this.setState({ imageUrl: imageUrl })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ breed: e.target.value })
    console.log('current breed state: ', this.state.breed)
  }

  componentDidMount = async () => {
    // makes api call and generates random image for the selected breed.
    console.log('componentDidMount')
    this.fetchData()
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log('componentDidUpdate')
    if (this.state.breed !== prevState.breed) {
      this.fetchBreedData()
    }
  }
  render() {
    console.log('render')
    return (
      <div className="card">
        <label htmlFor="dog-select">Select a breed</label>
        <select
          name="dog-select"
          value={this.state.breed}
          id="dog-select"
          onChange={this.handleChange}
        >
          <option value="random">Random</option>
          <option value="beagle">Beagle</option>
          <option value="boxer">Boxer</option>
          <option value="dalmatian">Dalmatian</option>
          <option value="husky">Husky</option>
        </select>
        <img src={this.state.imageUrl} alt="Dog" />
        <button
          onClick={() => {
            if (this.state.breed === 'random') {
              this.fetchData()
            } else {
              this.fetchBreedData()
            }
          }}
        >
          Next
        </button>
      </div>
    )
  }
}
