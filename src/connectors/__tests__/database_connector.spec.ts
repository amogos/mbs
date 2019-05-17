import databaseConnector, { booksArray } from './../firebase_connector'
import waitForExpect from 'wait-for-expect'

describe('Running database flow', () => {
    it('Should be well configured and bring data', async () => {
        const callbacks = {
            one() {
            },
        };
        var spy = jest.spyOn(callbacks, 'one');
        databaseConnector.querryBooks(callbacks.one);
        await waitForExpect(() => {
            expect(spy).toBeCalled();
        });
    })
})