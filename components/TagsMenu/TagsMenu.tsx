"use client"
import { useState } from 'react'
import css from './TagsMenu.module.css'
import Link from 'next/link';


const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={css.menuContainer}>
  <button className={css.menuButton} onClick={toggle}>
    Notes ▾
      </button>
      {isOpen && (
    <ul className={css.menuList}>
        {tags.map((item) => (
            <li className={css.menuItem} key={item}>
            <Link
              onClick={toggle}
              href={`/notes/filter/${item}`}
              className={css.menuLink}>
              {item}
            </Link>
            </li>))}
        </ul>
        )}
</div>
  )
}
