'use client'
import Image from 'next/image'
import css from './EditProfilePage.module.css'
import { useAuthStore } from '@/lib/store/authStore'
import { updateUser } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'

const EditPage = () => {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const router = useRouter()
  const handleSubmit = async (formData: FormData) => {
    const username = formData.get('username') as string
    const newUser = await updateUser({ username })
    setUser(newUser)
    router.push('/profile')
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={'https://ac.goit.global/fullstack/react/default-avatar.jpg'}
          alt={'User Avatar'}
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user?.username ?? ''}
            />
          </div>

          <p>Email: {user?.email ?? ''}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={router.back}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default EditPage
