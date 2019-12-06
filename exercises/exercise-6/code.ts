export interface HungerState {
  readonly name: string;
  readonly sleep?: () => HungerState;
  readonly eatSnack?: () => HungerState;
  readonly eatMeal?: () => HungerState;
}

export class Starving implements HungerState {
  readonly name = "starving";
  eatSnack() { return new Hungry() };
  eatMeal() { return new Full() };
}

export class Hungry implements HungerState {
  readonly name = "hungry";
  eatSnack() { return new  Peckish(); }
  eatMeal() { return new Full() };
}

export class Peckish implements HungerState {
  readonly name = "peckish";
  eatSnack() { return new Full() };
}

export class Full implements HungerState {
  readonly name = "full";
  sleep() { return new Starving() }
}

export enum Transition {
    SNACK = "SNACK",
    MEAL = "MEAL",
    SLEEP = "SLEEP"
}

export function quickestRouteToSleep(state: HungerState): Transition[] {
  return [];
}
