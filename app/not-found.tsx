import Link from "next/link";
import css from "./page.module.css";
import { Metadata } from "next";

const PageNotFound = () => {
    return (
        <div>
            <h1 className={css.title}> 404 - Page not found</h1>
            <p className={css.description}> Sorry, the page you are looking for does not exist.</p>
            <Link href="/">Home Page</Link>
        </div>
    )
};

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Page does not exist",
  openGraph: {
    title: `Page Not Found`,
    description: "Page does not exist",
    url: `https://08-zustand-kappa-cyan.vercel.app/`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "og notehub",
      },
    ],
    type: "article",
  },
};

export default PageNotFound;