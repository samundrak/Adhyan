import React, { Context } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Row, Col, Upload as AntdUpload, Icon } from 'antd';
import { AppContext } from '../providers/AppProvider';
import Adhyan from '../core/Adhyan';
import { loading } from '../store/actions/global';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

const Dragger = AntdUpload.Dragger;
const Container = styled.div`

  height: 100%;
`;
const Item = styled.div`
  margin: 10px;
`;
type PropsType = {
  actions: any;
  history: RouteComponentProps
};
class Upload extends React.Component<PropsType> {
  static contextType: Context<Adhyan> = AppContext;
  file: UploadFile | null = null;

  handleFileChange = async (change: UploadChangeParam) => {
    try {
      this.file = change.file;
      this.props.actions.loading(true)
      const uploadedItemURL = await this.context.uploadItem(this.file);
      await this.context.createNewBook({
        file: this.file,
        uploadedItemURL
      });
      this.props.history.push('/books');
    } catch (err) {
      console.error(err);
    } finally {
      this.props.actions.loading(false);
    }
  };
  render() {
    return (
      <Container>
        <Row gutter={16}>
          <Col md={18} sm={12}>
            <Row gutter={16}>
              <Col>
                <Dragger
                  onChange={this.handleFileChange}
                  {...this.props} beforeUpload={() => false}
                  showUploadList={false}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
            </p>
                  <p className="ant-upload-hint">
                    You can upload only one file at a time, Only PDF is allowed to upload
            </p>
                </Dragger>
              </Col>
            </Row>

          </Col>
          <Col md={6} sm={12}>
            Some guide to upload
          </Col>
        </Row>
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
)(withRouter(Upload));
