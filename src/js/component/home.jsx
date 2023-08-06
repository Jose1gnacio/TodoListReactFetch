import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {

	const [task, newTask] = useState({});
	const [taskList, setTaskList] = useState([]);

	const getApi = () => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		fetch(
			"https://playground.4geeks.com/apis/fake/todos/user/josealvarez",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				if (result.msg) {
					postApi();
				} else {
					setTaskList(result);
				}

			})
			.catch((error) => console.log("error", error));
	};
	const postApi = () => {
		var raw = JSON.stringify([]);
		var requestOptions = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: raw,
			redirect: 'follow'
		};
		fetch("https://playground.4geeks.com/apis/fake/todos/user/josealvarez", requestOptions)
			.then((response) => {
				response.json();
			})
			.then((result) => {
				getApi();
				console.log(result);
			})
			.catch(error => console.log('error', error));
	}

	useEffect(() => {
		getApi();
	}, []);

	const putApi = (newTaskList) => {
		var raw = JSON.stringify(newTaskList);
		var requestOptions = {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: raw,
			redirect: 'follow'
		};

		fetch("https://playground.4geeks.com/apis/fake/todos/user/josealvarez", requestOptions)
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	};

	const validateTask = () => {
		if (task === "") {
			alert("ADD TASK");
			return false;
		} else {
			return true;
		}
	};
	const deleteTask = (index) => {
		let newTaskList = taskList.filter((e, i) => i !== index);
		setTaskList(newTaskList);
		putApi(newTaskList);
	};

	return (
		<div className="todoList">
			<header>
				<h1>
					<strong>TODO LIST</strong>
				</h1>
			</header>
			<form
				className="todoForm"
				onSubmit={(e) => {
					e.preventDefault();
					if (validateTask()) {
						let newTaskList = [...taskList, task];
						setTaskList(newTaskList);
						putApi(newTaskList);
						newTask(
							{
								"done": false,
								"label": ""
							}
						);
					}
				}}
			>
				<div className="inputTask">
					<input
						type="text"
						className="form-control inputArea"
						placeholder="Add Task!"
						onChange={(e) => {
							newTask(
								{
									"done": false,
									"label": (e.target.value)
								}
							);

						}}
						value={task.label}
					/>
				</div>
				<div className="submitTask">
					<button type="submit" className="btn btn-primary mb-3">
						Confirm Task
					</button>
				</div>
			</form>
			<table>
				{taskList.length > 0 && (
					<thead>
						<tr>
							<th className="number">N°</th>
							<th className="task">TASK</th>
							<th className="delete">DELETE</th>
						</tr>
					</thead>
				)}
				<tbody>
					{taskList.length > 0 &&
						taskList.map((e, i) => (
							<tr key={(i + 1)}>
								<td>{(i + 1)}</td>
								<td>{e.label}</td>
								<td>
									<strong>
										<button className="btn" onClick={() => deleteTask(i)}>
											<i className="fa-solid fa-trash-can"></i>
										</button>
									</strong>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<div className="text-center">
				<p>
					<strong>
						{taskList.length === 0
							? "Add Task"
							: `${taskList.length} missing tasks`}
					</strong>
				</p>
			</div>
		</div>
	);
};

export default Home;
