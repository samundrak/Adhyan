import React from 'react';
import styled from 'styled-components';
import { Upload as AntdUpload, Icon, message, Button } from 'antd';
import { AppContext } from '../providers/AppProvider';

const Dragger = AntdUpload.Dragger;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Item = styled.div`
  margin: 10px;
`;
class Upload extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    console.log('hello');
  }
  handleFileChange = (file) => {
    console.log(file);
    return storage()
      .ref()
      .child('user-profiles')
      .child(this.uid)
      .child(this.file.name)
      .put(this.file)
      .then((response) => {
        return response.ref.getDownloadURL();
      })
      .then((photoURL) => this.userRef.update({ photoURL }));
  };
  render() {
    return (
      <Container>
        <Item>
          <Dragger {...this.props} action={this.handleFileChange}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </Item>
        <Item>
          <Button type="primary">Upload</Button>
        </Item>
      </Container>
    );
  }
}
export default Upload;
