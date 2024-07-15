import styled from "styled-components";

interface ContainerProps {
  bgcolorss: string;
  bordercolorss: string;
}

interface CircleProps {
  bgcolor: string;
  bordercolor?: string;
  text?: string;
}

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgcolorss};
  border-radius: 100px;
  border: 1px solid ${(props) => props.bordercolorss};
`;

// `text` props와 같이 미리 초기값을 정해줄 수도 있다.
function Circle({ bgcolor, bordercolor, text = "default text" }: CircleProps) {
  return (
    <Wrapper>
      <Container bgcolorss={bgcolor} bordercolorss={bordercolor ?? bgcolor}>
        {text}
      </Container>
    </Wrapper>
  );
}

export default Circle;
