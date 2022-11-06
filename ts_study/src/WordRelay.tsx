import * as React from "react"
import { useState, useRef, useCallback } from "react"

const WordRelay = () => {
    const [word, setWord] = useState<string>('나오미');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = useRef<HTMLInputElement>(null)

    const onSubmitForm = useCallback<(e: React.FormEvent) => void>((e) => {
        e.preventDefault();
        const input = inputEl.current;
        if (word[word.length - 1] === value[0]) {
            setResult('정답');
            setWord(value);
            setValue('');
            if (input) {
                input.focus();
            }
        } else {
            setResult('땡');
            setValue('');
            if (input) {
                input.focus()
            }
        }
    }, [value, word])
    //useCallback으로 함수 감쌀 때 타입추론 안될 수 있음 -> generic 사용시 가독성 떨어질 수 있으니 되도록 함수는 빼서 사용
    
    //generic 사용 안 한 버전
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, [])

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    ref={inputEl}
                    value={value}
                    onChange={onChange}
                />
                <button>send</button>
            </form>
            <div>{result}</div>
        </>
    )
}

export default WordRelay;