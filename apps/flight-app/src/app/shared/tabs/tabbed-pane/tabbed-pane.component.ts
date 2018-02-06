import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy,
  OnInit, Output, QueryList
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {TabbedPaneService} from '../services/tabbed-pane.service';
import {TabComponent} from '../tab/tab.component';

@Component({
  selector: 'tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  providers: [TabbedPaneService]
})
export class TabbedPaneComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input() activeId: number;
  @Output() activeIdChange = new EventEmitter<number>();

  currentTab: TabComponent;

  @ContentChildren(TabComponent)
  tabList: QueryList<TabComponent>;

  get tabs() {
    if (!this.tabList) return [];
    return this.tabList.toArray();
  }

  private destroy$ = new Subject<void>();

  constructor(private service: TabbedPaneService) {
  }

  ngOnInit() {

    // Register for nextPage event

    this.service.nextPage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(offset => {
      let idx = this.tabs.findIndex(t => t.id == this.activeId);
      let nextIdx = idx + offset;

      if (nextIdx >= this.tabs.length) return;
      if (nextIdx < 0) return;

      let nextTab = this.tabs[nextIdx];
      this.activate(nextTab.id);
    });
  }

  ngAfterContentInit(): void {
    this.activate(this.activeId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }


  activate(id: number) {
    this.activeId = id;
    this.tabs.forEach(tab => {
      if (tab.id == this.activeId) {
        tab.active = true;
        this.currentTab = tab;
      }
      else {
        tab.active = false;
      }
    });
    this.activeIdChange.next(id);
  }
}
