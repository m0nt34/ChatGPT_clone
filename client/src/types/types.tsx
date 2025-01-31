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
  Role: string;
  Parts: [
    {
      Text: string;
    }
  ];
  Image: string;
};

export type chatListType = {
  ID: string;
  Title: string;
  CreatedAt: string;
};

type PartsObj = {
  Text: string;
};
export type historyType = {
  Role: string;
  Parts: PartsObj[];
  Image: string;
};

export type EditReq = {
  ID: string;
  NewTitle: string;
};
