import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const PageTitle = styled.h2`
  font-size: 38px;
`;

const Container = styled.div`
  text-align: center;
`;

const ProjectContainer = styled.div`
`;

const Project = ({ title, desc, link }) => (
  <ProjectContainer>
    <h3><a href={link}>{title}</a></h3>
    <p>{desc}</p>
  </ProjectContainer>
)

const IndexPage = () => (
  <Container>
    <PageTitle>Stuff</PageTitle>
    <Project
      title="Picurate"
      desc="A machine learning based collage generator built natively for iOS"
      link="https://itunes.apple.com/us/app/picurate/id1323549717?mt=8"
    />
    <Project
      title="MLS Geocoder"
      desc="Automatically tag real estate CSV data from MLS (Realcomp) with latitude, longitude, and containing Detroit neighborhood"
      link="#"
    />
    <Project
      title="Detroit Dataset Explorer"
      desc="Explore Detroit-based geographical datasets in powerful detail with custom statistics and visualizations"
      link="http://ec2-54-197-218-7.compute-1.amazonaws.com"
    />
  </Container>
);

export default IndexPage;
