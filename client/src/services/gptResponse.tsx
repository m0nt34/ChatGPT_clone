import model from "../lib/gemini";
import { useChat } from "../store/chat";
import { ImgState } from "../types/types";
export const getResponse = async ({
  imgCopy,
  prop,
}: {
  imgCopy: ImgState;
  prop: string;
}): Promise<{
  res: string;
}> => {
  const { chats } = useChat.getState();
  try {
    const chat = model.startChat({
      history: chats?.map(({ Role, Parts }) => ({
        role:Role,
        parts: [{ text: Parts[0].Text }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    const result = await chat.sendMessage(
      Object.entries(imgCopy.aiData).length &&
        imgCopy.aiData.inlineData.data &&
        imgCopy.aiData.inlineData.mimeType
        ? [
            {
              inlineData: {
                data: imgCopy.aiData.inlineData.data,
                mimeType: imgCopy.aiData.inlineData.mimeType,
              },
            },
            prop,
          ]
        : [prop]
    );
    return {res: result.response.text() };
  } catch (err) {
    console.log(err);
    return {  res: "An unexpected error occurred" };
  }
};
