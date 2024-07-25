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
import { toDoSelector, toDoState } from "./atoms";
import ToDo from "./components/ToDo";

function ToDoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

  /*
   * onChange : 태그 안에서 바뀌는 동작
   * onFocus : 태그 안을 클릭했을 때 깜빡임
   * onBlur : onFocus 상태가 아닌 것
   */
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <h2>To Do</h2>
      {/* {...toDo}는 props를 받는 자식 컴포넌트가 같은 interface 타입일 때 사용 가능 */}
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>

      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>

      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
