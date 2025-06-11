import {Component, OnInit} from '@angular/core';
import {AlertCenterModalComponent} from '../modal/alert-center-modal-component/alert-center-modal-component';
import {DeleteAccountService} from '@services/setting/DeleteAccountService';
import {LogoutService} from '@services/setting/LogoutService';
import {SoundService} from '@services/SoundService';
import {DrawAvatarComponent} from '@/app/draw-avatar/draw-avatar.component';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {ShowDrawAvatarComponentService} from '@services/setting/show.draw.avatar.component.service';

@Component({
  selector: 'app-setting-component',
  imports: [
    AlertCenterModalComponent,
    DrawAvatarComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './setting-component.component.html',
  styleUrl: './setting-component.component.css'
})
export class SettingComponentComponent implements OnInit {
  protected alertState = false;
  protected titleDeleteAccount: string = "Möchten Sie wirklich dein Account löschen?";
  protected titleLogout: string = "Möchten Sie sich wirklich abmelden?";
  protected isProfileImageButtonPressed: boolean = false;
  profileImage: string = "/avatar-defulat.svg";
  keyCloakUserName: string = "Unbekannt";

  constructor(
    protected deleteAccountService: DeleteAccountService,
    protected logoutService: LogoutService,
    private soundService: SoundService,
    private authContextService: AuthContextService,
    private showDrawAvatarComponentService: ShowDrawAvatarComponentService,
  ) {
  }

  ngOnInit() {
    this.getAlertStateValue();
    this.getImageFromLocalStorage();
    this.getKeyCloakUserName()
    this.handleShowDrawAvatarComponent();
  }

  handleShowDrawAvatarComponent () {
    this.showDrawAvatarComponentService.getValue().subscribe(value => {
      this.isProfileImageButtonPressed = value;
    })
  }

  getKeyCloakUserName () {
    this.keyCloakUserName = this.authContextService.getKeycloakUserName();
  }

  getAlertStateValue() {
    this.logoutService.getValue().subscribe((value) => {
      this.alertState = value;
    })
    this.deleteAccountService.getValue().subscribe((value) => {
      this.alertState = value;
    })
  }

  getImageFromLocalStorage() {
    const storedImage = localStorage.getItem("userProfileImage");
    if (storedImage) {
      this.profileImage = storedImage;
    }
  }


  deleteAccount() {
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

  onDrawAvatarClick() {
    this.isProfileImageButtonPressed = true;
  }

  onProfileImageRemove() {
    localStorage.removeItem("userProfileImage");
    this.profileImage = "/avatar-defulat.svg";
  }
}
