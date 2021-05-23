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
        totalReactPackages: null
    };
}

componentDidMount() {
    // Simple GET request using fetch
    fetch('https://27e4ccrsxd.execute-api.us-east-1.amazonaws.com/default/uploadImageToBucket')
        .then(response => response.json())
        .then(data => this.setState({ totalReactPackages: data.total }));
}

render() {
    const { totalReactPackages } = this.state;
    return (
        <div className="card text-center m-3">
            <h5 className="card-header">Simple GET Request</h5>
            <div className="card-body">
                Total react packages: {totalReactPackages}
            </div>
        </div>
    );
}

} 


export default withAuthenticator(App, true);
