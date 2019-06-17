import React, { Context } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import { Upload as AntdUpload, Icon, message, Button } from 'antd';
import { AppContext } from '../providers/AppProvider';
import Adhyan from '../core/Adhyan';
import { loading } from '../store/actions/global';

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
type PropsType = {
  actions: any;
};
class Upload extends React.Component<PropsType> {
  static contextType: Context<Adhyan> = AppContext;

  componentDidMount() {
    console.log('hello');
    console.log(this.props.actions);
  }
  handleFileChange = async (file: File) => {
    try {
      this.props.dispatch(this.props.actions.loading(true));
      const downloadUrl = await this.context.uploadItem(file);
      return downloadUrl;
    } catch (err) {
      console.error(err);
    } finally {
      this.props.actions.loading(false);
    }
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
const mapActionToProps = (dispatch: any) => ({
  actions: bindActionCreators({ loading }, dispatch),
});
export default connect(
  null,
  mapActionToProps
)(Upload);
