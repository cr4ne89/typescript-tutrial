import axios from 'axios'
export {};

// boolean
let isFinished: boolean = true;
console.log(isFinished)

// number
let year: number = 2023;
console.log(year)

// string
let name: string = 'cr4ne';
console.log(name)

// Array
let numbers1: number[] = [1, 2, 3];
let numbers2: Array<number> = [1, 2, 3]; // generics
let strings1: string[] = ["A", "B", "C"];
let twoDArray: number[][] = [
  [50, 100],
  [150, 300]
];
let multiArray: (string | number | boolean)[] = [1, false, 'A']; // 共用体型(union)

// Tuple
let profile1: (string | number)[] = ["cr4ne", 31]; // union型だと型の順序を指定できない
let profile2: [string, number] = ["cr4ne", 31]; // tuple型にすることで型の順序を指定できる
 
// any
let url: string = "https://udemy-utils.herokuapp.com/api/v1/articles?token=token123";

axios.get(url).then(function(response) {
  let data: any = response.data; // どんな型でも入る
  console.log(data);
})

axios.get(url).then(function (response) {
  interface Article {
    id: number;
    title: string;
    description: string;
  }
  let data: Article[] = response.data; // interfaceで型を定義することができる
  console.log(data);
});

// void
function returnNothing(): void {
  console.log("I don't return anything!")
}
console.log(returnNothing());

// null
let absence: null = null;

// undefined
let data: undefined = undefined;

// Type Aliases
type Profile = {
  name: string;
  age: number;
}

const example1: Profile = {
  name: 'cr4ne',
  age: 31
}
type Profile2 = typeof example1; // 作成した型を抽出して、別の型を作成できる

// interface
interface ObjectInterface {
  name: string;
  age: number;
}
let object: ObjectInterface = {
  name: "cr4ne",
  age: 31,
};

// intersection
// 既存の型を再利用する
type Pitcher1 = {
  throwingSpeed: number;
};

type Batter1 = {
  battingAverage: number;
};

const Daru: Pitcher1 = {
  throwingSpeed: 160
}

const Ichiro: Batter1 = {
  battingAverage: 0.5
}

type TwoWayPlayer = Pitcher1 & Batter1;

const Otani: TwoWayPlayer = {
  throwingSpeed: 165,
  battingAverage: 0.7
}

// union
let value: number | string = 1;
value = 'foo'

// Literal
let dayOfTheWeek: '日' | '月' | '火' = '日';
dayOfTheWeek = '月';
dayOfTheWeek = '火';

// enum
enum Months {
  January = 1, // 初期値を設定すると後続の数値も変わる
  February,
  March,
  April
}
console.log(Months.January);
console.log(Months.February);

// 関数に対する型定義
function bmi(height: number, weight: number): number {
  return weight / (height * height);
}
console.log(bmi(1.65, 53))

// 無名関数による関数定義
let bmi2 = function(height: number, weight: number): number {
  return weight / (height * height)
}
console.log(bmi2(1.65, 53))
// bmi3という変数には、(height: number, weight: number) => numberという関数しか代入できなくなる
//  bmi2は型を定義せずに関数を代入しているが、bmi3は先に型を定義している点に注目する
let bmi3: (height: number, weight: number) => number = function(
  height: number,
  weight: number
): number {
  return weight / (height * height);
};
console.log(bmi3(1.65, 53));

// アロー関数による関数定義
let bmi4 = (height: number, weight: number): number => {
  return weight / (height * height);
}
console.log(bmi4(1.65, 53));
// bmi5という変数には、(height: number, weight: number) => numberという関数しか代入できなくなる
//  bmi4は型を定義せずに関数を代入しているが、bmi5は先に型を定義している点に注目する
let bmi5: (height: number, weight: number) => number = (
  height: number,
  weight: number
): number => weight / (height * height);
console.log(bmi5(1.65, 53))

// オプショナルパラメーター
let bmi6: (height: number, weight: number, printable?: boolean) => number = (
  height: number,
  weight: number,
  printable?: boolean
): number => {
  let bmi: number = weight / (height * height);
  if (printable) {
    console.log('bmi: ' + bmi);
  }
  return bmi
}
bmi6(1.65, 53, true);
bmi6(1.65, 53, false);
bmi6(1.65, 53);

// デフォルトパラメーター
const nextYearSalary = (currentSalary: number, rate: number = 1.1): number => {
  return currentSalary * rate;
}
console.log(nextYearSalary(1000, 1.05))
console.log(nextYearSalary(1000));

// Restパラメーター
// sumという変数には、(...values: number[]) => numberという関数しか代入できなくなる
const sum: (...values: number[]) => number = (...values: number[]) => {
  return values.reduce(
    (total: number, current: number): number => total + current
  );
};
console.log(sum(1, 2, 3, 4, 5));

// オーバーロード
function double(value: number): number;
function double(value: string): string;

// 型がanyであっても、オーバーロードしているのでnumberとstring以外の型は利用できない
function double(value: any): any {
  if (typeof value === 'number') {
    return value * 2
  } else if (typeof value === 'string') {
    return value + value
  } else {
    throw 'numberでもstringでもない'
  }
}
console.log(double(100))
console.log(double('Go '));

// クラスを利用した型定義
class Person {
  public name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // コンストラクタでメンバ変数の宣言と初期化処理をすることもできる
  // constructor(public name: string, protected age: number) {}

  // profile(): string {
  //   return `name: ${this.name}, age: ${this.age}`;
  // }

  // () => string が関数の型定義(profileにはこの形式の関数しか入らない)
  // (): string => XXX は関数の実態(stringは返り値の型を指す)
  // stringが重複していて少し戸惑うポイント
  profile: () => string = (): string => `name: ${this.name}, age: ${this.age}`;
}
let taro = new Person('cr4ne', 31)
console.log(taro.profile());
console.log(taro.name)
// console.log(taro.age)

// 名前空間を利用すると同じクラス名を利用できる
namespace OtherSpace {
  export class Person {
    constructor(public name: string) {
    }
  }
}
const me = new OtherSpace.Person('cr4ne')
console.log(me)


// 継承
class Animal {
  constructor (public name: string) {}

  run(): string {
    return 'I can run'
  }
}

class Lion extends Animal {
  public speed: number;
  constructor(name: string, speed: number) {
    super(name)
    this.speed = speed;
  }

  run(): string {
    return `${super.run()} ${this.speed}km.`;
  }
}

let animal = new Animal('Mickey');
console.log(animal.run())

let lion = new Lion('Simba', 80);
console.log(lion.run())

// 抽象
abstract class AbstractAnimal {
  abstract cry(): string;
}

class LionImpl extends AbstractAnimal {
  cry(): string {
    return 'roar'
  }
}

class Tiger extends AbstractAnimal {
  cry(): string {
    return 'grrrr'
  }
}

// インターフェイス
interface Kenja {
  ionazun(): void;
}
interface Senshi {
  kougeki(): void;
}
class KenjaSenshi implements Kenja, Senshi {
  ionazun(): void {
    console.log('100ダメ')
  }
  kougeki(): void {
    console.log('30ダメ')
  }
}
const jiro = new KenjaSenshi();
jiro.ionazun()
jiro.kougeki()

// 型の互換性
let fooCompatible: any;
let barCompatible: string = 'TypeScript';
fooCompatible = barCompatible; // any型にstring型は代入できる(互換性がある)

// 構造的部分型
// シグネチャとして実装していなくても、持っているメンバ変数の型が同じであれば同じ型とみなすという性質(Javaなどは明示的な継承関係を定義する必要がある公称型である)
interface AnimalIF {
  age: number;
  name: string;
}
class Person2 {
  constructor(public age: number, public name: string) {}
}
let me2: AnimalIF;
me2 = new Person2(31, 'cr4ne')

// ジェネリクス
const echo = <T>(arg: T): T => {
  return arg;
}
console.log(echo<number>(100))
console.log(echo<string>('Hello'))
console.log(echo<boolean>(true));

class Mirror<T> {
  constructor(public value: T) {}
  echo(): T {
    return this.value;
  }
}
console.log(new Mirror<number>(123).echo())
console.log(new Mirror<string>('test').echo());
console.log(new Mirror<boolean>(true).echo());

// インデックスシグネチャ
interface ProfileSignature {
  [k: string]: string | number;
}
let profileSignature: ProfileSignature;
profileSignature = {
  name: "cr4ne",
  age: 31,
  nationality: "Japan"
};
console.log(profileSignature)

