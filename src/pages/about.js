import React from "react";
import Image from "gatsby-image";
import { graphql } from "gatsby";
import Lottie from "lottie-react-web";
import { Heading } from "grommet";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Container from "../components/Container";
import Grid from "../components/Grid";
import Column, { Spacer } from "../components/Column";

import { ParseJSXToReact, lastInArray } from "../helpers";

import block1Animation from "../lottie/About.json";
import bigAnimation from "../lottie/About_BIG.json";

const AboutPage = ({ data }) => {
  const page = data.allContentfulPageAbout.edges[0].node;

  return (
    <Layout>
      <SEO {...page.seo} />
      <Container>
        {/* Block 1 */}
        <Grid>
          <Column span={{ small: 12, medium: 6, large: 7 }}>
            <ParseJSXToReact block={page.block1} />
          </Column>
          <Spacer />
          <Column span={{ small: 12, medium: 6, large: 4 }}>
            <Lottie options={{ animationData: block1Animation, loop: false }} />
          </Column>
        </Grid>

        {/* Block 2 */}
        <Grid>
          <Column span={{ small: 12, medium: 12, large: 8 }}>
            <ParseJSXToReact block={page.block2} />
          </Column>
        </Grid>

        {/* Block 3 */}
        <Grid>
          <Column span={{ small: 12, medium: 12, large: 4 }}>
            <ParseJSXToReact block={page.block3} />
          </Column>
        </Grid>

        {/* Block 4 - Team */}
        <Grid>
          <Column>
            <Heading level="2">Our team</Heading>
          </Column>
          {page.block4Team.map((member, index) => {
            return (
              <Column key={index} span={{ small: 12, medium: 6, large: 3 }}>
                <Image fixed={member.headshot.fixed} />
                <div>{member.name}</div>
                <div>{member.title}</div>
              </Column>
            );
          })}
        </Grid>

        {/* Animation Block */}
        <Grid>
          <Column>
            <Lottie options={{ animationData: bigAnimation }} />
          </Column>
        </Grid>

        {/* Block 5 - Advisors */}
        <Grid>
          <Column>
            <Heading level="2">Advisory Board</Heading>
          </Column>
          {page.block5Advisors.map((advisor, index) => {
            return (
              <Column key={index} span={{ small: 12, medium: 6, large: 3 }}>
                <Image fixed={advisor.headshot.fixed} />
                <div>{advisor.name}</div>
                <div>{advisor.title}</div>
              </Column>
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

export const AboutPageQuery = graphql`
  query {
    allContentfulPageAbout {
      edges {
        node {
          block1 {
            childContentfulRichText {
              html
            }
          }
          block2 {
            childContentfulRichText {
              html
            }
          }
          block3 {
            childContentfulRichText {
              html
            }
          }
          block4Team {
            headshot {
              fixed(width: 250, height: 250) {
                ...GatsbyContentfulFixed_withWebp
              }
            }
            name
            title
          }
          block5Advisors {
            headshot {
              fixed(width: 250, height: 250) {
                ...GatsbyContentfulFixed_withWebp
              }
            }
            name
            title
          }
        }
      }
    }
  }
`;

export default AboutPage;
