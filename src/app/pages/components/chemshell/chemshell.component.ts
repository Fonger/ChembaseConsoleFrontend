import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit  } from '@angular/core';
import { Terminal, ITerminalOptions } from 'xterm';
import { fit as termFit } from 'xterm/lib/addons/fit/fit';

import * as io from 'socket.io-client';

@Component({
  selector: 'chem-shell',
  templateUrl: './chemshell.component.html',
  styleUrls: ['./chemshell.component.scss'],
})
export class ChemShellComponent implements AfterViewInit, OnInit, OnDestroy  {
  @ViewChild('chemshell')
  shellElement: ElementRef;

  term: Terminal
  socket: SocketIOClient.Socket
  termOptions: ITerminalOptions = {
    cursorBlink: true,
    theme: {
      foreground: '#2a2c33',
      background: '#ffffff',
      cursor: '#bbbbbb',
      cursorAccent: '#000000',
      selection: 'rgba(0,0,0,.5)',
      black: '#000000',
      red: '#de3e35',
      green: '#3f953a',
      yellow: '#d2b67c',
      blue: '#2f5af3',
      magenta: '#950095',
      cyan: '#3f953a',
      white: '#aaaaaa',
      brightBlack: '#000000',
      brightRed: '#de3e35',
      brightGreen: '#3f953a',
      brightYellow: '#d2b67c',
      brightBlue: '#2f5af3',
      brightMagenta: '#950095',
      brightCyan: '#3f953a',
      brightWhite: '#ffffff',
    },
  }
  ngOnInit() {
    this.term = new Terminal(this.termOptions)
  }

  ngAfterViewInit() {

    this.term.open(this.shellElement.nativeElement)

    termFit(this.term)
    this.term.focus()

    this.socket = io('http://localhost:8080/admin', {
      autoConnect: false,
      transports: ['websocket'],
      upgrade: false,
    })
    this.socket.on('connecting', () => {
      this.term.write('\x1b[32mConnecting to Chembase Server...\x1b[m\r\n')
    })
    this.socket.connect()

    this.term.on('data', (data) => {
      this.socket.emit('shell', data)
    })
    this.socket.on('shell', (data) => {
      this.term.write(data)
    })
    window.addEventListener('resize', () => {
      termFit(this.term)
      this.socket.emit('shell-resize', { cols: this.term.cols, rows: this.term.rows })
    })
    this.socket.on('connect', () => {
      this.term.write('\x1b[32mStarting Chembase Mongo Shell...\x1b[m\r\n')
      setTimeout(() => this.socket.emit('shell-start', 'iwantadminshell'), 1000)
    })
    this.socket.on('disconnect', (r) => {
      this.term.write('\r\n\x1b[31mDisconnect from Chembase Mongo Shell.\x1b[m\r\n')
      if (r === 'io server disconnect') {
        this.socket.connect()
      }
    })
  }
  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect()
    }
    this.term.dispose()
  }
}
