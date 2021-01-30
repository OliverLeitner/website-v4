export class Contact {
    constructor(
        public name?: string,
        public email?: string,
        public url?: string,
        public message?: string,
        public token?: string
    ) {
        return this;
    }
}