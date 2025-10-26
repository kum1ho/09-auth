import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api/serverApi'
import NoteDetails from './NoteDetails.client'
import { Metadata } from 'next'

interface NoteDetailProps {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: NoteDetailProps): Promise<Metadata> => {
  const { id } = await params
  const noteData = await fetchNoteById(id)
  return {
    title: noteData.title,
    description: noteData.content.slice(0, 20),
    openGraph: {
      title: noteData.title,
      description: noteData.content.slice(0, 20),
      url: `https://09-auth-pink.vercel.app/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'og notehub',
        },
      ],
      type: 'article',
    },
  }
}

const Details = async ({ params }: NoteDetailProps) => {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  )
}

export default Details
