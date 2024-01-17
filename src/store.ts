import type { INoteSource, INote, ICreateNote } from "./types";

import crypto from "crypto";

const NOTEID_PREFIX = "nota_";

type HashableNoteTuples = [string, string];

export class NoteStore {
  private static NoteSourceInstance: NoteStore;
  private NoteSource: Map<string, INote> = new Map();

  private constructor() {
    this.NoteSource = new Map();
  }

  public static getInstance(): NoteStore {
    if (!NoteStore.NoteSourceInstance) {
      NoteStore.NoteSourceInstance = new NoteStore();
    }
    return NoteStore.NoteSourceInstance;
  }

  public async createNote(note: ICreateNote): Promise<INote> {
    const hashableNote: HashableNoteTuples[] = [];
    // Convert unordered json data to a consistent string
    for (const [key, value] of Object.entries(note)) {
      hashableNote.push([key, value]);
    }
    const hashableNoteString = hashableNote.toString();

    // Create a unique id based on the note data
    const hashedNote = crypto
      .createHash("md5")
      .update(hashableNoteString)
      .digest("hex");
    const noteId = NOTEID_PREFIX + hashedNote;

    const storedNote: INote = {
      noteId,
      ...note,
    };

    if (!this.NoteSource.has(noteId)) {
      this.NoteSource.set(noteId, storedNote);
    }

    return storedNote;
  }

  public async getNote(id: string): Promise<INote | null> {
    if (!this.NoteSource.has(id)) {
      return null;
    }

    const hashedNote = this.NoteSource.get(id) || null;

    return hashedNote;
  }

  public async getAllNotes(): Promise<INote[]> {
    const allNotes: INote[] = Array.from(this.NoteSource.values());
    return allNotes;
  }

  public async updateNote(note: INote): Promise<INote> {
    return this.createNote(note);
  }

  public async deleteNote(id: string): Promise<void> {
    this.NoteSource.delete(id);
  }
}
