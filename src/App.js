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
    selectedFile: null,
    updatedAt: null
    
  }; 
  
   
  // On file select (from the pop up) 
  onFileChange = event => { 
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 
   
  // On file upload (click the upload button) 
  onFileUpload = () => { 
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    // formData.append( 
    //   "myFile", 
    //   this.state.selectedFile, 
    //   this.state.selectedFile.name 
    // ); 
   
    formData.append('File', this.state.selectedFile);

    // Details of the uploaded file 
    console.log('onFileUpload: this.state.selectedFile'); 
    console.log(this.state.selectedFile); 

    
    const reader = new FileReader();
    reader.readAsDataURL(this.state.selectedFile);
    reader.onload = function () {
            console.log(reader.result);//base64encoded string
            console.log('onFileUpload: before axios.put22222'); 

            let binary = atob(reader.result.split(',')[1])
              let array = []
              for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i))
              }
              let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
              console.log('onFileUpload: blobData' + blobData); 

              // const fetchData = () => {
              //   return fetch("https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket")
              //         .then((response) => response.json())
              //         .then((data) => console.log(data));}

              axios.get('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket')
              .then(response => {
                console.log('Date created: ', response[0].data.created_at);
              });

              axios.get("https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket")
              .then(response => {
                console.log('Date created with comillas: ', response[0].data.created_at);
              });

              
              //const response = fetch("https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket")
              //const data = response.json();
          //console.log('onFileUpload: response:' + data); 
          //console.log('onFileUpload: response.uploadURL:' + data.results[0]); 

            //   var response = axios({
            //     method: 'GET',
            //     url: 'https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket'
            //   })
            //   .catch(error => {
            //     //this.setState({ errorMessage: error.message });
            //     console.error('There was an error axios!', error);
            // });

            //var response = axios.get('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket', reader.result)

            // console.log('Response axios GET: ', response.data)
            //axios.put('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket', reader.result)
          //   fetch("https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket", {
          //          method: 'PUT',
          //          body: reader.result
          //        })
          // .catch(error => {
          //     //this.setState({ errorMessage: error.message });
          //     console.error('There was an error!', error);
          // });
          console.log('onFileUpload: after axios.put2222'); 

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    console.log('onFileUpload: after axios.put'); 
    
   
   
    

    //console.log('onFileUpload: axios.put blob' ); 
    // axios.put('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket', this.imageDisplay)
    // .then(response => this.setState({ updatedAt: response.data.updatedAt }))
    // .catch(error => {
    //     this.setState({ errorMessage: error.message });
    //     console.error('There was an error!', error);
    // });

    //console.log('onFileUpload: axios.post' ); 
 //axios.post('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket', formData); 

    // fetch('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket', {
    //     method: 'PUT',
    //     body: formData
    //   }).then((response) => response.json())
		// 	.then((result) => {
		// 		console.log('Success:', result);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error:', error);
		// 	});

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
