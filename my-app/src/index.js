import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
class UploadFileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputFile: '',
            inputFilePath: ''
        }

        this.handleInputFile = this.handleInputFile.bind(this);
    }

    handleInputFile(event) {
        
        var _validFileExtensions = ["jpg", "jpeg", "png"];
        var fileUploadPath = event.target.value;
        var fileExtension = fileUploadPath.substring(
            fileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        
        console.log(fileExtension);
        if (_validFileExtensions.includes(fileExtension)) {
            this.setState({
                inputFile: fileUploadPath
            });
    
            let files = event.target.files;
            console.log(files);
            
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
    
            reader.onload = (event) => {
                // console.log("image result:", event.target.result);
                this.setState({
                    inputFilePath: URL.createObjectURL(files[0])
                });
            }

        } else {
            alert("Image file supported: '.png', '.jpg', '.jpeg'");
            this.setState({});
        }
        
    }

    render () {
        
        return (
            <div>
                <div className="split left">
                    <div className="centered">
                        <input type="file" name='filename' value={this.state.inputFile} onChange={this.handleInputFile} />
                    </div>
                </div>
                
                <div className="split right">
                    <div className="centered">
                    <img src={this.state.inputFilePath} alt="uploadedimage"></img>
                    </div>
                </div>
            </div>
        )
    };
}

ReactDOM.render(<UploadFileComponent />, document.getElementById('root'));