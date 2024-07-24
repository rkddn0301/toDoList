import { useState } from "react";

import { useForm } from "react-hook-form";

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

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
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
          {...register("email", { required: true })}
          placeholder="Write a email"
        />
        <input
          {...register("userName", { required: true, minLength: 10 })}
          placeholder="Write a userName"
        />
        <input
          {...register("name", { required: true })}
          placeholder="Write a name"
        />
        <input
          {...register("passWord", { required: true, minLength: 5 })}
          placeholder="Write a passWord"
        />
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

        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
