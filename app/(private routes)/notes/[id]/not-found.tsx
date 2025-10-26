import Link from "next/link";
import css from "@/app/page.module.css";

const PageNotFound = () => {
    return (
        <div>
            <h1 className={css.title}> 404 - Page not found</h1>
            <p className={css.description}> Sorry, the note you are looking for does not exist.</p>
            <Link href="/">Home Page</Link>
        </div>
    )
};

export default PageNotFound;