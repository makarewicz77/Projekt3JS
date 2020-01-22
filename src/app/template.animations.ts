import { trigger, sequence, state, animate, transition, style } from '@angular/animations';

export const rowsAnimation =
    trigger('rowsAnimation', [
        transition('void => *', [
            style({ height: '*', opacity: '0', transform: 'translateX(0px)', 'box-shadow': 'none' }),
            sequence([
                animate(".5s ease", style({ height: '*', opacity: '.', transform: 'translateX(0)', 'box-shadow': 'none' })),
                animate(".5s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
            ])
        ])
    ]);
