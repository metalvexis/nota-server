import type { INote, ICreateNote, IUpdateNote } from "./types";

import { createHash, randomBytes } from "crypto";

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

    // Create a id based on random integer using sha-256 hashing
    const noteIdSuffix = createHash("sha256")
      .update(randomBytes(16))
      .digest("hex")
      .substring(0, 16);
    const noteId = NOTEID_PREFIX + noteIdSuffix;

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

  public async updateNote(
    id: string,
    note: IUpdateNote
  ): Promise<INote | null> {
    this.NoteSource.set(id, {
      ...note,
      noteId: id,
    });
    const updatedNote = this.NoteSource.get(id) || null;

    if (updatedNote) {
      console.log("updatedNote", updatedNote);
      return {
        ...updatedNote,
        noteId: id,
      };
    }

    return updatedNote;
  }

  public async deleteNote(id: string): Promise<void> {
    this.NoteSource.delete(id);
  }
}
