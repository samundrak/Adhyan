import React, { Context } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Row, Col, Upload as AntdUpload, Icon } from 'antd';
import { AppContext } from '../providers/AppProvider';
import Adhyan, { CONTROLLERS } from '../core/Adhyan';
import { loading } from '../store/actions/global';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import UploadController from '../controllers/UploadController';
import { UserInterface } from '../interfaces';

const Dragger = AntdUpload.Dragger;
const Container = styled.div`
  height: 100%;
`;

type PropsType = {
  actions: any;
  user: UserInterface;
  history: RouteComponentProps;
};
class Upload extends React.Component<PropsType> {
  static contextType: Context<Adhyan> = AppContext;
  file: UploadFile | null = null;
  controller: UploadController;

  constructor(props: PropsType, context) {
    super(props, context);
    this.controller = this.context.createController(CONTROLLERS.UPLOAD);
  }

  handleFileChange = async (change: UploadChangeParam) => {
    try {
      this.file = change.file;
      this.props.actions.loading(true);
      await this.controller.createNewBook(this.file, this.props.user.uid);
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
                  {...this.props}
                  beforeUpload={() => false}
                  showUploadList={false}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    You can upload only one file at a time, Only PDF is allowed
                    to upload
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
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(
  mapStateToProps,
  mapActionToProps,
)(withRouter(Upload));
