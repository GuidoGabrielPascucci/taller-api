export class PasswordDoesNotMatchError extends Error {
    constructor() {
        const msg = 'Password does not match'
        super(msg)
    }
}