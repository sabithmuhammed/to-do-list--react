import { Progress } from "antd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useEffect, useState } from "react";
import NewTask from "./NewTask";
import TaskCard from "./TaskCard";
import { useDarkMode } from "../context/DarkModeContext";

function ToDoList() {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("to-do-app")) ?? []
    );

    const [progress, setProgresss] = useState(0);
    const { isDarkMode } = useDarkMode();

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

    function handleOnDragEnd(result) {
        if (!result.destination) return; // If dropped outside the list, do nothing

        const reorderedItems = [...tasks];
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        setTasks(reorderedItems);
        writeToLocalStorage(reorderedItems);
    }

    return (
        <div className="w-full pt-2 px-3">
            <NewTask
                tasks={tasks}
                setTasks={setTasks}
                writeToLocalStorage={writeToLocalStorage}
            />

            <div className="mx-auto w-full md:w-[700px]  p-3 border-[1px] rounded-lg border-gray-300 dark:border-none dark:bg-[#282828] mt-3">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <Title level={5} className="dark:text-neutral-200">
                            My tasks
                        </Title>
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
                            trailColor={
                                isDarkMode ? "#3f3f3f" : "rgba(0, 0, 0, 0.16)"
                            }
                            strokeColor={isDarkMode ? "#164c7e" : "#1890ff"}
                            strokeWidth={20}
                        />
                    </div>
                    {tasks.length ? (
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="todoList">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {tasks.map((task, index) => (
                                            <Draggable
                                                key={task.title + index}
                                                draggableId={task.title + index}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided
                                                                .draggableProps
                                                                .style,
                                                        }}
                                                        className="mb-3"
                                                    >
                                                        <TaskCard
                                                            task={task}
                                                            setTasks={setTasks}
                                                            tasks={tasks}
                                                            writeToLocalStorage={
                                                                writeToLocalStorage
                                                            }
                                                            index={index}
                                                            key={
                                                                task.title +
                                                                index
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : (
                        // tasks.map((task, index) => (
                        //     <TaskCard
                        //         task={task}
                        //         setTasks={setTasks}
                        //         tasks={tasks}
                        //         writeToLocalStorage={writeToLocalStorage}
                        //         index={index}
                        //         key={task.title + index}
                        //     />
                        // ))
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
