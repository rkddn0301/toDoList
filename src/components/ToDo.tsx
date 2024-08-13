// 출력된 ToDo 컴포넌트

import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const TodoList = styled.li`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
`;

function ToDo({ id, text }: IToDo) {
  const selectedCategory = useRecoilValue(categoryState); // 선택된 카테고리 보여주는 atom
  const setToDos = useSetRecoilState(toDoState); // toDo를 입력하는 atom

  // 삭제 시 동작되는 함수
  const onDelete = () => {
    /* setToDos가 filter를 통해 기존 배열에 있는 id들 중 
       내가 삭제를 진행한 id를 제외한 내용만 보여준다.
       그리고 변화를 감지한 recoil쪽에서 recoilPersist를 통해 해당 localStorage 다시 갱신한다.
     */

    setToDos((prev) => {
      return {
        ...prev,
        [selectedCategory]: prev[selectedCategory].filter(
          (toDo) => toDo.id !== id
        ),
      };
    });
  };

  return (
    <TodoList>
      <span>{text}</span>

      <Button onClick={onDelete}>X</Button>
    </TodoList>
  );
}

export default ToDo;
