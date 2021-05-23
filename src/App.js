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
      updatedAt: null,
      image: null,
      urlResponse: null
    };
   
}


onFileChange = event => { 

  this.setState({ selectedFile: event.target.files[0] }); 

  let files = event.target.files || event.dataTransfer.files
  let reader = new FileReader()
  reader.onload = (e) => {
    document.getElementById("uploadImageValue").value  = e.target.result
    this.setState({ image: e.target.result });
    
            
  }
  reader.readAsDataURL(files[0])   
  fetch('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket')
  .then(response => response.json())
  .then(data => this.setState({ uploadURL: data.uploadURL }));

}; 

onFileUpload = () => { 

  this.setState({ urlResponse: this.state.uploadURL.split('?')[0] });
  let binary = atob(this.state.image.split(',')[1])
  let array = []
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})  

  console.log(this.state.image); 
  console.log('onFileUpload: STARTING'); 
  console.log('onFileUpload: this.state.image'); 
  console.log(this.state.image); 
  console.log('onFileUpload: this.state.uploadURL'); 
  console.log(this.state.uploadURL); 
  console.log('onFileUpload: this.state.selectedFile'); 
  console.log(this.state.selectedFile); 
  console.log('onFileUpload: FINISHING'); 
  
  fetch(this.state.uploadURL, {
    method: 'PUT', 
    body: blobData, 
    
  }).then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error)); 
}; 
 
fileData = () => { 
  if (this.state.selectedFile) { 
      
    return ( 
      <div> 
        <h2>File Details:</h2> 
        <p>File Name: {this.state.selectedFile.name}</p> 
        <p>File Type: {this.state.selectedFile.type}</p> 
        <p> 
          Last Modified:{" "} 
          {this.state.selectedFile.lastModifiedDate.toDateString()} 
        </p> 
        <p>File urlResponse: {this.state.urlResponse}</p> 
      </div> 
    ); 
  } else { 
    return ( 
      <div> 
        <br /> 
        <h4>Choose before Pressing the Upload button</h4> 
      </div> 
    ); 
  } 
}; 

render() {
      const { uploadURL } = this.state;
      const { selectedFile } = this.state;
      const { image } = this.state;
      return (
          <div className="card text-center m-3">
              <h5 className="card-header">Simple GET Request</h5>            
              <input type="file" id="uploadImage" onChange={this.onFileChange} /> 
              <input type="hidden" id="uploadImageValue" name="uploadImageValue" value="" />
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
                {this.fileData()} 
          </div>
          
      );
  }
} 

export default withAuthenticator(App, true);
