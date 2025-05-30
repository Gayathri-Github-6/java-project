import { useState,useEffect } from "react";
import {useTypewriter,Cursor} from 'react-simple-typewriter';
import {Link} from 'react-router-dom';
import EmployeeService from "../services/EmployeeService";
import EmployeeModal from './EmployeeModal';
function EmployeeListComponent()
{
    const [employees,setEmployees] = useState([]);

    const [selectedEmployee,setSelectedEmployee]=useState(null);
    const [text] = useTypewriter({
        words:["Details", "Info", "List"],
        loop:true,
        typeSpeed:120,
        deleteSpeed:80
    })

    useEffect((e)=>{
        EmployeeService.getAllEmployees().then(res=>{
            setEmployees(res.data);
        })
    },[])

    const deleteEmployee=(id)=>{
        EmployeeService.deleteEmployee(id).then(res=>{
            EmployeeService.getAllEmployees().then(res=>{
                setEmployees(res.data)
			}).catch(error=>{
                console.log(error);
            })
        })
    }

    const viewEmployee = (employeeId) => {
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) 
        {
        	setSelectedEmployee(employee); // Set the selected employee to show in modal
        }
        else 
        {
    		alert('Employee not found');
    	}
    }

    const closeModal = () => {
    	setSelectedEmployee(null); // Close modal by resetting selected employee
    };

    return(
        <div className="container mt-5">
            <h4 className="text-center"> Employee {text}<Cursor/></h4>
            <div className="row mt-5">
                <Link to="/add-emp" className="btn btn-warning w-25 mb-2">Add Employee</Link>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>DOJ</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(employee =>{
                                return <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.doj}</td>
                                    <td>{employee.dept.deptName}</td>
                                    <td>{employee.dept.designation}</td>
                                    <td>
    <Link to ={`/update-emp/${employee.id}`} className="btn btn-secondary">Update</Link>
    <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={()=>deleteEmployee(employee.id)}>Delete</button>
    <button className="btn btn-success" style={{marginLeft:"10px"}} onClick={()=>viewEmployee(employee.id)}>View</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <EmployeeModal 
                employee={selectedEmployee} 
                closeModal={closeModal} 
            />
        </div>
    )
}
export default EmployeeListComponent;