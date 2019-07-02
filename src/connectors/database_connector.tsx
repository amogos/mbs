import * as DataTypes from '../types';

export default interface DatabaseConnector {
    getBooks(): Promise<DataTypes.BookRecordType[]>;
}
