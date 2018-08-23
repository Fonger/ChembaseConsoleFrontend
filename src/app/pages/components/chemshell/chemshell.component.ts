import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit  } from '@angular/core'
import { Terminal, ITerminalOptions, ITheme } from 'xterm'
import { fit as termFit } from 'xterm/lib/addons/fit/fit'

import * as io from 'socket.io-client'
import { NbAuthService } from '@nebular/auth'
import { Lab } from '../../../@core/data/lab'
import { ActivatedRoute } from '@angular/router'
import { NbThemeService } from '@nebular/theme'
import { Subscription } from 'rxjs'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'chem-shell',
  templateUrl: './chemshell.component.html',
  styleUrls: ['./chemshell.component.scss'],
})
export class ChemShellComponent implements AfterViewInit, OnInit, OnDestroy  {
  @ViewChild('chemshell')
  shellElement: ElementRef

  term: Terminal
  socket: SocketIOClient.Socket

  lightTheme: ITheme = {
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
    white: '#4b4b4b',
    brightBlack: '#000000',
    brightRed: '#de3e35',
    brightGreen: '#3f953a',
    brightYellow: '#d2b67c',
    brightBlue: '#2f5af3',
    brightMagenta: '#950095',
    brightCyan: '#3f953a',
    brightWhite: '#ffffff',
  }

  darkTheme: ITheme = {
    foreground: '#d0d0d0',
    background: 'rgba(0,0,0,0)',
    cursor: '#d0d0d0',
    cursorAccent: '#000000',
    selection: 'rgba(0, 255, 170, 0.25)',
    black: '#101010',
    red: '#d85786',
    green: '#18de24',
    yellow: '#c47f2c',
    blue: '#4eb4fa',
    magenta: '#7e40a5',
    cyan: '#3579a8',
    white: '#a1a1e5',
    brightBlack: '#303030',
    brightRed: '#ff0090',
    brightGreen: 'greenyellow',
    brightYellow: '#ffba68',
    brightBlue: '#806de5',
    brightMagenta: '#bb88dd',
    brightCyan: '#00ffcc',
    brightWhite: '#d0d0d0',
  }

  termOptions: ITerminalOptions = {
    allowTransparency: true,
    cursorBlink: true,
  }

  constructor(
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private theme: NbThemeService,
  ) {}

  private token: String
  private lab: Lab
  private themeSubscription: Subscription

  ngOnInit() {
    this.term = new Terminal(this.termOptions)
    this.term.setOption('theme', this.lightTheme)

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.term.setOption('theme', config.name === 'cosmic' ? this.darkTheme : this.lightTheme)
    })

    this.lab = this.route.parent.snapshot.data.lab
    this.authService.getToken().subscribe(token => {
      this.token = token.getValue()
    })
  }

  ngAfterViewInit() {

    this.term.open(this.shellElement.nativeElement)

    termFit(this.term)
    this.term.focus()

    this.socket = io(`${environment.apiBaseUri}/admin`, {
      autoConnect: false,
      transports: ['websocket'],
      upgrade: false,
      query: { token: this.token },
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

      setTimeout(() => this.socket.emit('shell-start', { labId: this.lab.id, apiKey: this.lab.apiKey }), 1000)
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
    this.themeSubscription.unsubscribe()
  }
}
