import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  async handleClick() {

    console.log('handleClick - Starting');
    console.log('handleClick - this.state.file:' + this.state.file);
    const response = await fetch('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket');
    const data = await response.json();
    console.log('Response: ', data)
    console.log('Uploading: ', this.state.file)
    let binary = atob(this.state.file.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
    console.log('Uploading to: ', response.data.uploadURL)
  }


  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange}/>
        <img src={this.state.file}/>
        <button v-if="!uploadURL" onClick={this.handleClick}>Upload image</button>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
