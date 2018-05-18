import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const LargeTitle = styled.h1`
  font-size: 72px;
`;

const MediumTitle = styled.h2`
  font-size: 38px;
`;

const OffsetContainer = styled.div`
  margin-top: 30%;
`;

const IndexPage = () => (
  <OffsetContainer>
    <LargeTitle>Konnor</LargeTitle>
    <MediumTitle>Software Engineer</MediumTitle>
    <h2>@Google @YouTube</h2>
    <br />
    <p><a href="https://github.com/connorkrupp">GitHub</a> <a href="https://linkedin.com/in/connorkrupp">LinkedIn</a></p>
  </OffsetContainer>
);

export default IndexPage;
