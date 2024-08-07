import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Heading = styled.h3`
  font-size: "14px";
  font-weight: "600";
`;

const Announcement = () => {
  return (
    <Container>
      <marquee direction="right" behaviour="alternate">
        <Heading>Super Deal! Free Shipping on Orders Over $50</Heading>
      </marquee>
    </Container>
  );
};

export default Announcement;
