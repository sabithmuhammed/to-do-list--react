import { Progress } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useEffect, useState } from "react";
import NewTask from "./NewTask";
import TaskCard from "./TaskCard";

function ToDoList() {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("to-do-app")) ?? []
    );

    const [progress, setProgresss] = useState(0);

    useEffect(() => {
        const newProgress = tasks.reduce(
            (acc, task) => (task.check ? acc + 1 : acc),
            0
        );
        setProgresss(newProgress);
    }, [tasks]);

    function writeToLocalStorage(data) {
        localStorage.setItem("to-do-app", JSON.stringify(data));
    }

    return (
        <div className="w-full pt-10 px-3">
            <NewTask
                tasks={tasks}
                setTasks={setTasks}
                writeToLocalStorage={writeToLocalStorage}
            />

            <div className="mx-auto w-full md:w-[700px]  p-3 border-[1px] rounded-lg border-gray-300 mt-3">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <Title level={5}>My tasks</Title>
                        <Progress
                            type="circle"
                            percent={Math.round(
                                (progress / tasks.length) * 100
                            )}
                            size={"small"}
                            steps={{
                                count: tasks.length,
                                gap: 5,
                            }}
                            trailColor="rgba(0, 0, 0, 0.16)"
                            strokeWidth={20}
                        />
                    </div>
                    {tasks.length ? (
                        tasks.map((task, index) => (
                            <TaskCard
                                task={task}
                                setTasks={setTasks}
                                tasks={tasks}
                                writeToLocalStorage={writeToLocalStorage}
                                index={index}
                                key={task.title + index}
                            />
                        ))
                    ) : (
                        <Text className="text-center">
                            No pending tasks, try adding some!
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ToDoList;
