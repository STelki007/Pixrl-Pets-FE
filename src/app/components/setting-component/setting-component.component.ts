import {Component, OnInit} from '@angular/core';
import {AlertCenterModalComponent} from '../modal/alert-center-modal-component/alert-center-modal-component';
import {DeleteAccountService} from '@services/setting/DeleteAccountService';
import {LogoutService} from '@services/setting/LogoutService';
import {SoundService} from '@services/SoundService';

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
    protected logoutService: LogoutService,
    private soundService: SoundService,
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

  deleteAccount() {+
    this.soundService.playSound("select-item.mp3")
    this.deleteAccountService.setValue(true)
  }

  closeModal() {
    this.soundService.playSound("select-item.mp3")
    this.deleteAccountService.setValue(false)
    this.logoutService.setValue(false);
  }

  confirmDeleteAccount() {
    this.soundService.playSound("select-item.mp3")
    this.deleteAccountService.setValue(false);
  }

  logout() {
    this.soundService.playSound("select-item.mp3")
    this.logoutService.setValue(true)
  }

  confirmLogout() {
    this.soundService.playSound("select-item.mp3");
    this.logoutService.setValue(false)
  }
}
