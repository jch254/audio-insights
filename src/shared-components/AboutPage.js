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
          I built this web app teach myself about front-end development with <a
            href="https://facebook.github.io/react/" target="_blank" style={{ color: '#1c7' }}
          >React</a> and <a href="http://redux.js.org" target="_blank" style={{ color: '#1c7' }}>Redux</a>.
          For a long while I've yearned for an enjoyable, fast and understandable way to create
          front-ends for APIs that I build. I've experimented with various other frameworks/tools
          but none resonated with me like the React/Redux combo. The community around these
          technologies is outstanding, something I feel back-end technologies sometimes lack. I
          haven't had this much fun writing code in a while!
        </Text>
        <Text my={2}>
          This app connects to the <a
            href="https://developer.spotify.com/web-api/" target="_blank" style={{ color: '#1c7' }}
          >Spotify API</a> using the Implicit Grant Flow to authenticate. I'm a hobby musician
          with a deep interest in music and music production. I thought it'd be an interesting
          project to present the data available from the Spotify API in various ways.
        </Text>
        <Text my={2}>
          I aimed to keep things simple, avoid reinventing the wheel and embrace essentialism
          (use as little as possible). Using a component library (<a
            href="http://jxnblk.com/rebass/" target="_blank" style={{ color: '#1c7' }}
          >Rebass</a>) proved invaluable. I was able to concentrate on 'business logic' yet still
          create something presentable. I also focused on using React and Redux best practices and
          making the app as responsive as possible.
        </Text>
        <Text my={2}>
          I'd be thankful for any feedback or suggestions (<a
            href="https://github.com/jch254/audio-insights" target="_blank"
            style={{ color: '#1c7' }} children="Github"
          /> or <a href="mailto:jordan@jch254.com" style={{ color: '#1c7' }} children="email" />).
          I look forward to applying the skills I've acquired building this app on future projects.
        </Text>
      </Container>
    </Box>
  </FadeInTransition>
)

export default AboutPage;
