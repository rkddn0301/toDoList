// 카테고리 생성 및 선택되는 컴포넌트

import { useRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Selector = styled.select`
  width: 100px;
`;

const Button = styled.button`
  cursor: pointer;
`;

// react-hook-form에서 전달되는 타입 정의
interface IForm {
  category: string;
}

function SelectToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState); // 카테고리별 toDo 입출력 atom
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState); // 카테고리 입출력 atom
  const [inputValue, setInputValue] = useState<string>(""); // 카테고리명 입력 input
  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: { category: "" },
  }); // 카테고리 등록 react-hook-form

  // select 태그에서 선택될 시 동작
  // onInput : 변경을 통해 입력된 값을 실시간으로 처리해주는 메서드
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    // as any : 상황에 맞지는 않는데 그냥 쓴다는 의미.(신뢰성)
    setSelectedCategory(e.currentTarget.value as any); // 선택한 카테고리 값이 등록됨
  };

  // input에 추가 할 category 입력 시 동작
  const onChangeCategoryValue = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  // category 추가 시 동작
  // input에서 입력받은 register 값을 매개변수로 등록
  const onValid = ({ category }: IForm) => {
    console.log("add Category", category);

    // 카테고리(category)가 카테고리 방(toDos)에 없으면 동작
    if (!(category in toDos)) {
      // 이미 있는 카테고리 방(prev)에 새로운 카테고리 방(category)이 추가
      setToDos((prev) => {
        return {
          ...prev,
          [category]: [],
        };
      });
      alert("카테고리가 등록되었습니다.");
    } else {
      alert("이미 존재하는 카테고리 입니다.");
    }
    setInputValue(""); // 기존에 입력된 input은 초기화
  };

  return (
    <Wrapper>
      {/* Object.keys : Object(toDos)의 키(category)를 배열 기준으로 삼음 */}
      <Selector value={selectedCategory} onInput={onInput}>
        {Object.keys(toDos).map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Selector>
      <form onSubmit={handleSubmit(onValid)}>
        {/* 이 input은 카테고리가 등록됨과 동시에 보이면 안되기 때문에 register와 value를 다르게 설정하였다. */}
        <input
          {...register("category", {
            required: "Category is required.",
            maxLength: {
              value: 10,
              message: "Category must be less than 10 characters.",
            },
          })}
          value={inputValue}
          onChange={onChangeCategoryValue}
          placeholder="카테고리명 입력"
        />
        <Button type="submit">+</Button>
      </form>
    </Wrapper>
  );
}
export default SelectToDo;
