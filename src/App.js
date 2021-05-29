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
      // upload image -- CARLOS
      selectedFile: null,
      uploadURL: null,
      updatedAt: null,
      image: null,
      urlResponse: null,

      //findimagesusingtagsofimage -- ANAND
      selectedFile_findimagesusingtagsofimage: null,
      image_findimagesusingtagsofimage: null,
      findimagesusingtagsofimage_response: [],

      //Delete an image -- CARLOS
      selectedFile_deleteimage: null,
      listimages_deleteimage: [],
      json_deleteimage: {},
      action: null,
      deleteimage_response: [],

      //Tag extra tag in image -- EKLA
      fileData_Addextratags_listtags: [],
      fileData_Addextratags_listimages: [],
      Addextratags_imagetotag: null,
      Addextratags_tagtotag: null,
      fileData_Addextratags_listimages_response: null,

      // Find images by tags -- RONNIE
      fileData_findimagebytag_response: [],
      findimagebytag_tags: null
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
    //document.getElementById("uploadImageValue_findimagesusingtagsofimage").value  = e.target.result
    this.setState({ image_findimagesusingtagsofimage: e.target.result });
  }
  reader.readAsDataURL(files[0])
  console.log('onFileChange_findimagesusingtagsofimage: FINISHING');
};


onShowImages_deleteimage = event => {
  console.log('onShowImages_deleteimage: STARTING');
  fetch('https://5f0ns3zvs5.execute-api.us-east-1.amazonaws.com/default/lambdagetlistimagesdynamo')
  .then(response => response.json())
  .then(data => this.setState({ listimages_deleteimage: data}));
  console.log('json_deleteimage: ' + this.state.listimages_deleteimage);
  console.log('onShowImages_deleteimage: FINISHING');

};

Addextratags_listimages = event => {
  console.log('Addextratags_listimages: STARTING');
  fetch('https://5f0ns3zvs5.execute-api.us-east-1.amazonaws.com/default/lambdagetlistimagesdynamo')
  .then(response => response.json())
  .then(data => this.setState({ fileData_Addextratags_listimages: data}));
  console.log('fileData_Addextratags_listimages: ' + this.state.fileData_Addextratags_listimages);
  console.log('Addextratags_listimages: FINISHING');
};

Addextratags_listtags = event => {
  console.log('Addextratags_listtags: STARTING');
  fetch('https://5bnxrmsgv5.execute-api.us-east-1.amazonaws.com/default/lambdagetlisttagsdynamo')
  .then(response => response.json())
  .then(data => this.setState({ fileData_Addextratags_listtags: data}));
  console.log('fileData_Addextratags_listtags: ' + this.state.fileData_Addextratags_listtags);
  console.log('Addextratags_listtags: FINISHING');
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

onFileUpload_findimagesusingtagsofimage = event => {

  //this.setState({ urlResponse: this.state.uploadURL.split('?')[0] });
  let binary = atob(this.state.image_findimagesusingtagsofimage.split(',')[1])
  let array = []
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})

  var variable = {
    action: "find_image_by_image",
    object: JSON.stringify(this.state.image_findimagesusingtagsofimage.split(',')[1])    //this.state.selectedFile_deleteimage
  };

  console.log('onFileUpload_findimagesusingtagsofimage: STARTING');
  console.log('onFileUpload_findimagesusingtagsofimage: this.state.image');
  console.log(this.state.image_findimagesusingtagsofimage);
  console.log('onFileUpload_findimagesusingtagsofimage: this.state.selectedFile');
  console.log(this.state.selectedFile_findimagesusingtagsofimage);
  console.log('onFileUpload_findimagesusingtagsofimage: FINISHING');

  fetch("https://xqnqbwamrd.execute-api.us-east-1.amazonaws.com/Assignment2Stage1/lambdadynamointeractions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
    }
    ,body: JSON.stringify(variable)
  })
  .then(response => response.json())
  .then(data => this.setState({ findimagesusingtagsofimage_response: data}));
  console.log("onFileUpload_findimagesusingtagsofimage finishing");
};

Addextratags_submiextratag = event => {

  var variable = {
    action: "add_extra_tag_to_image",
    image_to_tag: document.getElementById("Addextratags_imagetotag").value,  //this.state.Addextratags_imagetotag,
    tag_to_tag: document.getElementById("Addextratags_tagtotag").value
  };

  console.log('Addextratags_submiextratag: STARTING');
  console.log('Addextratags_submiextratag: this.state.Addextratags_imagetotag');
  console.log(this.state.Addextratags_imagetotag);
  console.log('Addextratags_submiextratag: this.state.Addextratags_tagtotag');
  console.log(this.state.Addextratags_tagtotag);
  fetch("https://xqnqbwamrd.execute-api.us-east-1.amazonaws.com/Assignment2Stage1/lambdadynamointeractions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
    }
    ,body: JSON.stringify(variable)
  })
  .then(response => response.json())
  .then(data => this.setState({ fileData_Addextratags_listimages_response: data}));
  console.log("Addextratags_submiextratag finishing");
};

findimagebytag_submit = event => {

  var variable = {
    action: "find_image_by_tag",
    object: document.getElementById("findimagebytag_tags").value
  };

  console.log('findimagebytag_submit: STARTING');
  console.log('findimagebytag_submit: document.getElementById("findimagebytag_tags").value');
  console.log(document.getElementById("findimagebytag_tags").value);
  fetch("https://xqnqbwamrd.execute-api.us-east-1.amazonaws.com/Assignment2Stage1/lambdadynamointeractions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
    }
    ,body: JSON.stringify(variable)
  })
  .then(response => response.json())
  .then(data => this.setState({ fileData_findimagebytag_response: data}));
  console.log("findimagebytag_submit finishing");
};

onDeleteImage_deleteimage = event => {

  var variable = {
    action: "delete_image",
    object: document.getElementById("ImageValue_deleteimage").value   //this.state.selectedFile_deleteimage
  };

   console.log("onDeleteImage_deleteimage starting");

  fetch("https://xqnqbwamrd.execute-api.us-east-1.amazonaws.com/Assignment2Stage1/lambdadynamointeractions", {
  method: "POST",
  headers: {
    //"content-type": "application/json"
    "Content-Type": "application/json"
    }
    ,body: JSON.stringify(variable) //"{'action': 'list'}"//" \"action\": \"list\" }"
  })
  .then(response => response.json())
  .then(data => this.setState({ deleteimage_response: data}));
  console.log("onDeleteImage_deleteimage finishing");

};

fileData_Addextratags_listimages_response = () => {
  if (this.state.fileData_Addextratags_listimages_response) {
    return (
      <div>
        <h4>Response API Extra Tag Action:</h4>
        {this.state.fileData_Addextratags_listimages_response.body}
      </div>
    );
  }
};

fileData_Addextratags_listimages = () => {
  if (this.state.fileData_Addextratags_listimages) {
    const listItems = this.state.fileData_Addextratags_listimages.map((d) => <li key={d.id}>{d.id}</li>);
    return (
      <div>
        <h4>Images Details:</h4>
        {listItems }
      </div>
    );
  }
};

fileData_Addextratags_listtags = () => {
  if (this.state.fileData_Addextratags_listtags) {
    const listItems = this.state.fileData_Addextratags_listtags.map((d) => <li key={d.id}>{d.id}</li>);
    return (
      <div>
        <h4>Tags Details:</h4>
        {listItems }
      </div>
    );
  }
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

fileData_findimagesusingtagsofimage = () => {
  if (this.state.selectedFile_findimagesusingtagsofimage) {

    return (
      <div>
        <h2>File Details:</h2>
        <p>File Name: {this.state.selectedFile_findimagesusingtagsofimage.name}</p>
        <p>File Type: {this.state.selectedFile_findimagesusingtagsofimage.type}</p>
        <p>Response API: {this.state.findimagesusingtagsofimage_response.body}</p>

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
    const listItems = this.state.listimages_deleteimage.map((d) => <li key={d.id}>{d.id}</li>);
    return (
      <div>
        <h2>Images Details:</h2>
        {listItems }
      </div>
    );
  }
};

fileData_deleteimage_response = () => {
  if (this.state.deleteimage_response) {
    //const listItems = this.state.deleteimage_response.map((d) => <li key={d.Items}>{d.Items}</li>);
    return (
      <div>
        <h2>Result Delete Action:</h2>
        {this.state.deleteimage_response.body}
      </div>
    );
  }
};

fileData_findimagebytag_response = () => {
  if (this.state.fileData_findimagebytag_response) {
     return (
      <div>
        <h4>Images Details:</h4>
        {this.state.fileData_findimagebytag_response.body}

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
          <h2 className="card-header">Image Upload CARLOS/ANAND</h2>
          <h4 className="card-header">API Gateway endpoint / Amplify / Lambda </h4>
          <input type="file" id="uploadImage" onChange={this.onFileChange} />
          <input type="hidden" id="uploadImageValue" name="uploadImageValue" value="" />
          <button onClick={this.onFileUpload}>Upload!</button>
          {this.fileData()}
          <h4>-------------------------------------------------------------------</h4>
          <h4>-------------------------------------------------------------------</h4>
          <h2 className="card-header">Find images based on the tags RONNIE/CARLOS/ANAND</h2>
          <p>Name of the Tags to find:</p><input type="text" id="findimagebytag_tags" name="findimagebytag_tags" value={this.state.findimagebytag_tags} />
          <button onClick={this.findimagebytag_submit}>Find images by tag</button>
          <br /><br />
          {this.fileData_findimagebytag_response()}
          <br />
          <br />
          <br />
          <h4>-------------------------------------------------------------------</h4>
          <h4>-------------------------------------------------------------------</h4>
          <h2 className="card-header">Find images based on the tags of an image - ANAND/EKLA</h2>
          <input type="file" id="uploadImage_findimagesusingtagsofimage" onChange={this.onFileChange_findimagesusingtagsofimage} />
          <input type="hidden" id="uploadImageValue_findimagesusingtagsofimage" name="uploadImageValue_findimagesusingtagsofimage" value="" />
          <button onClick={this.onFileUpload_findimagesusingtagsofimage}>Upload!</button>
          {this.fileData_findimagesusingtagsofimage()}
          <h4>-------------------------------------------------------------------</h4>
          <h4>-------------------------------------------------------------------</h4>
          <h2 className="card-header">Add extra tags to an image - EKLA/CARLOS</h2>
          <br />
          <button onClick={this.Addextratags_listimages}>Show all images</button>
          <br /><br />
          <button onClick={this.Addextratags_listtags}>Show all Tags</button>
          <br /><br />
          <p>Name of the Image to tag:</p><input type="text" id="Addextratags_imagetotag" name="Addextratags_imagetotag" value={this.state.Addextratags_imagetotag} />
          <br />
          <p>Name of the Tag to use:</p><input type="text" id="Addextratags_tagtotag" name="Addextratags_tagtotag" value={this.state.Addextratags_tagtotag} />
          <br /><br />
          <button onClick={this.Addextratags_submiextratag}>Submit extra tag</button>
          <br /><br />
          {this.fileData_Addextratags_listimages_response()}
          <br /><br />
          {this.fileData_Addextratags_listimages()}
          <br /><br />
          {this.fileData_Addextratags_listtags()}
          <br /><br />
          <h4>-------------------------------------------------------------------</h4>
          <h4>-------------------------------------------------------------------</h4>
          <h2 className="card-header">Delete an image - CARLOS</h2>
          <button onClick={this.onShowImages_deleteimage}>Show all images</button>
          <br /><br />
          <input type="text" id="ImageValue_deleteimage" name="ImageValue_deleteimage" value={this.state.selectedFile_deleteimage} />
          <br /><br />
          <button onClick={this.onDeleteImage_deleteimage}>delete image</button>
          <br />
          {this.fileData_deleteimage_response()}
          <br />
          {this.fileData_deleteimage()}
          <h4>-------------------------------------------------------------------</h4>
      </div>
      }
      );
  }
}

export default withAuthenticator(App, true);
