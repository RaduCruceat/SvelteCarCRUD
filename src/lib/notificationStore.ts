import { writable } from 'svelte/store';

export const notification = writable('');

export function notify(message: string) {
    notification.set(message);
    setTimeout(() => notification.set(''), 3000); // Clear after 3 seconds
}