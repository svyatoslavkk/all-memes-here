export type Gif = {
  key: string;
  id: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
  title: string;
  type: string;
  trending_datetime: string;
};

export type FormValues = {
  email: string;
  password: string;
};
