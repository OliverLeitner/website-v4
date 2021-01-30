import { Contact } from '../models/contact';
import { env } from '../environment';

"use strict";

export class Mail {
    protected mail_interface: string = env.MAIL_INTERFACE;
    constructor(
        public emailData?: Contact
    ) {
        return this;
    }

    public send() {
        let myRes = null;
        const url = this.mail_interface;
        const options: RequestInit = {
            method: 'POST',
            mode: "cors", // need this
            body: JSON.stringify(this.emailData),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url, options)
            .then((res) => {
                myRes = res.json()
            })
            .then(res => console.log(res));

        return myRes;
    }
}