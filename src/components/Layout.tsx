import React from 'react';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import AuthDropdown from './AuthDropdown';
import { UserInterface } from '../interfaces';
import { AUTH_NAVBAR } from '../consts';
import { ClickParam } from 'antd/lib/menu';
const { Header, Content } = Layout;

const AppName = styled.div`
  color: white;
`;
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
  <Layout className="layout">
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: '#161a1e',
      }}
    >
      <HeaderBox>
        <AppName className="logo">Adhyan</AppName>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px', backgroundColor: '#161a1e' }}
        />
        <HeaderItemRight>
          {user.uid && (
            <AuthDropdown user={user} onClick={onClick(AUTH_NAVBAR)} />
          )}
        </HeaderItemRight>
      </HeaderBox>
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
