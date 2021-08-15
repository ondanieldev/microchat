import IObject from 'Shared/DTOs/IObject';

class FilterEntities {
  public execute(entity: IObject, data: IObject): boolean {
    let match = true;
    Object.entries(data).forEach(([key, value]) => {
      if (entity[key] !== value) {
        match = false;
      }
    });
    return match;
  }
}

export default FilterEntities;
