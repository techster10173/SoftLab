import {Navbar} from "./Toolbar.jsx";
import React from "react";
import './projects.css';
import {TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, Table} from '@mui/material';
import data from "./Data.json"
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export class DataSets extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <TableContainer component={Paper} sx={{
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 5,
                    width: "auto",
                    marginBottom: 5,
                    boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
                }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="middle">Name</TableCell>
                      <TableCell align="middle">Description</TableCell>
                      <TableCell align="middle">Memory</TableCell>
                      <TableCell align="middle" sx={{textAlign: "center"}}>Download</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => {
                      return (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="middle">{row.name}</TableCell>
                          <TableCell align="middle">{row.description}</TableCell>
                          <TableCell align="middle">{row.memory}</TableCell>
                          <TableCell align="middle" sx={{textAlign: "center"}}>{<a href= {row.download} download><FileDownloadOutlinedIcon/></a>}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
            </TableContainer>
          </>
           
        )
    }
}

