import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counterSlice";

const Counter = () => {

    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <div className="bg-gray-900 w-full min-h-screen">
            <div className="flex justify-center">
                <div className="mt-5">
                    <button className="text-gray-900 rounded-lg bg-gray-300 p-1 text-3xl"
                    onClick={() => dispatch(increment())}>
                        +
                    </button>

                    <p className="text-white ml-1 my-3 font-mono text-3xl">{ count }</p>

                    <button className="text-gray-900 rounded-lg bg-gray-300 p-1 text-3xl"
                    onClick={() => dispatch(decrement())}>
                        -
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Counter