import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UsersTable = props => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.length > 0 ? props.rows.map(row => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell component='th' scope="row">{row.id}</TableCell>
                            <TableCell component='th' scope="row">{row.name}</TableCell>
                            <TableCell>
                                <Button
                                    sx={{ margin: '0px 10px' }}
                                    onClick={() => props.selectedUser({ id: row.id, name: row.name })}
                                >
                                    Update
                                </Button>
                                <Button
                                    sx={{ margin: '0px 10px' }}
                                    onClick={() => props.deleteUser({ id: row.id })}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell component='th' scope="row">No Data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UsersTable;