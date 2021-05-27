import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import { API } from 'aws-amplify';

Amplify.configure(aws_exports);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // upload image
      selectedFile: null,
      uploadURL: null,
      updatedAt: null,
      image: null,
      urlResponse: null,

      //findimagesusingtagsofimage
      selectedFile_findimagesusingtagsofimage: null,
      image_findimagesusingtagsofimage: null,

      //Delete an image
      selectedFile_deleteimage: null,
      listimages_deleteimage: null


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
  fetch('https://wpo2y5mgwj.execute-api.us-east-1.amazonaws.com/default/lambdauploadimagetos3')
  .then(response => response.json())
  .then(data => this.setState({ uploadURL: data.uploadURL }));

}; 

onFileChange_findimagesusingtagsofimage = event => { 

  console.log('onFileChange_findimagesusingtagsofimage: STARTING');
  this.setState({ selectedFile_findimagesusingtagsofimage: event.target.files[0] }); 

  let files = event.target.files || event.dataTransfer.files
  let reader = new FileReader()
  reader.onload = (e) => {
    document.getElementById("uploadImageValue__findimagesusingtagsofimage").value  = e.target.result
    this.setState({ image_findimagesusingtagsofimage: e.target.result });            
  }

  console.log('onFileChange_findimagesusingtagsofimage: FINISHING'); 
};

onShowImages_deleteimage = event => { 

  console.log('onShowImages_deleteimage: STARTING'); 

  fetch('https://5f0ns3zvs5.execute-api.us-east-1.amazonaws.com/default/lambdagetlistimagesdynamo')  
  .then(response => console.log('Success:', response))
  //.then(data => this.setState({ listimages_deleteimage: data }));

  console.log('onShowImages_deleteimage: FINISHING'); 

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

onFileUpload_findimagesusingtagsofimage = () => { 

  let binary = atob(this.state.image__findimagesusingtagsofimage.split(',')[1])
  let array = []
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})  


  console.log('onFileUpload_findimagesusingtagsofimage: STARTING'); 
  console.log('onFileUpload_findimagesusingtagsofimage: this.state.image'); 
  console.log(this.state.image_findimagesusingtagsofimage); 
  console.log('onFileUpload_findimagesusingtagsofimage: this.state.selectedFile'); 
  console.log(this.state.selectedFile_findimagesusingtagsofimage); 
  console.log('onFileUpload_findimagesusingtagsofimage: FINISHING'); 
  
  fetch("https://65zzkap2ug.execute-api.us-east-1.amazonaws.com/default/findimagesusingtagsofimage", {
    method: 'PUT', 
    body: blobData, 
    
  }).then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error)); 
}; 
 
onDeleteImage_deleteimage_old = () => { 

  console.log('onDeleteImage_deleteimage: STARTING'); 
  console.log('onDeleteImage_deleteimage: selectedFile_deleteimage'); 
  console.log(this.state.selectedFile_deleteimage); 
  this.state.action = 'delete'
    
  var output = {
    "action": "crefffate",
    "object": "value2"
  };

  fetch("https://xqnqbwamrd.execute-api.us-east-1.amazonaws.com/Assignment2Stage1", {
    method: 'POST', 
    body: "{'action':'create'}", 
    
  }).then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error)); 
  console.log('onDeleteImage_deleteimage: FINISHING'); 
}; 


async onDeleteImage_deleteimage() {
  const data = {
    body: {
      action: "actiontest",
      object: "objecttest"
    }
  };

  console.log(data);
  const apiData = await API.post('https://xqnqbwamrd.execute-api.us-east-1.amazonaws.com', '/Assignment2Stage1', data);
  console.log({ apiData });
  alert('Mail sent');
}

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

fileData_findimagesusingtagsofimage = () => { 
  if (this.state.selectedFile_findimagesusingtagsofimage) { 
      
    return ( 
      <div> 
        <h2>File Details:</h2> 
        <p>File Name: {this.state.selectedFile_findimagesusingtagsofimage.name}</p> 
        <p>File Type: {this.state.selectedFile_findimagesusingtagsofimage.type}</p> 
        <p> 
          Last Modified:{" "} 
          {this.state.selectedFile_findimagesusingtagsofimage.lastModifiedDate.toDateString()} 
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

fileData_deleteimage = () => { 
  if (this.state.listimages_deleteimage) { 
      
    return ( 
      <div> 
        <h2>Images Details:</h2> 
        <p>{this.state.listimages_deleteimage}</p>        
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
          <h4>-------------------------------------------------------------------</h4>
          <h2 className="card-header">Image Upload CARLOS/ANAND - DONE</h2> 
          <h4 className="card-header">API Gateway endpoint / Amplify / Lambda </h4>                 
          <input type="file" id="uploadImage" onChange={this.onFileChange} /> 
          <input type="hidden" id="uploadImageValue" name="uploadImageValue" value="" />
          <button onClick={this.onFileUpload}>Upload!</button> 
          {this.fileData()} 
          <h4>-------------------------------------------------------------------</h4>     
          <h4>-------------------------------------------------------------------</h4>
          <h2 className="card-header">Find images based on the tags RONNIE-THE PLAYER (1)</h2> 
          <br /> 
          <br /> 
          <br /> 
          <br /> 
          <h4>-------------------------------------------------------------------</h4>   
          <h4>-------------------------------------------------------------------</h4>
          <h2 className="card-header">Find images based on the tags of an image - ANAND/ EKLA - THE SWIMMER (1)</h2> 
           <h4 className="card-header">API Gateway endpoint / Amplify / Lambda </h4>                 
          <input type="file" id="uploadImage_findimagesusingtagsofimage" onChange={this.onFileChange_findimagesusingtagsofimage} /> 
          <input type="hidden" id="uploadImageValue_findimagesusingtagsofimage" name="uploadImageValue_findimagesusingtagsofimage" value="" />
          <button onClick={this.onFileUpload_findimagesusingtagsofimage}>Upload!</button> 
          {this.fileData_findimagesusingtagsofimage()} 
          <h4>-------------------------------------------------------------------</h4>  
          <h4>-------------------------------------------------------------------</h4>
          <h2 className="card-header">Add extra tags to an image - RONNIE-THE PLAYER (2)</h2> 
          <br /> 
          <br /> 
          <br /> 
          <br /> 
          <h4>-------------------------------------------------------------------</h4>   
          <h4>-------------------------------------------------------------------</h4>
          <h2 className="card-header">Delete an image - CARLOS</h2> 
          <h4 className="card-header">API Gateway endpoint / Amplify / Lambda </h4>
          <button onClick={this.onShowImages_deleteimage}>Show all images</button> 
          <br /><br /> 
          <input type="text" id="uploadImageValue_deleteimage" name="uploadImageValue_deleteimage" value="" />
          <br /><br /> 
          <button onClick={this.onDeleteImage_deleteimage}>delete image</button> 
          <br /><br /> 
          {this.fileData_deleteimage()} 
          <h4>-------------------------------------------------------------------</h4>    
      </div>
          
      );
  }
} 

export default withAuthenticator(App, true);
