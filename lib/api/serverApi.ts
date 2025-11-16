import { cookies } from 'next/headers'
import { nextServer } from './api'
import { User } from '@/types/user'
import { Note } from '@/types/note'

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

  const res = await nextServer.get<FetchServerNoteResp>('/notes', {
    params: paramsObj,
    headers: { Cookie: cookieStore.toString() },
  })

  return res.data
}
export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies()
  const response = await nextServer.get<Note>(`/notes/${id}`, {
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
