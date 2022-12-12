import ConsoleLog from '@winkgroup/console-log';
interface EventQueueElement {
    id: string;
    func: Function;
}
export default class EventQueue {
    protected list: EventQueueElement[];
    consoleLog: ConsoleLog;
    add(listener: Function): void;
    remove(id: string): void;
    fire(params?: any): void;
}
export {};
