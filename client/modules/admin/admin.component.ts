
import { Component,
         OnInit }             from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.css' ]
})
export class AdminComponent {

  navLinks: { label: string, href: string }[] = [
    { label: 'Account', href: '/admin/account' }
  ];

  // TODO: what is this about?
  ngOnInit() {
    if(true)
      this.navLinks.push({ label: 'Users', href: '/admin/users' });
  }

}