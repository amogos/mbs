import * as DataTypes from '../types';

export default class JsonConnector {
    public constructor() {
        this.init();
    }

    private init() {}

    public async getBooks(onError: (resultCode: number) => void): Promise<DataTypes.BookRecordType[]> {
        var booksArray: DataTypes.BookRecordType[] = [];
        fetch('http://localhost:3001/books')
            .then(response => response.json())
            .then(async item => {
                let holder: DataTypes.UserType = DataTypes.nullUser;
                if (item.val().holder > 0) {
                    fetch('http://localhost:3001/users/' + item.val().holder)
                        .then(response => response.json())
                        .then(item => {
                            holder = { name: item.name, email: item.email };
                        });
                }

                let owner: DataTypes.UserType = DataTypes.nullUser;
                fetch('http://localhost:3001/users/' + item.val().owner)
                    .then(response => response.json())
                    .then(item => {
                        owner = { name: item.name, email: item.email };
                    });

                let language = '';
                fetch('http://localhost:3001/languages/' + item.val().language)
                    .then(response => response.json())
                    .then(item => {
                        language = item.language;
                    });

                let bookValue: DataTypes.BookValueType = {
                    title: item.val().title,
                    image: item.val().image,
                    author: item.val().author,
                    language: language,
                    owner: owner,
                    holder: holder,
                    state: item.val().state,
                };
                booksArray.push({
                    id: item.val().id,
                    value: bookValue,
                } as DataTypes.BookRecordType);
            })
            .catch(error => {
                onError(error);
            });
        return booksArray;
    }
}
