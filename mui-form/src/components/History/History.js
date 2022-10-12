import * as React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import axios from 'axios';


const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function History() {
  const params = useParams();
  // const users = useSelector((state) => state.usersReducer.users);
  const [users, setUsers] = useState([]);
  useEffect(() => {
  axios.get('http://localhost:3008/userDetails')
  .then((response) => {
    const data = response.data;
    setUsers([...users,...data])
})
  .catch(function (error) {
    console.log(error);
  });
}, []); 
  const userDetails = users.filter((user) => {
    return user.id == params.id;
  });
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {userDetails &&
          userDetails.map((user) => (
            <>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                User History :
              </Typography>
              {/* <Typography variant="h5" component="div">
          Rajesh Gole
        </Typography> */}
              <Typography variant="body1" component="div">
                {/* Created On : 7/10/2022 6:51:34 PM */}
                { user.createdAt ? 
                `Created On : ${user?.createdAt}` : `No History Found`}
              </Typography>
            </>
          ))}
      </CardContent>
    </Card>
  );
}
