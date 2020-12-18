import { Component } from "@angular/core"

@Component({
    selector: 'float-btn',
    template: `
        <StackLayout class="float-btn">
            <Label class="float-btn-text" text="+"></Label>
        </StackLayout>
    `,
    styles: [
        `
        .float-btn{
            background-color: #e09ad0;
            border-radius: 28;
            width: 56;
            height: 56;
            text-align: center;
            vertical-align: middle;
        }
        .float-btn-text{
            color: white;
            font-size: 36;
            font-weigth: 200;
        }
    `
    ]
  })

export class FloatButtonComponent {

}