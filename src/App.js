import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {



  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      uploadURL: null,
      image: null
    };
}


onFileChange = event => { 
  // Update the state 
  this.setState({ selectedFile: event.target.files[0] }); 

  let reader = new FileReader()
      reader.onload = (e) => {             
        this.image = e.target.result
      }
  reader.readAsDataURL(file)

}; 

componentDidMount() {


    fetch('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket')
        .then(response => response.json())
        .then(data => this.setState({ uploadURL: data.uploadURL }));
        console.log('this.state.selectedFile:', this.state.uploadURL);


        
}

onFileUpload() {

  console.log('this.state.selectedFile:', this.state.selectedFile);
  fetch('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket')
      .then(response => response.json())
      .then(data => this.setState({ uploadURL: data.uploadURL }));
  console.log('this.state.selectedFile:', this.state.uploadURL);

        
}

render() {
    const { uploadURL } = this.state;
    const { selectedFile } = this.state;
    return (
        <div className="card text-center m-3">
            <h5 className="card-header">Simple GET Request</h5>
            <div className="card-body">
                Total react packages: {uploadURL}
            </div>
            <input type="file" onChange={this.onFileChange} /> 
              <button onClick={this.onFileUpload}> 
                Upload! 
              </button> 
        </div>
        
    );
}

} 


export default withAuthenticator(App, true);
