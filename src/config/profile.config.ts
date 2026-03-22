export type UserProfile = {
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

export const profileData: UserProfile = {
  name: "GUJJAR",
  email: "gujjar@gmail.com",
  role: "Administrator",
  avatar: "/images/avatar.png",
};
