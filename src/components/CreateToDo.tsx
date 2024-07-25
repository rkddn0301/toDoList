import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>({});
  const onValid = ({ toDo }: IForm) => {
    console.log("add to do", toDo);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
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
  );
}

export default CreateToDo;
