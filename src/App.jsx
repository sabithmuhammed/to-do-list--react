import { Flex, Spin } from "antd";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { useDarkMode } from "./context/DarkModeContext";
const ToDoList = lazy(() => import("./components/ToDoList"));

function App() {
    const { isDarkMode } = useDarkMode();
    return (
        <Suspense
            fallback={
                <Flex
                    align="center"
                    justify="center"
                    gap="middle"
                    className="w-full h-dvh"
                >
                    <Spin size="large" />
                </Flex>
            }
        >
            <div className="h-dvh w-full overflow-auto  dark:bg-[#121212]">
                <Navbar />
                <ToDoList />
            </div>
        </Suspense>
    );
}

export default App;
