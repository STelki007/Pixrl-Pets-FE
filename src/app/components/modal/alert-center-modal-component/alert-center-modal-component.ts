import {AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert-center-modal-component',
  imports: [],
  templateUrl: './alert-center-modal-component.html',
  standalone: true,
  styleUrl: './alert-center-modal-component.css'
})
export class AlertCenterModalComponent implements OnDestroy, AfterViewInit {
  private modalRef?: NgbModalRef;
  private subscription!: Subscription;
  @ViewChild('AlertCenterModal') AlertCenterModal!: TemplateRef<any>;
  @Input() title: string = "";
  @Input() service: any;

  constructor(private modalService: NgbModal) {
  }

  ngAfterViewInit(): void {
    if (this.service) {
      this.subscription = this.service.getValue().subscribe((value: boolean) => {
        if (value) {
          this.openModal(this.AlertCenterModal);
        } else if (!value && this.modalRef) {
          this.closeModal();
        }
      });
    }
  }

  openModal(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      centered: true,
      backdrop: "static",
      keyboard: false
    });
  }

  closeModal() {
    this.modalRef?.close();
    this.modalRef = undefined;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
