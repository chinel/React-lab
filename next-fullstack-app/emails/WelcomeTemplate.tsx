import React, { CSSProperties } from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Tailwind,
} from "@react-email/components";

interface WelcomeTemplateProps {
  name?: string;
}

const WelcomeTemplate = ({ name }: WelcomeTemplateProps) => {
  return (
    <Html>
      <Preview>Thanks for signing up!</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="font-bold text-xl mb-4">
              <Link href="https://www.example.com">Click here</Link> to verify
              your email address.
            </Text>
            <Text>
              Thanks for signing up, {name}! We're excited to have you on board.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

//Annotate the body object with css properties from react to provide intellisense
const body: CSSProperties = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

const heading: CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
};

export default WelcomeTemplate;
