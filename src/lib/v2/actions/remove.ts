import { EntitySelector, Payload } from './type-alias';
import { Type } from '@angular/core';
import { EntityState } from '../entity-state';
import { EntityActionType, generateActionObject } from '../internals';

export type EntityRemoveAction<T> = Payload<EntitySelector<T>>;

export class Remove<T> {
  /**
   * Generates an action that will remove the given entities from the state.
   * Put null if all entities should be removed.
   * @param target The targeted state class
   * @param payload An EntitySelector payload
   * @see EntitySelector
   */
  constructor(target: Type<EntityState<T>>, payload: EntitySelector<T>) {
    return generateActionObject(EntityActionType.Remove, target, payload);
  }
}
