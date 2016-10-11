import React from 'react';
import { Box } from 'reflexbox';
import {
  PageHeader,
  Text,
  Container,
} from 'rebass';

import FadeInTransition from './FadeInTransition';

const AboutPage = () => (
  <FadeInTransition>
    <Box style={{ flex: '1 0 auto' }} key="about">
      <Container pb={3}>
        <PageHeader
          my={2}
          py={2}
          description="What is this all about?"
          heading="About"
        />
        <Text my={2}>
          I built this web app teach myself about front-end development with&nbsp;
          <a
            href="https://facebook.github.io/react/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1c7' }}
          >
            React
          </a>
          &nbsp;and&nbsp;
          <a
            href="http://redux.js.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1c7' }}
          >
            Redux
          </a>.
          For a long while I&#39;ve yearned for an enjoyable, fast and understandable way to create
          UIs for APIs that I build. I&#39;ve experimented with various other frameworks/tools
          but none resonated with me like the React/Redux combo. The community around these
          technologies is outstanding. I haven&#39;t had this much fun writing code in a while!
        </Text>
        <Text my={2}>
          This app connects to the&nbsp;
          <a
            href="https://developer.spotify.com/web-api/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1c7' }}
          >
            Spotify API
          </a>
          &nbsp;using the Implicit Grant Flow to authenticate. I&#39;m a hobby musician
          with a deep interest in music and music production. I thought it&#39;d be an interesting
          project to present the data available from the Spotify API in various ways.
        </Text>
        <Text my={2}>
          I aimed to keep things simple, avoid reinventing the wheel and embrace essentialism
          (use as little as possible). Using a component library (
          <a
            href="http://jxnblk.com/rebass/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1c7' }}
          >
            Rebass
          </a>
          ) proved invaluable. I was able to concentrate on &#39;business logic&#39; yet still
          create something presentable. I also focused on using React and Redux best practices and
          making the app as responsive as possible.
        </Text>
        <Text my={2}>
          I&#39;d be thankful for any feedback or suggestions (
          <a
            href="https://github.com/jch254/audio-insights"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1c7' }}
          >
            GitHub
          </a>
          &nbsp;or&nbsp;
          <a href="mailto:jordan@jch254.com" style={{ color: '#1c7' }}>
            email
          </a>
          ).
          I look forward to applying the skills I&#39;ve acquired building this app on future projects.
        </Text>
      </Container>
    </Box>
  </FadeInTransition>
);

export default AboutPage;
