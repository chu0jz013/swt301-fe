import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { privateAxios } from '../../../service/axios';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import RoomTypeForm from './RoomTypeForm';
import { useConfirm } from 'material-ui-confirm';

export default function RoomType() {
  const customConfirm = useConfirm();
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [reload, setReload] = useState(false);
  const fetchData = async () => {
    try {
      const res = await privateAxios.get(`room-type`);
      console.log(res.config.url);
      console.log(res.data);
      setRoomTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [reload]);

  function formatPrice(price) {
    price = (price + '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    price = price + ' VND';

    return price;
  }

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
            Room Type
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
                Name
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>
                Description
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>
                Number Of Beds
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>
                Price/Bed/Semester
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
            {roomTypes.map((rt) => (
              <TableRow
                key={rt.roomTypeId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {rt.roomTypeId}
                </TableCell>
                <TableCell>{rt.roomTypeName}</TableCell>
                <TableCell>{rt.roomTypeDescription}</TableCell>
                <TableCell>{rt.numberOfBeds}</TableCell>
                <TableCell>{formatPrice(rt.price)}</TableCell>
                <TableCell>{new Date(rt.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(rt.updatedAt).toLocaleString()}</TableCell>

                <TableCell>
                  <IconButton
                    color='primary'
                    onClick={() => {
                      setSelectedRoomType(rt);
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
                        title: 'Delete Room Type?',
                        content: `Do you want to delete room type ID ${rt.roomTypeId}`,
                      }).then(() => {
                        privateAxios
                          .delete(`room-type/${rt.roomTypeId}`)
                          .then((res) => {
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
        <RoomTypeForm
          reload={reload}
          setReload={setReload}
          roomType={openAdd ? null : selectedRoomType}
          open={openAdd ? openAdd : openEdit}
          setOpen={openAdd ? setOpenAdd : setOpenEdit}
        />
      )}
    </Box>
  );
}
