import IObject from 'Shared/DTOs/IObject';

class EnumToArray {
  public execute(enumObj: IObject): string[] {
    return Object.values(enumObj);
  }
}

export default EnumToArray;
