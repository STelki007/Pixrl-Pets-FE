import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarComponent } from './inventar-component';
import { SoundService } from '@services/SoundService';
import { InventoryBackendService } from '@/app/backend/inventory/inventory.backend.service';
import { ItemsBackendService } from '@/app/backend/items/items.backend.service';
import { of } from 'rxjs';


class MockSoundService {
  playSound(file: string) {
    console.log(`Mock sound played: ${file}`);
  }
}

class MockInventoryBackendService {
  getInventoryByPlayerSessionId() {
    return of([
      { itemId: 1, amount: 3 },
      { itemId: 2, amount: 5 }
    ]);
  }
}

class MockItemsBackendService {
  getItemById(id: number) {
    const items = {
      1: { id: 1, name: 'Apfel', image: 'apfel.png' },
      2: { id: 2, name: 'Banane', image: 'banane.png' }
    };
    // @ts-ignore
    return of(items[id]);
  }
}

describe('InventarComponent', () => {
  let component: InventarComponent;
  let fixture: ComponentFixture<InventarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarComponent],
      providers: [
        { provide: SoundService, useClass: MockSoundService },
        { provide: InventoryBackendService, useClass: MockInventoryBackendService },
        { provide: ItemsBackendService, useClass: MockItemsBackendService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load inventory data on init', () => {
    expect(component.playerInventory.length).toBe(2);
    expect(component.playerInventory[0].name).toBe('Apfel');
    expect(component.playerInventory[1].amount).toBe(5);
  });

  it('should push correct item with amount to playerInventory', () => {
    component.getPlayerInventory(1, 10);
    fixture.detectChanges();

    expect(component.playerInventory.some(i => i.amount === 10 && i.name === 'Apfel')).toBeTrue();
  });

  it('should play sound on item click', () => {
    const soundService = TestBed.inject(SoundService);
    const spy = spyOn(soundService, 'playSound');

    expect(spy).toHaveBeenCalledWith('select-item.mp3');
  });
});
