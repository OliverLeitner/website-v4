export class Title {
  public cleanedTitle: string = "not set";
  constructor(
    public id: number,
    public Title: string,
    public hidden: boolean = false
  ) {
    return this;
  }

  copy(obj: Title): Title {
    return obj as Title;
  }
}
