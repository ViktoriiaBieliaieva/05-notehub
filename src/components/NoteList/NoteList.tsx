import { useMutation, useQueryClient } from "@tanstack/react-query";
import type Note from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import { useState } from "react";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const [deleted, setDeleted] = useState(false);

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setDeleted(true);
      setTimeout(() => setDeleted(false), 1500);
    },
    onError() {
      console.log("error");
    },
  });

  return (
    <>
      {deleted && <SuccessMessage>Note deleted successfully</SuccessMessage>}

      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button} onClick={() => mutate(note.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
