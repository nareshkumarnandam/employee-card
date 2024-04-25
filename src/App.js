import React, { useReducer } from "react";
import './App.css';
import EmployeeCard from './components/EmployeeCard';
import reducer from "./reducer.js";
import employees from "./data.js";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    employeeList: employees,
    teamList: [],
  });

  function addEmployee(id) {
    // console.log(id);
    dispatch({ type: "add", payLoad: id });
  }

  function removeEmployee(id) {
    dispatch({ type: "remove", payLoad: id });
  }

  function averageAge(){
    if(state.teamList.length === 0){
        return 0
    }
    const totalAge = state.teamList.reduce((acc,current)=>{
        return acc + current.age
    },0);

    const averageAge = totalAge / state.teamList.length;

    return averageAge.toFixed(2)
  }

  function sortHandler(){
    dispatch({type: "sort"})
  }

  return (
    <div id="container">
      <div>
        <h2>Employees</h2>
        {state.employeeList.map((elem) => {
          return (
            <EmployeeCard
              key={elem.id}
              id={elem.id}
              name={elem.first_name}
              age={elem.age}
              isAdded={elem.isAdded}
              btnType="add"
              btnAction={addEmployee}
            />
          );
        })}
      </div>
      <div id="team-details-card">
        <div id="team-list-container">
            <h2>Team</h2>
            <button id="sorting-btn" onClick={sortHandler}>Sort by age</button>
            {state.teamList.map((elem) => {
            return (
                <EmployeeCard
                key={elem.id}
                id={elem.id}
                name={elem.first_name}
                age={elem.age}
                btnType="remove"
                btnAction={removeEmployee}
                />
            );
            })}
        </div>
        <div id="average-age-card">
            <p>Average Age : </p>
            <p>{averageAge()} </p>
        </div>
      </div>
    </div>
  );
}

export default App;
