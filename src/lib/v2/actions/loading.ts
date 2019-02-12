import { Type } from '@angular/core';
import { EntityState } from '../entity-state';
import { EntityActionType, generateActionObject } from '../internals';

export interface EntitySetLoadingAction {
  payload: boolean;
}

export class SetLoading {
  /**
   * Generates an action that will set the loading state for the given state.
   * @param target The targeted state class
   * @param loading The loading state
   */
  constructor(target: Type<EntityState<any>>, loading: boolean) {
    return generateActionObject(EntityActionType.SetLoading, target, loading);
  }
}
