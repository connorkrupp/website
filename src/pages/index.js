import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const LargeTitle = styled.h1`
  font-size: 72px;
  margin-top: 0;

  @media (max-width: 640px) {
    font-size: 48px;
  }
`;

const MediumTitle = styled.h2`
  font-size: 38px;

  @media (max-width: 640px) {
    font-size: 24px;
    margin: 20px 0;
  }
`;

const SmallTitle = styled.h2`
  font-size: 32px;

  @media (max-width: 640px) {
    margin: 20px 0;
    font-size: 20px;
  }
`;

const Container = styled.div`
`;

const Links = styled.p`
  margin-top: 40px

  @media (max-width: 640px) {
    margin-top: 20px
  }
`;

const IndexPage = () => (
  <Container>
    <LargeTitle>Konnor</LargeTitle>
    <MediumTitle>Software Engineer</MediumTitle>
    <SmallTitle>@Google @YouTube</SmallTitle>
    <Links><a href="https://github.com/connorkrupp">GitHub</a> <a href="https://linkedin.com/in/connorkrupp">LinkedIn</a></Links>
  </Container>
);

export default IndexPage;
