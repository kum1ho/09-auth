'use client'

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote, NewNote } from '../../lib/api/clientApi';
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";



const NoteForm = () => {
  const router = useRouter();
  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNote;
    mutation.mutate(values);
  };

  const { draft, setDraft, clearDraft } = useNoteStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
        router.push("/notes/filter/All");
    },
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDraft({
      ...draft,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  return (
        <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" className={css.input} value={draft.title} onChange={handleChange}/>
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
        <textarea 
          onChange={handleChange}
          value={draft.content}
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select id="tag" name="tag" className={css.select} value={draft.tag} onChange={handleChange}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
            
          </div>

          <div className={css.actions}>
        <button
          onClick={router.back}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button
          type="submit"
          className={css.submitButton}
            >
              Create note
            </button>
          </div>
        </form>
      
  );
};

export default NoteForm;