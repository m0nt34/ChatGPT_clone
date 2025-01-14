export type openStruct = {
  open: boolean;
  setOpen: () => void;
};

export type ImgState = {
  isLoading: boolean;
  error: string;
  dbData: {
    fileId?: string;
    filePath?: string;
    url?: string;
  };
  aiData: {
    inlineData: {
      data: string;
      mimeType: string;
    };
  };
};

export type chatState = {
  user: boolean;
  img: string;
  text: string;
};
/*
export type chatState = {
  role: string;
  parts: {
    text: string;
    img: string;
  }[];
};
*/
