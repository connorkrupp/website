import React from 'react'
import styled from 'styled-components';
import Link from 'gatsby-link'

const Container = styled.div`
  marginBottom: 1.45rem;
`;

const Content = styled.div`
  margin: 0 auto;
  maxWidth: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
`;

const NavigationLinks = styled.ul`
  list-style: none;
  display: flex;
  font-size: 18px;

  li {
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
        <li><Link to="/about">about</Link></li>
        <li><Link to="/stuff">stuff</Link></li>
      </NavigationLinks>
    </Content>
  </Container>
);

export default Header;
