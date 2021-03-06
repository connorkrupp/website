import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components';

import Header, { headerHeight } from '../components/header'

const ContentContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
  padding-top: 0;
  display: flex;
  align-items: center;
  min-height: calc(100vh);
`;

const ContentCentered = styled.div`
  margin-top: ${headerHeight};
`;

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Konnor Krupp\'s Personal Website' },
        { name: 'keywords', content: 'konnor, krupp, engineer, ios, youtube, google, software' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <ContentContainer>
      <ContentCentered>
        {children()}
      </ContentCentered>
    </ContentContainer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
