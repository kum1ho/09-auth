import { User } from '@/types/user'
import type { Note, CreateNote } from '../../types/note'
import { nextServer } from './api'

interface FetchNotesResponse {
  notes: Note[]
  totalPages: number
}

interface FetchNotesParams {
  page?: number
  perPage?: number
  search?: string
  tag?: string
}

export interface Credentials {
  email: string
  password: string
}

export interface NewNote {
  title: string
  content: string
  tag: string
}

export default async function fetchNotes(
  page: number,
  searchQuery?: string,
  tag?: string,
): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = {
    page,
    perPage: 12,
  }

  if (searchQuery) params.search = searchQuery
  if (tag) params.tag = tag

  const res = await nextServer.get<FetchNotesResponse>('/notes', { params })
  return res.data
}

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', newNote)
  return response.data
}

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`)
  return response.data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`)
  return response.data
}

export const register = async (credentials: Credentials) => {
  const res = await nextServer.post<User>(`/auth/register`, credentials)
  return res.data
}

export const login = async (credentials: Credentials) => {
  const res = await nextServer.post<User>(`/auth/login`, credentials)
  return res.data
}

export const logout = async () => {
  await nextServer.post<User>(`/auth/logout`)
}

export interface SessionStatus {
  success: boolean
}

export const checkSession = async () => {
  const { data } = await nextServer.get<SessionStatus>('/auth/session')
  return data.success
}

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me')
  return data
}

interface UserToUpdate {
  username?: string
}
export const updateUser = async (updatedUser: UserToUpdate) => {
  const { data } = await nextServer.patch<User>('/users/me', updatedUser)
  return data
}
