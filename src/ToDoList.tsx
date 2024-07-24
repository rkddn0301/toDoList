import { useState } from "react";

import { useForm } from "react-hook-form";
import { StringLiteral } from "typescript";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    setToDoError("");
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={toDo} onChange={onChange} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  userName: string;
  name: string;
  passWord: string;
  passWord1: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors.email?.message);
  /*
   * onChange : 태그 안에서 바뀌는 동작
   * onFocus : 태그 안을 클릭했을 때 깜빡임
   * onBlur : onFocus 상태가 아닌 것
   */
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* register 안에 required를 넣는 이유는 보안상으로 안전하기 때문 */}
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Write a email"
        />
        <span>{errors.email?.message}</span>

        <input
          {...register("userName", { required: "Write Here", minLength: 10 })}
          placeholder="Write a userName"
        />
        <span>{errors.userName?.message}</span>
        <input
          {...register("name", { required: "Write Here" })}
          placeholder="Write a name"
        />
        <span>{errors.name?.message}</span>
        <input
          {...register("passWord", { required: "Write Here", minLength: 5 })}
          placeholder="Write a passWord"
        />
        <span>{errors.passWord?.message}</span>
        <input
          {...register("passWord1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Write a passwWord1"
        />
        <span>{errors.passWord1?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
