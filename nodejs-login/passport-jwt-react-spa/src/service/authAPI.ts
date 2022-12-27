import axios from "axios";

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignupResponse {
  token: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  token: string;
}

export async function fetchSignup(dto: SignupRequest): Promise<SignupResponse> {
  const response = await axios.post<SignupResponse>('/auth/register', dto);
  return response.data;
}

export async function fetchSignin(dto: SigninRequest): Promise<SigninResponse> {
  const response = await axios.post<SigninResponse>('/auth/login', dto);
  return response.data
}
