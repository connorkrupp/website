import React from 'react'
import styled from 'styled-components';
import Link from 'gatsby-link'

const headerHeight = '128px';

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  marginBottom: 1.45rem;
  height: ${headerHeight};
`;

const Content = styled.div`
  margin: 0 auto;
  maxWidth: 960px;
  padding: 1.45rem;
  display: flex;
  justify-content: space-between;
`;

const NavigationLinks = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;

  a {
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const Header = ({ siteTitle }) => (
  <Container>
    <Content>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          K
        </Link>
      </h1>
      <NavigationLinks>
        <Link to="/about">about</Link>
        <Link to="/stuff">stuff</Link>
      </NavigationLinks>
    </Content>
  </Container>
);

export default Header;
export {
  headerHeight,
};
