import React, {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import moment from 'moment';
import SearchBar from '@mkyy/mui-search-bar'
import { Link } from 'react-router-dom';
import axios from 'axios';



const ShowUsers = () => {
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

//  const users = useSelector((state) => state.usersReducer.users);
//  console.log("users", users);
const [users, setUsers] = useState([]);
 
 const [rows, setRows] = useState([]);
 const [searched, setSearched] = useState("");

 useEffect(() => {
  axios.get('http://localhost:3008/userDetails')
  .then((response) => {
    const data = response.data;
    setRows([...rows, ...data]);
    setUsers([...users,...data])
})
  .catch(function (error) {
    console.log(error);
  });
}, []); 

  const requestSearch = (searchVal) => {
    let filteredRows = users.filter((user) => {
      // return user.email.toLowerCase() == searchVal.toLowerCase()})
          return user.email.toLowerCase().includes(searchVal.toLowerCase())})
    setRows(filteredRows);
    console.log('filteredRows',filteredRows);
  };
  console.log('rows',rows);

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  
  return (
    <div>
      <h2>List of Users</h2>
      {/* <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users && users.map((user)=>{
                    const {id,name,email,phone} = user;
                    return <tr>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>
                            <button>Info</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table> */}
      <TableContainer component={Paper}>
      <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              {/* <StyledTableCell align="right">Created At</StyledTableCell> */}
              <StyledTableCell align="right">More</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((user) => (
                <StyledTableRow key={user.name}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.phone}</StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  {/* <StyledTableCell align="right">{moment(user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</StyledTableCell>  */}
                  <StyledTableCell align="right">
                    <Button variant="outlined" component={Link}  to={`/user/${user.id}`}>
                      Info
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShowUsers;
