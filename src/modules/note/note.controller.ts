import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { NoteService } from './note.service';
import { Note } from '@prisma/client';

@Controller('/note')
export class NoteController {
  constructor(
    private noteService: NoteService,
    private authService: AuthService,
  ) {}

  @Get()
  async getAll(): Promise<Note[]> {
    return this.noteService.notes({});
  }

  @Post()
  async addNote(@Body() note: Note): Promise<Note> {
    return this.noteService.createNote(note);
  }
}
