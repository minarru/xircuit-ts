import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCRipple} from '@material/ripple';

import {Canvas} from './canvas';
import {ComponentToolsetSection} from './ui';
import {ComponentType} from './enums';

/** Class representing the entire app. */
class App {
    private activeComponentTool: ComponentType;
    private canvas: Canvas;
    /**
     * Set default active component tool to a conductor from ComponentType enum,
     * initialize SVG.js canvas with a gridSize of 20px
     */
    constructor() {
        this.activeComponentTool = ComponentType.Conductor;

        this.canvas = new Canvas('drawing', 20);

        this.initialize();
    }

    initialize(): void {
        const topAppBarElement: Element = document.querySelector('.mdc-top-app-bar')!;
        new MDCTopAppBar(topAppBarElement);

        const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button')!);
        iconButtonRipple.unbounded = true;

        new ComponentToolsetSection('conductors');
        new ComponentToolsetSection('supplies');
        new ComponentToolsetSection('switches');
        new ComponentToolsetSection('bulbs');

        document.getElementById(this.activeComponentTool)!.classList.add('active');
        for (let component in ComponentType) {
            document.getElementById(component)!.addEventListener('click', () => this.changeActiveComponentTool(component));
        }
    }

    changeActiveComponentTool(component: string): void {
        document.getElementById(this.activeComponentTool)!.classList.remove('active');
        // @ts-ignore
        this.activeComponentTool = ComponentType[component];
        document.getElementById(this.activeComponentTool)!.classList.add('active');
    }
}

new App;
