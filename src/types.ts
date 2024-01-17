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

export type INoteSource = {
  noteId: string;
  userId: string;
  title: string;
  body: string;
};

// We may need to add more fields to this interface
export type ICreateNote = Omit<INote, "noteId">;

export type IUpdateNote = Omit<INote, "noteId">;
