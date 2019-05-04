import {MDCIconButtonToggle} from '@material/icon-button';

import {SectionState} from './enums';

/** Class representing a toolset section in the apps sidebar used for animation. */
export class ComponentToolsetSection {
    private state: SectionState;
    public container: HTMLElement;
    public button: HTMLElement;
    private readonly height: number;
    /**
     * Set initial state, get toolset container and button element,
     * calculate container height and initialize instance.
     * @param {string} id - Part of the id of the toolset container and button elements.
     */
    constructor(id: string) {
        this.state = SectionState.Expanded;

        this.container = document.getElementById(id+'-container')!;
        this.button = document.getElementById('collapse-expand__'+id)!;
        this.height = this.container.offsetHeight;
        
        this.initialize();
    }

    /**
     * Set static container height for animation,
     * initialize MDC toggle button and attach listener for toggle animation.
     */
    initialize(): void {
        this.container.style.height = this.height+'px';

        new MDCIconButtonToggle(this.button);
        this.button.addEventListener('MDCIconButtonToggle:change', () => this.toggle());      
    }

    /** Remove ongoing animation and animate collapsing container. */
    collapse(): void {
        this.container.classList.remove('fading-in');

        this.container.classList.add('fading-out');
        this.container.style.height = '0';
    }

    /** Remove ongoing animation and animate expanding container. */
    expand(): void {
        this.container.classList.remove('fading-out');

        this.container.classList.add('fading-in');
        this.container.style.height = this.height+'px';
    }

    /** Checks toolset state, animates and sets new state. */
    toggle(): void {
        if (this.state === SectionState.Expanded) {
            this.collapse();
            this.state = SectionState.Collapsed;
        } else {
            this.expand();
            this.state = SectionState.Expanded;
        }
    }
}