export class GenericNoteError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message); // call the parent constructor
    this.status = status;
  }
}

export type INote = {
  noteId: string;
  userId: string;
  title: string;
  body: string;
};

export type ICreateNote = Omit<INote, "noteId">;

export type IUpdateNote = Omit<INote, "noteId">;
