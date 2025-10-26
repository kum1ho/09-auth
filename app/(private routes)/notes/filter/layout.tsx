import css from "./Layout.module.css";

interface TaskLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const TaskLayout = ({ children, sidebar }: TaskLayoutProps) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default TaskLayout;
