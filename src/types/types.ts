export type Gif = {
  key: string;
  id: string;
  images: {
    fixed_height: {
      url: string;
    };
    original: {
      url: string;
    };
  };
  title: string;
  type: string;
  trending_datetime: string;
};

export type FavGif = {
  id: string;
  url: string;
  title: string;
  originalUrl: string;
};

export type FormValues = {
  email: string;
  password: string;
};

export interface AuthUser extends User {
  accessToken: string;
  auth: any;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any;
  phoneNumber: string | null;
  photoURL: string;
  proactiveRefresh: any;
  providerData: any[];
  providerId: string;
  reloadListener: any;
  reloadUserInfo: any;
  stsTokenManager: any;
  tenantId: string | null;
  uid: string;
  refreshToken: string;
}

export type User = {
  id: string;
  avatar: string;
  docId: string;
  fullName: string;
  email: string;
  uid: string;
  userName: string;
  favoriteGifs: FavGif[];
};

export type Post = {
  avatar: string;
  caption: string;
  gifURL: string;
  timestamp: string;
  uid: string;
  userName: string;
};

export interface MenuBarProps {
  handleCreatePostClick?: () => void;
}
