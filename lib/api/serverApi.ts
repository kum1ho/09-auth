import { cookies } from 'next/headers'
import { nextServer } from './api'
import { User } from '@/types/user'
import { Note } from '@/types/note'

export interface FetchServerNotesParams {
  params: { page: number; search?: string; tag?: string; perPage: number }
  headers: { Cookie: string }
}

export interface FetchServerNoteResp {
  note: Note[]
  totalPages: number
}

export async function fetchNotes(
  page: number,
  searchQuery?: string,
  tag?: string,
): Promise<FetchServerNoteResp> {
  const cookieStore = cookies()
  const params: FetchServerNotesParams = {
    params: { page, perPage: 12 },
    headers: { Cookie: cookieStore.toString() },
  }

  if (searchQuery) params.params.search = searchQuery
  if (tag) params.params.tag = tag

  const res = await nextServer.get<FetchServerNoteResp>('/notes', { params })
  return res.data
}
export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies()
  const response = await nextServer.get<Note>(`notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  })

  return response.data
}

export const checkServerSession = async () => {
  const cookieStore = await cookies()
  const responce = await nextServer.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  })
  return responce
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies()
  const { data } = await nextServer.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  })
  return data
}
