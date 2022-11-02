// TS에서 가장 중요한 파일 1. package.json 2. tsconfig.json
//  설치 순서
// 1. npm init -y  
// 2. npm i typescript
// 3.  npx tsc 자바스크립트로 변환
// 4. npx tsc --init   tsconfig.json 파일 생성
// 5. npx tsc --noEmit 타입 확인

// 변수 선언
const a: string = '5';
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const f: symbol = Symbol.for('abc'); //es2015
// const g: bigint = 100000n;
const h: any = true; //모든 타입이 가능함. 하지만  any를 사용하면 ts를 사용하는 의미가 없기 때문에 되도록이면 사용 지양
const i: true = true //고정된 원시값 할당 가능 i:5 = 5 이렇게도

// 강제로 변수 타입 바꾸기
let aa = 123;
aa = 'hi' as unknown as number;

// 함수
function add1(x: number, y: number): number { return x + y } // 타입 선언하는 자리가 헷갈릴 수 있으니 주의

// function minus(x: number, y: number): number;
// function minus(x, y) {
//     return x + y; // 이렇게 타입 선언 따로 함수 따로 가능
// }

// 화살표 함수
const add2: (x: number, y: number) => number = (x, y) => x + y; //: 뒤를 생략하고 봤을 때 JS로 동작되는 코드여야 함
// const addXY = (x, y) => x + y;  이렇게 생각하면 되겠죠


// type alias : 화살표 함수를 쓰는 다른 방법
type Add = (x: number, y: number) => number //function 일 때와 화살표 함수 일 때 화살표 위치 다름 주의
const add3: Add = (x, y) => x + y;

// interface : TS의 핵심
interface Add4 {
    (x: number, y: number): number;
}

const add4: Add4 = (x, y) => x + y;

// 객체
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 27.5 };

// 배열
const arr: string[] = ['123', '456']
const arr2: number[] = [123, 456]

//제네릭 : TS 의 핵심
const arr3: Array<number> = [123, 456]

//튜플
const arr4: [number, number, string] = [123, 456, 'hi']

//타입 추론
// TS는 알아서 타입 추론을 해주기 때문에  타입 추론이 가능할 경우 굳이 타입 선언을 할 필요 없다. 
// 함수에서 리턴값은 타입 선언 하지 안아도 되지만 매개변수 값은 꼭 선언하는게 좋다.
// 추론이 잘못됐을 경우 직접 타입선언 해주기 예) any 일 경우
const A = '5';

// never
try {
    const array = []; // noImplicitAny가 false일 때
    array.push('hello')
} catch (error) {
    error;
}

// ! 대신 if 사용하기
// string 과 String은 다르다
// type custom
type World = "World" | "Hell"
const Hi: World = "World"

//템플릿 리터럴 타입 type greeting -> 자동완성 기능을 쓸 때 유용함
type Greeting = `hello ${World}`

// rest
let apple: string[] = [];
let apple2: Array<string> = [];
function rest(a: number, ...args: string[]) {
    console.log(a, args) // return 1, [2,3]
}
rest(1, '2', '3')

// tuple
const tuple: [string, number] = ['1', 1];
// 숫자가 고정되어 있을 때 3번째 값을 넣으려고 하면 에러가 나지만 push는 가능한.. 단점
// tuple[2] = 'hello';
tuple.push('hello');

// enum 여러개의 변수를 하나의 그룹으로 묶고 싶을 때 사용. js로 변환시 사라짐
const enum EDirection {
    Up, //0번째
    Down, //1번째
    Left, //2번째
    Right, //3번째
}
//  enum 대신 객체로 묶은 경우, js로 변환시 사라지지 않음
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
} as const; // as const를 넣으면 정확한 타입 추론 +readonly까지 

EDirection.Up;

// (enum member) EDirection.Up = 0

// ODirection.Up;

// (property) Up: 0

// Using the enum as a parameter
function walk(dir: EDirection) { } //dir 네 개 값 중 하나

// It requires an extra line to pull out the keys enum  // enum 쓰지 않을 때 밸류값 가져오기
type Direction = typeof ODirection[keyof typeof ODirection]; // 이렇게 하면 value값만 가져오게 됨
function run(dir: Direction) { }

// 객체에서 타입 (key)값만 가져오고 싶을 때
const Obj = {a: 1, b: 2, c: 3}
type key = keyof typeof Obj

walk(EDirection.Left);
run(ODirection.Right);

// type과 interface, 상속
// 보통 타입은 간단하게 사용할 때? 그리고 마음대로 값을 끼워넣을 수 있음
// interface는 상속(또는 확장?)의 개념이 명확하고 객체지향이 가능하다. type과 interface 간에 상속? 도 가능함, 같은 이름으로 여러번 선언가능, 계속해서 합쳐짐

// union | 과 intersection &
// union은 둘 중 하나만 만족하면 되고, &는 전부 다 만족시켜야 한다.

// naming rule
// 1. interface I, type T, enum E
// 2. 대문자 안 붙이고 사용하기
