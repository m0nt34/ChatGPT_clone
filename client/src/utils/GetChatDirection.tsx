import { chatDirection } from "../data/chatDirection";

export const getChatDirectionArr = () => {
  const result = [];
  const copyArr = [...chatDirection];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * copyArr.length);
    const secondRandomIndex = Math.floor(
      Math.random() * copyArr[randomIndex].topics.length
    );
    const selectedTopic = copyArr[randomIndex].topics[secondRandomIndex];
    copyArr[randomIndex].topics = [selectedTopic];
    result.push(copyArr[randomIndex]);
    copyArr.splice(randomIndex, 1);
  }
  return result;
};
