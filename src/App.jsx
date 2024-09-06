import { Flex, Spin } from "antd";
import { lazy, Suspense } from "react";
const ToDoList = lazy(() => import("./components/ToDoList"));

function App() {
    return (
        <Suspense
            fallback={
                <Flex align="center"  justify="center" gap="middle" className="w-full h-dvh">
                    <Spin size="large" />
                </Flex>
            }
        >
            <ToDoList></ToDoList>;
        </Suspense>
    );
}

export default App;
