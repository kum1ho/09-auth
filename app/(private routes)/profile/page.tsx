import React from 'react'
import css from './ProfilePage.module.css'
import Link from 'next/link'
import { getMe } from '@/lib/api/serverApi'
import Image from 'next/image'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const user = await getMe()

  return {
    title: `${user.username} profile`,
    description: `${user.username} profile page`,
    openGraph: {
      title: `${user.username} profile`,
      description: `${user.username} profile page`,
      url: `https://09-auth-pink.vercel.app/profile`,
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

export default async function profilePage() {
  const user = await getMe()

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href={'/profile/edit'} className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={'https://ac.goit.global/fullstack/react/default-avatar.jpg'}
            alt={'User Avatar'}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  )
}
