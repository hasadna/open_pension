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
  } catch ({name, errors, message}) {

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
 * @param {Conditions} conditions - the conditions to filter the users by.
 *
 * @throws {Error} When none of the arguments was passed.
 */
export async function getObject(entityModel: Model<any>, {id, conditions}: GetEntityArguments) {

  if (id) {
    return entityModel.findById({_id: id});
  }

  if (conditions) {
    return entityModel.find(conditions);
  }

  throw new Error('You need to pass an ID or conditions');
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
