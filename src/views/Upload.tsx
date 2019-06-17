import React, { Context } from 'react';
import styled from 'styled-components';
import { Upload as AntdUpload, Icon, message, Button } from 'antd';
import { AppContext } from '../providers/AppProvider';
import Adhyan from '../core/Adhyan';

const Dragger = AntdUpload.Dragger;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Item = styled.div`
  margin: 10px;
`;
class Upload extends React.Component {
  static contextType: Context<Adhyan> = AppContext;

  componentDidMount() {
    console.log('hello');
  }
  handleFileChange = async (file: File) => {
    const downloadUrl = await this.context.uploadItem(file);
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
      </Container>
    );
  }
}
export default Upload;
