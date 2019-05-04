/**
 * @readonly
 * @constant
 * @enum {string}
 * @default
*/
export enum ComponentType {
    Conductor = 'Conductor',
    Supply = 'Supply',
    Battery = 'Battery',
    Switch = 'Switch',
    Double_switch = 'Double_switch',
    Bulb = 'Bulb'
}

/** 
 * @readonly
 * @constant
 * @enum
 * @default
*/
export const enum SectionState{
    Expanded,
    Collapsed
}