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
  };
};

export type chatState = {
  user: boolean;
  img: string;
  text: string;
};
