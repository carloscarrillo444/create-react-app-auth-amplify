import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {

  state = { 
  
    // Initially, no file is selected 
    selectedFile: null
  }; 
   
  // On file select (from the pop up) 
  onFileChange = event => { 
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 
   
  // On file upload (click the upload button) 
  async onFileUpload(){ 
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
      "myFile", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
   
    // Details of the uploaded file 
    console.log('onFileUpload: this.state.selectedFile'); 
    console.log(this.state.selectedFile); 
   
    let binary = atob(this.state.selectedFile.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})

    const result = await fetch('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket', {
        method: 'PUT',
        body: blobData
      })

    // Request made to the backend api 
    // Send formData object 
    //axios.post('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket', formData); 
  }; 
   
  // File content to be displayed after 
  // file upload is complete 
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
    return ( 
      <div> 
          <h1> 
            GeeksforGeeks 
          </h1> 
          <h3> 
            File Upload using React! 
          </h3> 
          <div> 
              <input type="file" onChange={this.onFileChange} /> 
              <button onClick={this.onFileUpload}> 
                Upload! 
              </button> 
          </div> 
        {this.fileData()} 
      </div> 
    ); 
  } 
} 


export default withAuthenticator(App, true);
