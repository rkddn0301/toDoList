import { useState } from "react";

import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { StringLiteral } from "typescript";
import CreateToDo from "./components/CreateToDo";
import { Categories, categoryState, toDoSelector, toDoState } from "./atoms";
import ToDo from "./components/ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    // as any : 상황에 맞지는 않는데 그냥 쓴다는 의미.(신뢰성)
    setCategory(e.currentTarget.value as any);
  };
  console.log(toDos);
  /*
   * onChange : 태그 안에서 바뀌는 동작
   * onFocus : 태그 안을 클릭했을 때 깜빡임
   * onBlur : onFocus 상태가 아닌 것
   */
  return (
    <div>
      <div>
        <h1>To Dos</h1>
        <hr />
        {/* onInput : 변경을 통해 입력된 값을 실시간으로 처리해주는 메서드 */}
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
        <CreateToDo />
        <ul>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;

/* 아래 코드는 일반 useState로 진행 했을 때이다.
interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

  function ToDoList() {
    const [toDo, setToDo] = useState("");
  
    const [toDos, setToDos] = useState<IToDo[]>([]);
  
    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
      setToDo(e.currentTarget.value);
    };
  
    const onValid = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setToDos((oldToDos) => [
        { text: toDo, id: Date.now(), category: "TO_DO" },
        ...oldToDos,
      ]);
      console.log(toDo);
    };
  

    return (
      <div>
        <h1>To Dos</h1>
        <hr />
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onValid}
        >

          <input
            value={toDo}
            onChange={changeHandler}
            placeholder="Write a toDO"
          />
          <button>Add</button>
        </form>
        <h2>To Do</h2>
        
        <ul>
        {...toDo}는 props를 받는 자식 컴포넌트가 같은 interface 타입일 때 사용 가능
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </div>
    );
  } */
