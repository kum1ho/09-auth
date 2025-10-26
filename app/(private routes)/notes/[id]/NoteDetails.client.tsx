'use client'

import { fetchNoteById } from '@/lib/api/clientApi'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import css from './NoteDetails.module.css'
import Loader from '@/components/Loader/Loader'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'

export default function NoteDetailsClient() {
  const router = useRouter()

  const { id } = useParams<{ id: string }>()

  const {
    data: note,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  })

  return (
    <>
      {isSuccess && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </>
  )
}
