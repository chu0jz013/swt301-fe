import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { privateAxios } from '../../../service/axios';
import BuildingForm from './BuildingForm';
import { useConfirm } from 'material-ui-confirm';

export default function Building() {
  const customConfirm = useConfirm();
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [reload, setReload] = useState(false);
  const fetchData = async () => {
    try {
      const res = await privateAxios.get(`building/admin`);
      console.log(res.config.url);
      console.log(res.data);
      setBuildings(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [reload]);

  return (
    <Box padding={2}>
      <Box>
        <div
          style={{
            backgroundColor: '#034EA2',
            padding: '6px',
            borderRadius: '15px',
            marginBottom: '10px',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#fff',
              textTransform: 'uppercase',
              margin: '0',
            }}
          >
            Building
          </h1>
        </div>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
        <Button
          variant='contained'
          endIcon={<Add />}
          onClick={() => setOpenAdd(true)}
          sx={{
            color: '#FFF',
            backgroundColor: '#FF5000',
            transition: 'background 0.3s, color 0.3s',
            '&:hover': {
              backgroundColor: '#F04C00',
              borderColor: '#FF2000',
            },
          }}
        >
          ADD
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{ backgroundColor: '#FF5800' }}>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>
                ID
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>
                Building Name
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>
                Number of Floor
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>
                Created Date
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>
                Updated Date
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ color: 'white', fontWeight: 'bold' }}
              >
                Settings
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildings.map((b) => (
              <TableRow
                key={b.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {b.id}
                </TableCell>
                <TableCell>{b.buildingName}</TableCell>
                <TableCell>{b.numberFloor}</TableCell>
                <TableCell>{b.createdAt}</TableCell>
                <TableCell>{b.updateAt}</TableCell>
                <TableCell>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setSelectedBuilding(b);
                      setOpenEdit(true);
                    }}
                    variant='contained'
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => {
                      customConfirm({
                        title: 'Delete Building?',
                        content: `Are you sure you want to delete building ID ${b.id}`,
                      }).then(() => {
                        privateAxios.delete(`building/${b.id}`).then((res) => {
                          alert(res.data);
                          setReload(!reload);
                        });
                      });
                    }}
                    variant='contained'
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(openAdd || openEdit) && (
        <BuildingForm
          reload={reload}
          setReload={setReload}
          building={openAdd ? null : selectedBuilding}
          open={openAdd ? openAdd : openEdit}
          setOpen={openAdd ? setOpenAdd : setOpenEdit}
        />
      )}
    </Box>
  );
}
