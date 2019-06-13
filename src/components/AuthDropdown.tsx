import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styled from 'styled-components';
import { UserInterface } from '../interfaces';
import { SIGN_OUT } from '../consts';
import { ClickParam } from 'antd/lib/menu';

const AuthLabel = styled.div`
  color: white;
`;
const AuthDropdown = ({
  user,
  onClick,
}: {
  onClick: (event: ClickParam) => void;
  user: UserInterface;
}) => (
  <Dropdown
    overlay={
      <Menu style={{ color: 'white' }} onClick={onClick}>
        <Menu.Item key={SIGN_OUT}>Sign Out</Menu.Item>
      </Menu>
    }
  >
    <AuthLabel>
      {user.displayName} <Icon type="down" />
    </AuthLabel>
  </Dropdown>
);
export default AuthDropdown;
