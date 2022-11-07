import * as React from 'react'
import { useState, useRef, useCallback } from 'react'

const ResponseCheck = () => {
    const [state, setState] = useState('waiting')
    const [message, setMessage] = useState('클릭해서 시작하세요.')
    const [result, setResult] = useState<number[]>([]) //빈 배열은 타입이 잡히지 않으므로 제너릭 사용해서 타입정해주기
    const timeout = useRef<number | null>(null)
    const startTime = useRef(0)
    const endTime = useRef(0)
    //ref를 쓰는 이유는 값이 바껴도 리렌더링 되지 않기 위해, 근데 current가 readOnly이면?
    //ref의 종류는 세 가지가 있기 때문에 generic이나 매개변수 등의 차이를 보고 원하는 ref에 맞추면 된다

    const onClickScreen = useCallback(() => {
        if (state === 'waiting') {
            timeout.current = setTimeout(() => { //timeout.current 해야 나중에 clearTimeout 할 수 있음
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date().getTime();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
        } else if (state === 'ready') { // 성급하게 클릭
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date().getTime();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    }, [])

    const onReset = useCallback(() => {
        setResult([]); //매개변수가 없다면 꼭 타입 설정을 하지 않아도 된다.
    }, []);

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </> //jsx에 들어갈 함수를 빼서 return 위에도 jsx 문법 사용 가능
    };

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheck;