// Todo 방 자체를 전부 보여주는 최상위 컴포넌트
import { useRecoilValue } from "recoil";
import CreateToDo from "./components/CreateToDo";
import { categoryState, toDoState } from "./atoms";
import ToDo from "./components/ToDo";
import SelectToDo from "./components/SelectToDo";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Layout = styled.div`
  margin: 0 auto;
  width: 50%;

  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid white;
  border-radius: 15px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${(props) => props.theme.textColor};
`;

const ToDoUl = styled.ul`
  border: 1px solid grey;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  const selectedCategory = useRecoilValue(categoryState);

  /*
   * onChange : 태그 안에서 바뀌는 동작
   * onFocus : 태그 안을 클릭했을 때 깜빡임
   * onBlur : onFocus 상태가 아닌 것
   */
  return (
    <Wrapper>
      <Layout>
        <Title>To Dos</Title>

        <SelectToDo />
        <CreateToDo />
        {toDos[selectedCategory].length !== 0 ? (
          <ToDoUl>
            {toDos[selectedCategory].map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ToDoUl>
        ) : null}
      </Layout>
    </Wrapper>
  );
}

export default ToDoList;
