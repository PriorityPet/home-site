const API_URL = process.env.NEXT_PUBLIC_API_URL

export const GET_USER_ENDPOINT : string = API_URL + '/doctor/auth';
export const AUTH_ENDPOINT : string = API_URL + '/doctor/auth';
export const REGISTER_USER_ENDPOINT : string = API_URL + '/doctors';
export const UPDATE_USER_ENDPOINT = (id:number) => API_URL + `/doctor/${id}`;
export const UPDATE_AVATAR_ENDPOINT = (id:number) => API_URL + `/doctor/${id}/avatar`;

export const GET_MEDICAL_SPECIALITIES_ENDPOINT : string = API_URL + '/medical_specialty';
export const GET_SPECIALISTS_ENDPOINT : string =API_URL + `/specialists`;

export const GET_MEDICAL_CENTERS_ENDPOINT : string = API_URL + `/medical_center`;

export const GET_CATEGORIES_SERVICES_ENDPOINT : string = API_URL + `/service_category`;
export const GET_SERVICES_ENDPOINT :string = API_URL + `/services`;