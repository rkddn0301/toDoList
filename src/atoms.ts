import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// recoilPersist 생성
const { persistAtom } = recoilPersist();

// Todo 타입 정의
export interface IToDo {
  text: string;
  id: number;
}

// 카테고리별 Todo 타입 정의
interface IToDoState {
  [key: string]: IToDo[];
}

/* 
 * effects_UNSTABLE : atom에 부작용을 추가할 수 있는 기능.
 따라서 atom에 변화가 있을 경우 특정 작업을 수행할 수 있다는 의미.
*/

// 카테고리별 Todo가 정의되어 입출력되는 Atom
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "TO DO": [],
  }, // 이 default를 확인하기 전에 먼저 persistAtom이 localStorage에 값이 있는지 확인한다.
  effects_UNSTABLE: [persistAtom], // 변화가 있을 때마다 effects_UNSTABLE에서 persistAtom을 호출하여 recoilPersist의 기능을 이용한다.
});

// 카테고리 선택 시 등록되는 Atom
export const categoryState = atom<string>({
  key: "category",
  default: "TO DO",
});
