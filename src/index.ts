import { v4 as uuid } from "uuid";
import { collapse } from "@winkgroup/misc";
import ConsoleLog from "@winkgroup/console-log";
import _ from "lodash";

interface EventQueueElement {
  id: string;
  func: Function;
}

export default class EventQueue {
  protected list = [] as EventQueueElement[];
  consoleLog = new ConsoleLog({ prefix: "EventQueue" });

  add(listener: Function) {
    const id = uuid();
    this.list.push({
      id: id,
      func: listener,
    });
    const listenerStr = collapse(listener.toString(), 50);
    this.consoleLog.debug(`added ${id}: ${listenerStr}`);
  }

  remove(id: string) {
    const prevNumber = this.list.length;
    if (prevNumber === 0) return;
    this.list = _.remove(this.list, (el) => el.id === id);
    if (this.list.length === prevNumber)
      this.consoleLog.warn(
        `listener with id "${id}", not found and not removed`
      );
  }

  fire(params?: any) {
    const el = this.list.shift();
    if (el) el.func(params);
  }
}
