import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Jumbotron, Button, Container,
  Modal,ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import Dropzone from 'react-dropzone'
import { uploadFiles,uploadRawFile,statusEnum } from './loader'
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// this weird syntax is just a shorthand way of specifying loaders


class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      files: [],
      open : false,
      rawData : ""
    };

    this.uploadRawFile = this.uploadRawFile.bind(this);
    this.uploadXLSFile = this.uploadXLSFile.bind(this);    
    this.setRawData = this.setRawData.bind(this);    


  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  setRawData(message) {
    this.setState({
      rawData: message
    },() => console.log(this.state));
  }

  uploadRawFile(ev) {

    // TODO: Display status bar over here

    // lets call upload function here
    
    if (typeof this.state.files !== 'undefined' && this.state.files.length > 0) {
        var name = this.state.files[0].name;        
        console.log('upload a RAW file '+name);

        this.setRawData("Loading");
        let currentComponent = this;

        uploadRawFile(this.state.files[0],function(status,message){

          switch(status){
            case statusEnum.SUCCESS:
              console.log('Connected on container');

              break;
            
            case statusEnum.FAILURE:
              console.log('READY on container'); 
              break;                  
          }
          console.log(message);
          // currentComponent.setRawData(message);
      
        });

    }
    else{
      this.setRawData("Error here");
    }
    // console.log(message);
  }

  uploadXLSFile(ev) {

    // TODO: Display status bar over here
    // switch(status){
    //   case statusEnum.CONNECT:console.log('Connected on container');break;
    //   case statusEnum.DISCONNECT:break;
    //   case statusEnum.ERROR:break;
    //   case statusEnum.FAIL:break;                  
    //   case statusEnum.INCOMING:break;
    //   case statusEnum.READY:console.log('READY on container'); break;                  

    // }
    console.log('upload a XLS file');
    console.log(ev);
    // console.log(message);
  }

  toggleLarge() {
    this.setState({
      open: !this.state.open
    });
  }


  render() {
    return (
      <div className="animated fadeIn">

        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Upload audio File</strong>
            {/* <div className="card-actions">
              <a href="https://reactstrap.github.io/components/jumbotron/" target="_blank">
                <small className="text-muted">docs</small>
              </a>
            </div> */}
          </CardHeader>
          <CardBody>
            <Jumbotron>
            <Dropzone onDrop={this.onDrop.bind(this)} style={{width:'100%'}}>

              <h1 className="display-3">Upload your file here</h1>
              <p className="lead">You can drag and drop a file here</p>
              <hr className="my-2"/>
              <p>Following are the available formats: .raw , .flac</p>
              
              <aside>
                  <ul>
                    {
                      this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                    }
                  </ul>
                </aside>

              </Dropzone>

            </Jumbotron>
          </CardBody>
          <CardFooter>
            <p className="lead">
                <Button color="primary" onClick={this.uploadRawFile}>Upload</Button>
              </p>
          </CardFooter>

          <div>
              {this.state.rawData}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Upload Excel File</strong>
            <div className="card-actions">
              <a href="https://reactstrap.github.io/components/jumbotron/" target="_blank">
                <small className="text-muted">Format</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <Dropzone onDrop={this.onDrop.bind(this)} style={{width:'100%'}}>
            <Jumbotron>

              <h1 className="display-3">Upload your excel file here</h1>
              <p className="lead">You can drag and drop the file here</p>
              <hr className="my-2"/>
              <p>Following are the available formats: .xls</p>
              
              <aside>
                  <ul>
                    {
                      this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                    }
                  </ul>
                </aside>


            </Jumbotron>
            </Dropzone>
          </CardBody>
          <CardFooter>
            <p className="lead">
                <Button color="primary" onClick={this.uploadXLSFile}>Upload</Button>
              </p>
          </CardFooter>
          <div>
              {this.state.rawData}
          </div>
        </Card>

      </div>
    );
  }
}

export default Upload;