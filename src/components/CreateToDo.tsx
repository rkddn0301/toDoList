// 선택된 카테고리 방에 Todo 글이 등록되는 컴포넌트

import { useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;

  gap: 10px;
`;

const Input = styled.input``;

const Button = styled.button`
  cursor: pointer;
`;

// react-hook-form에서 전달되는 타입 정의
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const selectedCategory = useRecoilValue(categoryState); // 선택된 카테고리 보여주는 atom
  const setToDos = useSetRecoilState(toDoState); // toDo를 입력하는 atom
  const { register, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: { toDo: "" },
  }); // toDo 등록 react-hook-form

  // toDo 추가 시 동작
  // input에서 입력받은 register 값을 매개변수로 등록
  const onValid = ({ toDo }: IForm) => {
    // toDo와 선택된 카테고리가 존재할 시 동작
    if (toDo && selectedCategory) {
      // 선택된 카테고리 방에 id와 toDo(text)가 등록됨
      setToDos((prev) => ({
        ...prev,
        [selectedCategory]: [
          ...prev[selectedCategory],
          { text: toDo, id: Date.now() },
        ],
      }));
      setValue("toDo", ""); // 기존에 입력된 input은 초기화
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("toDo", {
            required: "ToDo is required.",
          })}
          placeholder={`${selectedCategory} 내용 입력`}
        />
        <Button type="submit">+</Button>
      </form>
    </Wrapper>
  );
}

export default CreateToDo;
