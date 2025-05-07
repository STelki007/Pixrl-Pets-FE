import {Component, OnInit} from '@angular/core';
import {AlertCenterModalComponent} from '../modal/alert-center-modal-component/alert-center-modal-component';
import {DeleteAccountService} from '@services/setting/DeleteAccountService';
import {LogoutService} from '@services/setting/LogoutService';

@Component({
  selector: 'app-setting-component',
  imports: [
    AlertCenterModalComponent
  ],
  templateUrl: './setting-component.component.html',
  styleUrl: './setting-component.component.css'
})
export class SettingComponentComponent implements OnInit {
  protected alertState = false;
  protected titleDeleteAccount: string = "Möchten Sie wirklich dein Account löschen?";
  protected titleLogout: string = "Möchten Sie sich wirklich abmelden?";
  constructor(
    protected deleteAccountService: DeleteAccountService,
    protected logoutService: LogoutService
    ) {
  }

  ngOnInit() {
    this.deleteAccountService.getValue().subscribe((value) => {
      this.alertState = value;
    })
    this.logoutService.getValue().subscribe((value) => {
      this.alertState = value;
    })
  }

  deleteAccount() {
    this.deleteAccountService.setValue(true)
  }

  closeModal() {
    this.deleteAccountService.setValue(false)
    this.logoutService.setValue(false);
  }

  confirmDeleteAccount() {
    this.deleteAccountService.setValue(false);
  }

  logout() {
    this.logoutService.setValue(true)
  }

  confirmLogout() {
    this.logoutService.setValue(false)
  }
}
