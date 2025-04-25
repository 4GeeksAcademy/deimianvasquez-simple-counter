import { useState, useEffect, useRef } from "react"

export const SecondsCounter = () => {

    const [counter, setCounter] = useState(0)
    const [isRunning, setIsRunning] = useState(true)
    const [countReverse, setCountReverse] = useState(0);
    const [runReversedCounter, setRunReversedCounter] = useState(false);
    const [error, setError] = useState(false)


    const intervalId = useRef(null)

    const startCounter = () => {
        if (!isRunning) return;

        if (intervalId.current) {
            clearInterval(intervalId.current);
        }

        intervalId.current = setInterval(() => {
            setCounter((prev) => {
                if (runReversedCounter) {
                    if (prev <= 1) {
                        clearInterval(intervalId.current);
                        setIsRunning(false);
                        setRunReversedCounter(false);
                        return 0;
                    }
                    return prev - 1;
                }
                return prev + 1;
            });
        }, 400);
    };

    const stopRunning = () => {
        setIsRunning((prev) => !prev)
        if (intervalId.current) {
            clearInterval(intervalId.current)
        }
    }

    const restarCounter = () => {
        setCounter(() => 0)
        if (isRunning) {
            stopRunning()
        }
    }

    const countDown = () => {
        if (countReverse < 1) {
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 2000)
            return

        }

        setCounter(countReverse)
        setRunReversedCounter(true)
        setIsRunning(true)

    }

    useEffect(() => {
        startCounter();
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [isRunning, runReversedCounter]);

    return (
        <>
            <div className="container-fluid counter">
                <div className="row">
                    <div className="col-12">
                        <div className="counter__numbers">
                            <div>
                                <i className="far fa-clock"></i>
                            </div>
                            <div>
                                {Math.floor((counter / 1000) % 10)}
                            </div>
                            <div>
                                {Math.floor((counter / 100) % 10)}
                            </div>
                            <div>
                                {Math.floor((counter / 10) % 10)}
                            </div>
                            <div>
                                {Math.floor((counter / 1) % 10)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-5">
                        <div className="d-flex gap-3 justify-content-center border rounded p-3">
                            <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={stopRunning}
                            >
                                {isRunning ? "Stop" : "Start"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => restarCounter()}
                            >
                                Restart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-12">
                        <div className="p-3 border rounded">
                            <label>Cuenta regreviva</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Ingrese el tiempo"
                                name="countReverse"
                                value={countReverse}
                                onChange={(event) => setCountReverse(Number(event.target.value))}
                            />
                            <button
                                className="btn btn-outline-primary mt-3 w-100"
                                onClick={() => countDown()}
                            >Centa regresiva </button>
                        </div>
                        {
                            error &&

                            <div className="alert alert-danger mt-3">
                                Para la cuenta regresiva debe ser mayor a 1
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}