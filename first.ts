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
const c:boolean = true;
const d: undefined =  undefined;
const f: symbol = Symbol.for('abc'); //es2015
// const g: bigint = 100000n;
const h: any = true; //모든 타입이 가능함. 하지만  any를 사용하면 ts를 사용하는 의미가 없기 때문에 되도록이면 사용 지양
const i: true = true //고정된 원시값 할당 가능 i:5 = 5 이렇게도

// 강제로 변수 타입 바꾸기
let aa = 123;
aa = 'hi' as unknown as number; 

// 함수
function add1(x: number, y: number): number { return x + y} // 타입 선언하는 자리가 헷갈릴 수 있으니 주의

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
    (x: number, y: number) : number;
}

const add4: Add4 = (x, y) => x + y;

// 객체
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 27.5};

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
const A= '5';
