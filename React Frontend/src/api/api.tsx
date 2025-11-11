import Http from "../services/http";

export const loginAPI = (data: any) => {
  return Http.post("auth/login", data);
};

export const signupAPI = (data: any) => {
  return Http.post("auth/register", data);
};

export const unfriendUserAPI = () => {
  return Http.get("auth/list-friend");
};

export const invitationAPI = (data: any) => {
  return Http.post("auth/add-friend", data);
};

export const invitedNotificationAPI = () => {
  return Http.get("auth/invited-friend");
};

export const addFriendAPI = (data: any) => {
  return Http.post("auth/accept-invite", data);
};

export const sidebarAPI = () => {
  return Http.get("chat/users");
};