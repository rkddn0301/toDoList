import { useState } from "react";
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
  // TypeScript에서의 useState는 여러 타입을 지정해 주고싶을 때 `useState<number|string>(0)`으로 할 수 있다.
  const [counter, setCounter] = useState<number | string>(0);

  setCounter(2);
  setCounter("hello");

  return (
    <Wrapper>
      <Container bgcolorss={bgcolor} bordercolorss={bordercolor ?? bgcolor}>
        {text}
      </Container>
    </Wrapper>
  );
}

export default Circle;
