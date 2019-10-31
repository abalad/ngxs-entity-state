/*
    MIT License

    Copyright (c) 2017 Temainfo Sistemas

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/
export class NgxsEntityStateAdapter {

  static addAll( collection: any[], context,  keyField = 'id' ) {
    const entities = collection.reduce(( object, item ) => {
      object[item[keyField]] = item;
      return object;
    }, {});
    context.patchState( {
      ...context.getState(),
      entities: entities
    });
  }

  static addOne( entity: any, context, keyField = 'id' ) {
    context.patchState({
      ...context.getState(),
      entities: {
        ...context.getState().entities,
        [entity[keyField]]: entity
      }
    });
  }

  static updateOne( entity: any, context, keyField = 'id' ) {
    context.patchState({
      entities: {
        ...context.getState().entities,
        [entity[keyField]]: {
          ...entity
        }
      }
    });
  }
  
  static upsertOne( entity: any, context, keyField = 'id' ) {
    if (entity[keyField]) {
     return NgxsEntityStateAdapter.updateOne( entity, context, keyField);
    }
  
    return NgxsEntityStateAdapter.addOne( entity, context, keyField);
  }

  static removeOne( entity: any, context, keyField = 'id' ) {

    const entityCloned = Object.assign({}, context.getState().entities);
    delete entityCloned[entity[keyField]];

    context.patchState({
      ...context.getState(),
      entities: {
        ...entityCloned,
      }
    });
  }

  static select( entity: any, context ) {
    context.patchState({
      selected: entity
    });
  }

  static startLoading( context ) {
    context.patchState({
      isLoading: true
    });
  }

  static stopLoading( context ) {
    context.patchState({
      isLoading: false
    });
  }

  static reset( context ) {
    context.patchState({
      ids: [],
      entities: {},
      selected: null
    });
  }
}
