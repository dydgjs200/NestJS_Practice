import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from '../board/board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BoardService {
  //게시판 데이터 저장배열
  private boards: Board[] = [];

  private id = 1;

  // 게시글 전체 조회
  findAll(): Board[] {
    return this.boards;
  }

  findOne(id: number): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    return board;
  }

  create(createBoardDto: CreateBoardDto) {
    const newBoard: Board = {
      id: this.id++,
      title: createBoardDto.title,
      content: createBoardDto.content,
    };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, updateBoardDto: CreateBoardDto) {
    const board = this.findOne(id);
    board.title = updateBoardDto.title;
    board.content = updateBoardDto.content;
    return board;
  }

  remove(id: number): void {
    const idx = this.boards.findIndex((board) => board.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    this.boards.splice(idx, 1); // splice로 삭제
  }
}
