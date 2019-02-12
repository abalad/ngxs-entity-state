import { StateContext } from '@ngxs/store';
import { EntityStateModel } from './models';
import { Add, ClearActive, CreateOrReplace, Remove, Reset, SetActive, SetError, SetLoading, Update } from './actions';
import { Type } from '@angular/core';
import { EntityState } from './entity-state';
import { EntitySelector, Updater } from './actions/type-alias';

export class EntityStateAdapter {

  /**
   * Replace current collection with provided collection
   */
  static addAll<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, payload: T | T[] ) {
    ctx.dispatch( new Add( target, payload) );
  }

  /**
   * Add one entity to the collection
   */
  static addOne<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, payload: T | T[] ) {
    ctx.dispatch( new CreateOrReplace( target, payload) );
  }

  /**
   * Add multiple entities to the collection
   */
  static addMany<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, payload: T | T[] ) {
    ctx.dispatch( new CreateOrReplace( target, payload) );
  }


  /**
   * Remove one entity from the collection
   */
  static removeOne<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, payload: EntitySelector<T> ) {
    ctx.dispatch( new Remove( target, payload) );
  }

  /**
   * Clear entity collection
   */
  static removeAll<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>> ) {
    ctx.dispatch( new Remove( target, null) );
  }

  /**
   * Update one entity in the collection
   */
  static updateOne<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, payload: Updater<T> ) {
    ctx.dispatch( new Update( target, payload['id'], payload) );
  }

  /**
   * Update multiple entities in the collection
   */
  static updateMany<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, payload: Updater<T>  ) {
    ctx.dispatch( new Update( target, payload['id'], payload) );
  }

  /**
   * Add or Update one entity in the collection
   */
  static upsertOne<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, payload: T | T[] ) {
    ctx.dispatch( new CreateOrReplace( target, payload) );
  }

  /**
   * Add or Update multiple entities in the collection
   */
  static upsertMany<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, payload: T | T[] ) {
    ctx.dispatch( new CreateOrReplace( target, payload) );
  }

  static startLoading<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>> ) {
    ctx.dispatch( new SetLoading( target, true) );
  }

  static stopLoading<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>> ) {
    ctx.dispatch( new SetLoading( target, false) );
  }

  static setActive<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, id: string ) {
    ctx.dispatch( new SetActive( target, id ) );
  }

  static clearActive<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>> ) {
    ctx.dispatch( new ClearActive( target ) );
  }

  static reset<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>> ) {
    ctx.dispatch( new Reset( target ) );

  }
  static setError<T>(target: Type<EntityState<T>>, ctx: StateContext<EntityStateModel<T>>, error: Error | undefined ) {
      ctx.dispatch( new SetError( target, error ) );
    }
}
