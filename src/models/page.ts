import { Image } from "./image";

export class Page {
    constructor(
        public id: number,
        public Title: string,
        public Description: string,
        public Tags: string,
        public Textcontent: string,
        public HtmlContent: string,
        public created_at: string,
        public updated_at: string,
        public link: string,
        public Image: Image = null,
        public hidden: boolean = false
    ) {
        return this;
    }

    copy(obj: Page): Page {
        return obj as Page;
    }
}
