import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { listItems } from '../models/data.model';

const animaArray = [
  trigger('list', [
    state(
      'in',
      style({
        transform: 'translateX(0)',
        opacity: 1,
      })
    ),
    transition('void => *', [
      style({
        transform: 'translateX(-100px)',
        opacity: 0,
      }),
      animate(
        1000,
        style({
          transform: 'translateX(0px)',
          opacity: 1,
        })
      ),
    ]),
    transition('* => void', [
      group([
        animate(
          300,
          style({
            color: 'red',
          })
        ),
        animate(
          800,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ]),
];

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: animaArray,
})
export class HomepageComponent implements OnInit {
  list: listItems;
  icon = faTimes;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.list = data['items'];
    });
  }

  onAddItem(input: HTMLInputElement) {
    let index = -1;
    this.list.forEach((item, i) => {
      if (item.name === input.value) {
        index = i;
      }
    });
    if (index !== -1) {
      this.list[index].quantity++;
    } else {
      this.list.push({ name: input.value, quantity: 1 });
    }
  }

  deleteItem(index: number) {
    this.list.splice(index, 1);
  }
}
