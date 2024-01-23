export type Gif = {
  key: string;
  id: string;
  images: {
    fixed_height: {
      url: string;
    };
    original: {
      url: string;
    }
  };
  title: string;
  type: string;
  trending_datetime: string;
};

export type FormValues = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  avatar: string;
  docId: string;
  fullName: string;
  email: string;
  uid: string;
  userName: string;
}
