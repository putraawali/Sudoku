"use strict"

class Sudoku {
  constructor(board_string) {
    this._board_string = board_string
    this._sudoBoard = this.board()
    this._boardToString = this.printBoardToString()
    this._emptySpot = this.emptySpot()
  }
  get sudoBoard() { //untuk panggil board
    return this._sudoBoard
  }

  get boardToString() { // untuk panggil hasil konversi akhir
    return this._boardToString
  }

  board() { //bikin board sbg array
    let sudoBoard = []
    let temp = []
    for (let i = 0; i < this._board_string.length; i++) {
      if (temp.length === 9) {
        sudoBoard.push(temp)
        temp = []
      }
      temp.push(+this._board_string[i])
    }
    return sudoBoard
  }

  emptySpot() { //cari titik kosongnya
    let spotTarget = []
    for (let i = 0; i < this._sudoBoard.length; i++) {
      for (let j = 0; j < this._sudoBoard[i].length; j++) {
        if (this._sudoBoard[i][j] === 0) {
          spotTarget.push(i, j)
          return spotTarget
        }
      }
    }
    return []
  }
  
  checkRow(row, number) { //ngecek tiap baris
    for (let i = 0; i < this._sudoBoard.length; i++) {
      if (this._sudoBoard[row][i] === number) {
        return false
      }
    }
    return true
  }
  
  checkColumn(column, number) { //ngecek tiap kolom
    for (let i = 0; i < this._sudoBoard.length; i++) {
      if (this._sudoBoard[i][column] === number) {
        return false
      }
    }
    return true
  }
  
  checkBox(row, column, number) { //ngecek box 3x3
    row = Math.floor(row / 3) * 3
    column = Math.floor(column / 3) * 3
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this._sudoBoard[i + row][column + j] === number) {
          return false
        }
      }
    }
    return true
  }
  
  validator(row, column, number) { //validasi apakah angka yg akan dimasukkan memang pas
    if (this.checkBox(row, column, number) && this.checkRow(row, number) && this.checkColumn(column, number)) {
      return true
    }
    return false
  }
  
  solve() { //eksekutor
    let empty = this.emptySpot()
    let row = empty[0]
    let column = empty[1]
    
    if (empty.length === 0) {
      return this._sudoBoard
    }
    
    for (let i = 1; i <= 9; i++) {
      if (this.validator(row, column, i)) {
        this._sudoBoard[row][column] = i;
        this.solve()
      }
    }
    if (this.emptySpot().length > 0) {
      this._sudoBoard[row][column] = 0
    }
  }


  printBoardToString() { // konverter
    let strSudo = '=======================\n';
    for (let i = 0; i < this._sudoBoard.length; i++) {
      for (let j = 0; j < this._sudoBoard[i].length; j++) {
        strSudo += this._sudoBoard[i][j] + ' '
        if ((j + 1) % 3 === 0) {
          strSudo += '| '
        }
      }
      strSudo += '\n'
      if ((i + 1) % 3 === 0) {
        strSudo += '=======================\n'
      }
    }
    return strSudo
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[12]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()
console.log(game.printBoardToString()
)