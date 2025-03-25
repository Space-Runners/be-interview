export class FontMakerRequest {
  public text: string;
  public styleId: number;
  public numSamples?: number = 3;
}

export class FontMakerResponse {
  public id: string;
  public url: string;
  public styleId: number;
  public createdAt: Date;
}
