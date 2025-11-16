import { cookies } from 'next/headers'
import axios from 'axios'
import { User } from '@/types/user'
import { Note } from '@/types/note'

const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  }
  return process.env.NEXT_PUBLIC_API_URL 
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : 'http://localhost:3000/api'
}

const serverApi = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
})

export interface FetchServerNotesParams {
  page?: number
  perPage?: number
  search?: string
  tag?: string
}

export interface FetchServerNoteResp {
  notes: Note[]
  totalPages: number
}

export async function fetchNotes(
  page: number,
  searchQuery?: string,
  tag?: string,
): Promise<FetchServerNoteResp> {
  const cookieStore = await cookies()

  const paramsObj: FetchServerNotesParams = {
    page,
    perPage: 12,
  }

  if (searchQuery) paramsObj.search = searchQuery
  if (tag) paramsObj.tag = tag

  const res = await serverApi.get<FetchServerNoteResp>('/notes', {
    params: paramsObj,
    headers: { Cookie: cookieStore.toString() },
  })

  return res.data
}
export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies()
  const response = await serverApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  })

  return response.data
}

export const checkServerSession = async () => {
  const cookieStore = await cookies()
  const responce = await serverApi.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  })
  return responce
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies()
  const { data } = await serverApi.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  })
  return data
}
