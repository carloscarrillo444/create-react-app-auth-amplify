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



}; 


onFileChange (e) {
  let files = e.target.files || e.dataTransfer.files
  this.createImage(files[0])
};

createImage (file) {
  // var image = new Image()
  let reader = new FileReader()
  reader.onload = (e) => {
    console.log('length: ', e.target.result.includes('data:image/jpeg'))
    this.image = e.target.result
  }
  reader.readAsDataURL(file)
};



async uploadImage(e) {
  console.log('Upload clicked')
  // Get the presigned URL
  const response = await axios({
    method: 'GET',
    url: 'https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket'
  })
  console.log('Response: ', response.data)
  console.log('Uploading: ', this.image)
  let binary = atob(this.image.split(',')[1])
  let array = []
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
  console.log('Uploading to: ', response.data.uploadURL)
  const result = await fetch(response.data.uploadURL, {
    method: 'PUT',
    body: blobData
  })
  console.log('Result: ', result)
  // Final URL for the user doesn't need the query string params
  //this.uploadURL = response.data.uploadURL.split('?')[0]
}



componentDidMount() {


    fetch('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket')
        .then(response => response.json())
        .then(data => this.setState({ uploadURL: data.uploadURL }));
        console.log('this.state.selectedFile:', this.state.uploadURL);
        console.log('onFileUpload: this.state.selectedFile'); 
        console.log(this.state.selectedFile); 


        
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
              <button onClick={this.uploadImage}> 
                Upload! 
              </button> 
        </div>
        
    );
}

} 


export default withAuthenticator(App, true);
