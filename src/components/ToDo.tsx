import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    console.log("I wanna to ", newCategory);
    setToDos((oldToDos) => {
      // findIndex : 배열 내부에 index를 찾아주며, 아래 코드와 같이 조건부에 따라 특정 index를 가져올 수 있다.
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: newCategory };
      console.log(oldToDo);
      console.log(newToDo);
      return oldToDos;
    });
  };
  return (
    // 보통 onClick에서 호출할 때 : onClick={onClick} 이런식으로 하지만
    // 인자를 보내야 할 경우 : onClick={() => onClick("인자")} 이렇게 익명의 함수를 선언해서 보내줘야 한다.
    // 이유는 onClick 기능 자체가 원래 함수를 호출하는 것이기 때문.
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
