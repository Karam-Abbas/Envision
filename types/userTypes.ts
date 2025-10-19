export interface User {
  id: number;
  email: string;
  phone_no: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  last_login: string | null;
  roles: ("admin" | "frontdesk" | "clinician" | "patient")[];
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface RootState { // for future case when we have more slices
  auth: AuthState;
  // Add other slice states here as needed
}

export interface signUpResponse {
  email: string;
  username: string;
  id: number;
}