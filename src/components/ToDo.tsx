import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    console.log("I wanna to ", newCategory);
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
