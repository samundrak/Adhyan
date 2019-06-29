import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';
import AuthDropdown from './AuthDropdown';
import { AUTH_NAVBAR } from '../consts';
import { ClickParam } from 'antd/lib/menu';

const { Header, Content, Sider } = Layout;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: 'row';
`;
const HeaderItemLeft = styled.div``;
const HeaderItemRight = styled.div`
  align-self: flex-end;
  margin-left: auto;
`;

const AppLayout = ({
  children,
  user,
  onClick,
}: {
  user: UserInterface;
  children: JSX.Element;
  onClick: (type: string) => (event: ClickParam) => void;
}) => (
  <Layout>
    <Header className="header">
      <HeaderBox>
        <HeaderItemLeft>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="home" />
                Home
              </Link>
            </Menu.Item>
          </Menu>
        </HeaderItemLeft>
        <HeaderItemRight>
          {user.uid && (
            <AuthDropdown user={user} onClick={onClick(AUTH_NAVBAR)} />
          )}
        </HeaderItemRight>
      </HeaderBox>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="books">
            <Link to="/books">
              <Icon type="book" />
              Books
            </Link>
          </Menu.Item>
          <Menu.Item key="upload">
            <Link to="/upload">
              <Icon type="upload" /> Upload
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ padding: '0 50px', margin: '16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  </Layout>
);
export default AppLayout;
