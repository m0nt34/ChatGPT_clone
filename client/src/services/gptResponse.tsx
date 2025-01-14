import model from "../lib/gemini";
import { ImgState } from "../types/types";
export const getResponse = async ({
  imgCopy,
  prop,
}: {
  imgCopy: ImgState;
  prop: string;
}): Promise<{
  error: boolean;
  res: string;
}> => {
  try {
    const result = await model.generateContent(
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
    return { error: false, res: result.response.text() };
  } catch (err) {
    console.log(err);
    return { error: true, res: "An unexpected error occurred" };
  }
};
