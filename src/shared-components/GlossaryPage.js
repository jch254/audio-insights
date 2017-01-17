import React from 'react';
import { Box } from 'reflexbox';
import {
  PageHeader,
  Text,
  Container,
  Heading,
} from 'rebass';

import glossary from './glossary';
import FadeInTransition from './FadeInTransition';

const GlossaryPage = () => (
  <FadeInTransition>
    <Box style={{ flex: '1 0 auto' }} key="about">
      <Container pb={3}>
        <PageHeader
          my={2}
          py={2}
          description="Terms and definitions"
          heading="Glossary"
        />
        {
          glossary.sort((a, b) => a.title.localeCompare(b.title)).map((g, index) =>
            <Box key={index} mb={2}>
              <Heading level={3}>
                {g.title}
              </Heading>
              <Text mb={2}>
                {g.definition}
              </Text>
            </Box>,
          )
        }
      </Container>
    </Box>
  </FadeInTransition>
);

export default GlossaryPage;
