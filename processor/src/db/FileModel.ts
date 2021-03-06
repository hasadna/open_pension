import connect from "./mongoose";

export const StatusNew = 'new';
export const StatusProcessed = 'processed';
export const StatusProcessedWithErrors = 'processed with errors';

export const File = {
    filename: String,
    status: String,
    results: Object,
    storageId: Number,
    parsingErrors: [String],
    createdAt: {type: Date, default: new Date()},
}

export const FileModel = connect.model('file', File);
