import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// recoilPersist 생성
const { persistAtom } = recoilPersist();

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

/* 
 * effects_UNSTABLE : atom에 부작용을 추가할 수 있는 기능.
 따라서 atom에 변화가 있을 경우 특정 작업을 수행할 수 있다는 의미.
*/

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [], // 이 default를 확인하기 전에 먼저 persistAtom이 localStorage에 값이 있는지 확인한다.
  effects_UNSTABLE: [persistAtom], // 변화가 있을 때마다 effects_UNSTABLE에서 persistAtom을 호출하여 recoilPersist의 기능을 이용한다.
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    // filter : 기존 배열 형식 내부에서 원하는 조건으로 찾아와 배열로 다시 반환
    return toDos.filter((toDo) => toDo.category === category);
  },
});
