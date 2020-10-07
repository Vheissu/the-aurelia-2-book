export class Missing {
  public static parameters = ['id'];
  public missingComponent: string ;

  public load(parameters) {
    this.missingComponent = parameters.id;
  }
}
