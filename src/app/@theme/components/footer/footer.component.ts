import { Component } from '@angular/core';

@Component({
  selector: 'chem-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Copyright &copy; 2018 <b><a href="https://github.com/Fonger" target="_blank">Fonger</a></b></span>
  `,
})
export class FooterComponent {
}
