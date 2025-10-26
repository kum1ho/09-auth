'use client'

import Loader from '@/components/Loader/Loader';
import fetchNotes from '@/lib/api/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import css from './NotesPage.module.css'
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import NoteList from '@/components/NoteList/NoteList';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';


interface NotesClientPageProps {
    tag: string,
}

export default function NotesClientPage({tag}: NotesClientPageProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", page, query, tag],
    queryFn: () => fetchNotes(page, query, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })

    const handleSearch = useDebouncedCallback ((query: string) => {
    setQuery(query);
    setPage(1);
  }, 300)

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            page={page}
                      totalPages={data.totalPages}
                      onPageChange={setPage}
          />
        )}
        <Link
          href={`/notes/action/create`}
          className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data && data?.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>Tasks not found</p>
      )}
    </div>
  )
}
