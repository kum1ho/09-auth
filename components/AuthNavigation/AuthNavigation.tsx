'use client'

import React from 'react'
import css from './AuthNavigation.module.css'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import TagsMenu from '../TagsMenu/TagsMenu'
import { logout } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'

export default function AuthNavigation() {
  const { user, isAuthenticated, clearisAuthenticated } = useAuthStore()
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    clearisAuthenticated()
    router.push('/sign-in')
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <li>
            <TagsMenu />
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.username}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  )
}
