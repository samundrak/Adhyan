import React from 'react';
import { Layout, Menu } from 'antd';
const { Header, Content } = Layout;

const AppLayout = ({ children }: { children: JSX.Element }) => (
  <Layout className="layout">
    <Header style={{ backgroundColor: '#161a1e' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px', backgroundColor: '#161a1e' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content>
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
      <div style={{ background: '#fff', minHeight: 600 }}>{children}</div>
    </Content>
  </Layout>
);
export default AppLayout;
