import { useState } from "react";

import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { StringLiteral } from "typescript";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>({});
  const onValid = ({ toDo }: IForm) => {
    console.log("add to do", toDo);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  console.log(toDos);
  /*
   * onChange : 태그 안에서 바뀌는 동작
   * onFocus : 태그 안을 클릭했을 때 깜빡임
   * onBlur : onFocus 상태가 아닌 것
   */
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* register 안에 required를 넣는 이유는 보안상으로 안전하기 때문 */}
        <input
          {...register("toDo", {
            required: "toDo is required.",
          })}
          placeholder="Write a toDO"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
