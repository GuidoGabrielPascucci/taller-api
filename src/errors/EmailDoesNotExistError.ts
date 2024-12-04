export class EmailDoesNotExistError extends Error {
    constructor() {
        const msg = 'Email does not exist'
        // const name = 'EmailDoesNotExistError'
        super(msg)
    }
}