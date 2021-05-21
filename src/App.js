import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {



  async handleClick() {

    // this.image = ''
    // this.uploadURL = ''

    console.log('Se hizo handleClick');
    let reader = new FileReader()

    reader.onload = (e) => {
      console.log('length: ', e.target.result.includes('data:image/jpeg'))
      if (!e.target.result.includes('data:image/jpeg')) {
        return alert('Wrong file type - JPG only.')
      }
      if (e.target.result.length > 1000000) {
        return alert('Image is loo large - 1Mb maximum')
      }
      this.image = e.target.result
    }

    // const response = await axios({
    //   method: 'GET',
    //   url: 'https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket'
    // })

    const response = await fetch('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket');
    const data = await response.json();
    //this.setState({ totalReactPackages: data.total })

    console.log('Response: ', data)
      console.log('Uploading: ', this.image)
      let binary = atob(this.image.split(',')[1])
      let array = []
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
      console.log('Uploading to: ', response.data.uploadURL)
      // const result = await fetch(response.data.uploadURL, {
      //   method: 'PUT',
      //   body: blobData
      // })


      // console.log('Result: ', result)
      // this.uploadURL = response.data.uploadURL.split('?')[0]

  }


  render() {

    console.log('I am here 1');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload hello.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <h1>S3 Uploader Test</h1>
          <div v-if="!image">
          <h2>Select an image</h2>
          <input type="file"></input>
          <button v-if="!uploadURL" onClick={this.handleClick}>Upload image</button>


      </div>
        </header>
        
      </div>

      
    );
  }
}

export default withAuthenticator(App, true);
