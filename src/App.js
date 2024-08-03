
import React from "react";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState({ id: '', name: '',email:'',phone:'',address:'',age:'' });
  const [message, setMessage] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
// const handleChange = (e)=>{
// setUser({
//   ...user,[e.target.name]:[e.target.value]
// });
// };
  React.useEffect(() => {
    fetch("/userapi")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // const item = data.find(item => item.id === 1);
        if (Array.isArray(data)) {
          setData(data);
          setUser(data);
        } else {
          throw new Error("Data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/userapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Failed to add user');
        }
      })
      .then(data => {
        console.log('Success:', data);
        setMessage('User added successfully');
        // Optionally clear the form
        setUser({ id: '', name: '',email:'',address:'',phone:'',age:'' });
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Error adding user');
      });
  };

  const handleDelete = (id) => {

    fetch(`http://localhost:3000/userapi/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
          setMessage('User deleted successfully');
          // setUser(user.filter(user => user.id !== id));
          setData(data.filter(user => user.id !== id));

        } else {
          throw new Error('Failed to delete user');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Error deleting user');
      });
  };

  return (
    
    <div className="App">
     
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header> */}
      
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={user.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}

      <h1>User List</h1>
      {data.length > 0 ? (
        <ul>
          {data.map(user => (
            
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => handleDelete(user.id)}>Delete</button>

            </li>
          ))}
        </ul>
      ) : (
        <p>No users available</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

