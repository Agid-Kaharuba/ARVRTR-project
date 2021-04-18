import axios from "axios";
import { API_HOST } from ".";


export const verify = async (token) => {
	const res = await axios.get(`${API_HOST}/auth`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const registerUser = async (userData) => {
	const res = await axios.post(`${API_HOST}/auth/register`, userData);
	return res;
};

export const loginUser = async (userData) => {
	const res = await axios.post(`${API_HOST}/auth/login`, userData);
	return res;
}