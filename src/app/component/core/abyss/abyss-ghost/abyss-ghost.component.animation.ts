/**
 * Dedicated animation to be used within Abyss Ghost component.
 * */
import {animate, AnimationEntryMetadata, state, style, transition, trigger, keyframes} from '@angular/core';

export const animationGhost: AnimationEntryMetadata =
    trigger('animationGhost', [
        state('init', style({
            opacity: 0
        })),
        state('ready', style({
            transform: 'translateX(0)'
        })),
        state('right', style({
            transform: 'translateX(200px) rotateY(0deg)'
        })),
        state('left', style({
            transform: 'translateX(-200px) rotateY(180deg)'
        })),
        state('turnRight', style({
            transform: 'translateX(-200px) rotateY(0deg)'
        })),
        state('turnLeft', style({
            transform: 'translateX(200px) rotateY(180deg)'
        })),
        transition('left => turnRight, right => turnLeft', [
            animate('2s ease-in-out 800ms')
        ]),
        transition('ready => right', [
            style({opacity: 0, transform: 'rotateY(0deg)'}),
            animate('3s ease-in-out 100ms', keyframes([
                style({opacity: 0.25, transform: 'translateX(0)', offset: 0}),
                style({opacity: 0.5, transform: 'translateX(50px)', offset: 0.25}),
                style({opacity: 1, transform: 'translateX(100px)', offset: 0.5}),
                style({opacity: 1, transform: 'translateX(150px) scale(1.8)', offset: 0.75}),
                style({opacity: 1, transform: 'translateX(170px) scale(0.6)', offset: 0.95}),
                style({opacity: 1, transform: 'translateX(200px) scale(1.0)', offset: 1})
            ]))
        ]),
        transition('ready => left', [
            style({opacity: 0, transform: 'rotateY(180deg)'}),
            animate('3s ease-in-out 100ms', keyframes([
                style({opacity: 0.25, transform: 'translateX(0) rotateY(180deg)', offset: 0}),
                style({opacity: 0.5, transform: 'translateX(-50px) rotateY(180deg)', offset: 0.25}),
                style({opacity: 1, transform: 'translateX(-100px) rotateY(180deg)', offset: 0.5}),
                style({opacity: 1, transform: 'translateX(-150px) scale(1.8) rotateY(180deg)', offset: 0.75}),
                style({opacity: 1, transform: 'translateX(-170px) scale(0.6) rotateY(180deg)', offset: 0.95}),
                style({opacity: 1, transform: 'translateX(-200px) scale(1.0) rotateY(180deg)', offset: 1})
            ]))
        ]),
        transition('turnLeft => left', [
            animate('8s', keyframes([
                style({transform: 'translateX(200px) translateY(0) rotateY(180deg)', offset: 0}),
                style({transform: 'translateX(100px) translateY(-30px) rotateY(180deg)', offset: 0.25}),
                style({transform: 'translateX(0px) translateY(0) rotateY(180deg)', offset: 0.5}),
                style({transform: 'translateX(-100px) translateY(30px) rotateY(180deg)', offset: 0.75}),
                style({transform: 'translateX(-200px) translateY(0) rotateY(180deg)', offset: 1})
            ]))
        ]),
        transition('turnRight => right', [
            animate('8s', keyframes([
                style({transform: 'translateX(-200px) translateY(0) rotateY(0deg)', offset: 0}),
                style({transform: 'translateX(-100px) translateY(30px) rotateY(0deg)', offset: 0.25}),
                style({transform: 'translateX(0) translateY(0) rotateY(0deg)', offset: 0.5}),
                style({transform: 'translateX(100px)translateY(-30px) rotateY(0deg)', offset: 0.75}),
                style({transform: 'translateX(200px) translateY(0) rotateY(0deg)', offset: 1})
            ]))
        ])
    ]);
