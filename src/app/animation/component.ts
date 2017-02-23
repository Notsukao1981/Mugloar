/**
 * Animations tailored to be specifically used within and targeting component's elements.
 * */
import {animate, AnimationEntryMetadata, state, style, transition, trigger, group, keyframes} from '@angular/core';

export const animationSlideFromLeft: AnimationEntryMetadata =
    trigger('animationSlideFromLeft', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0) scale(1)'
            })
        ),
        transition('* => *', [
            style({
                opacity: 0,
                transform: 'translateX(-100%) scale(0)'
            }),
            group([
                animate('0.3s 0.15s ease-in', style({
                    transform: 'translateX(0) scale(1)'
                })),
                animate('0.4s ease', style({
                    opacity: 1
                }))
            ])
        ])
    ]);

export const animationSlideFromRight: AnimationEntryMetadata =
    trigger('animationSlideFromRight', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0) scale(1)'
            })
        ),
        transition('* => *', [
            style({
                opacity: 0,
                transform: 'translateX(100%) scale(0)'
            }),
            group([
                animate('0.3s 0.15s ease-in', style({
                    transform: 'translateX(0) scale(1)'
                })),
                animate('0.4s ease', style({
                    opacity: 1
                }))
            ])
        ])
    ]);

export const animationPhaseIn: AnimationEntryMetadata =
    trigger('animationPhaseIn', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0) scale(1)'
            })
        ),
        transition('* => *', [
            style({
                opacity: 0,
                transform: 'scale(0)'
            }),
            group([
                animate('0.8s 0.25s ease-in', style({
                    transform: 'scale(1)'
                })),
                animate('0.8s ease', style({
                    opacity: 1
                }))
            ])
        ])
    ]);

export const animationSpawnIn: AnimationEntryMetadata =
    trigger('animationSpawnIn', [
        state('*',
            style({
                opacity: 1,
                transform: 'scale(1)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'scale(0)'
            }),
            animate('0.3s 0.15s ease-in')
        ])
    ]);

export const animationFadeInFadeOut: AnimationEntryMetadata =
    trigger('animationFadeInFadeOut', [
        state(':enter',
            style({
                opacity: 1
            })
        ),
        state('void',
            style({
                opacity: 0
            })
        ),
        transition(':enter', [
            style({
                opacity: 0
            }),
            animate('250ms 100ms ease-in')
        ]),
        transition(':leave', [
            style({
                opacity: 1
            }),
            animate('1500ms 500ms ease-in')
        ])
    ]);

export const animationInitializeA: AnimationEntryMetadata =
    trigger('animationState', [
        state('init', style({
            transform: 'scale(0)'
        })),
        state('ready', style({
            transform: 'scale(1)'
        })),
        transition('init => ready', animate('500ms 100ms ease-in'))
    ]);

export const animationInitializeB: AnimationEntryMetadata =
    trigger('animationState', [
        state('init', style({
            opacity: 0
        })),
        state('ready', style({
            opacity: 1
        })),
        transition('init => ready', animate('1s 100ms ease-in'))
    ]);

export const animationSpinningSlingshotInward: AnimationEntryMetadata =
    trigger('animationSpinningSlingshotInward', [
        state('ready', style({
            opacity: 1,
            transform: 'scale(1) rotateZ(0)'
        })),
        transition('void => ready', [
            animate('2000ms ease-in-out 100ms', keyframes([
                style({opacity: 0, transform: 'scale(1) rotateZ(0)', offset: 0}),
                style({opacity: 0.15, transform: 'scale(2.5) rotateZ(1080deg)', offset: 0.1}),
                style({opacity: 0.5, transform: 'scale(8) rotateZ(360deg)', offset: 0.5}),
                style({opacity: 1, transform: 'scale(1) rotateZ(0)', offset: 1.0})
            ]))
        ])
    ]);

export const animationBounceFromAboveOnEnter: AnimationEntryMetadata =
    trigger('animationBounceFromAboveOnEnter', [
        state('init', style({
            opacity: 0
        })),
        state('ready', style({
            opacity: 1
        })),
        transition('init => ready', [
            animate('1600ms ease-in-out 100ms', keyframes([
                style({opacity: 0, transform: 'translateY(-205px)', 'filter': 'brightness(100%)', offset: 0}),
                style({opacity: 0.5, transform: 'translateY(-100px)', 'filter': 'brightness(100%)', offset: 0.4}),
                style({opacity: 1, transform: 'translateY(0)', 'filter': 'brightness(100%)', offset: 0.55}),
                style({opacity: 1, transform: 'translateY(-52px)', 'filter': 'brightness(100%)', offset: 0.65}),
                style({opacity: 1, transform: 'translateY(0)', 'filter': 'brightness(100%)', offset: 0.75}),
                style({opacity: 1, transform: 'translateY(-25px)', 'filter': 'brightness(100%)', offset: 0.82}),
                style({opacity: 1, transform: 'translateY(0)', 'filter': 'brightness(185%)', offset: 0.87}),
                style({opacity: 1, transform: 'translateY(-12px)', 'filter': 'brightness(150%)', offset: 0.92}),
                style({opacity: 1, transform: 'translateY(0)', 'filter': 'brightness(125%)', offset: 0.97}),
                style({opacity: 1, transform: 'translateY(0)', 'filter': 'brightness(100%)', offset: 1.0})
            ]))
        ])
    ]);
