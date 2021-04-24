import {isEmpty} from 'lodash';
import { Model, ObjectId } from 'mongoose';

export type BaseEntity = {
  readonly _id?: ObjectId
}

type Error = {
  readonly path: string,
  readonly message: string;
};

export type TransactionResults = {
  readonly errors;
  readonly object;
};

export type Conditions = {
  readonly [field: string]: any
};

export type GetEntityArguments = {
  readonly id?: string;
  readonly conditions?: Conditions;
};

export type Pagination = {
  readonly itemsNumber?: number;
  readonly page?: number;
  readonly totalCount?: boolean;
};

export enum Operation {
  CONTAINS = "CONTAINS"
}

export type Filter = {
  readonly key?: string;
  readonly value?: any;
  readonly operation?: Operation
};

/**
 * Convert an error object to key value.
 *
 * @param errors - The error object for un-passed validations.
 */
export function convertErrorToObject(errors) {
  if (isEmpty(errors)) {
    return {};
  }

  const simplifiedErrors = {};

  Object.values(errors).forEach((error: Error) => {
    const {message, path} = error;

    // @ts-ignore
    simplifiedErrors[[path]] = message;
  });

  return simplifiedErrors;
}

/**
 * Creating an object in the DB.
 *
 * @param entityModel - The model object.
 * @param objectToInsert - The object to insert into the DB.
 */
export async function createObject(entityModel: Model<any>, objectToInsert: BaseEntity): Promise<TransactionResults> {
  try {
    const createdObject = await entityModel.create(objectToInsert);
    return {errors: null, object: createdObject};
  } catch (e) {
    const {name, errors, message} = e;

    if (name === 'MongoError') {
      return {errors: message, object: null};
    }

    return {errors: convertErrorToObject(errors), object: null}
  }
}

/**
 * Getting an object by ID
 *
 * @param entityModel - The model object.
 * @param {string} id - The id of the user.
 * @param {Conditions} conditions - The conditions to filter the users by.
 * @param {Pagination} pagination - Pagination for the items.
 * @param {Filter} filter - The filter params passed from GraphQL.
 *
 * @throws {Error} When none of the arguments was passed.
 */
export async function getObject(entityModel: Model<any>, {id, conditions}: GetEntityArguments, pagination: Pagination = {}, filter: Filter[] = []) {
  if (id) {
    return entityModel.findById({_id: id});
  }

  let collections, totalCount;
  let countParams = conditions;

  if (!isEmpty(filter)) {
    const filterParams = {}
    await filter.forEach(({key, value, operation}) => {
      if (!operation) {
        filterParams[key] = value;
      } else {

        if (operation == Operation.CONTAINS) {
          const regex = new RegExp(value, 'i')
          filterParams[key] = {$regex: regex};
        }
      }
    });

    collections = entityModel.find(filterParams);
    countParams = filterParams;
  } else {
    collections = entityModel.find(conditions);
  }

  totalCount = await entityModel.count(countParams);

  if (!isEmpty(pagination)) {
    const {itemsNumber, page} = pagination;
    collections = collections.limit(itemsNumber).skip(page * itemsNumber);
  }

  collections = collections.sort({'storageId': -1});

  return {collections, totalCount};
}

/**
 * Updating a record in the DB.
 *
 * @param entityModel - The model object.
 * @param id - The ID of the model.
 * @param newValues - The new values to apply.
 */
export async function updateObject(entityModel: Model<any>, id, newValues) {
  return entityModel.findOneAndUpdate({_id: id}, newValues, {new: true})
}
