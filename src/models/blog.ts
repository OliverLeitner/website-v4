import { Image } from "./image";

export class Blog {
    public cleanedTitle: string = "not set";
    constructor(
        public id: number,
        public Title: string,
        public Subtitle: string,
        public Description: string,
        public Tags: string,
        public Content: string,
        public HtmlContent: string,
        public canonical_url: string,
        public identifier: string,
        public listimage: Image = null,
        public created_at: string,
        public updated_at: string,
        public publish_date: string
    ) {
        return this;
    }
}