
const API_BASE = import.meta.env.VITE_API_URL;

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export async function apiCall(
  data: any,
  endpoint: string,
  method: HttpMethod = 'get',
  auth: boolean = true,
  isFormData: boolean = false,
): Promise<any> {
  const urlBase = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let url = `${urlBase}${path}`;

  const headers: Record<string, string> = {};
  if (auth) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body: isFormData ? data : JSON.stringify(data),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export default apiCall;
