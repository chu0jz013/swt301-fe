import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Dropzone from "react-dropzone";
import Close from "@mui/icons-material/Close";
import CloudUpload from "@mui/icons-material/CloudUpload";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import {
  chooseRole,
  updateFields,
  open,
} from "../../../../features/userFormSlice";
import { useNavigate } from "react-router-dom";
import { privateAxios } from "../../../../service/axios";
import { getUserPic } from "../../../../features/picSlice";
import picService from "../../../../service/picService";
import { Download } from "@mui/icons-material";
var phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export default function EditUser({ openEdit, setOpenEdit, user }) {
  const [roleList, setRoleList] = React.useState([]);
  console.log(user);
  const fetchRole = async () => {
    const res = await privateAxios.get("role");
    const data = res.data.filter((role) => role.id !== 1);
    setRoleList(data);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue = {
    username: user.username,
    roleId: user.roleId,
    fullName: user.fullName,
    phone: user.phone,
    address: user.address,
    email: user.email,
    gender: user.gender,
    avatar: user.avatar,
    dob: new Date(user.dob),
  };
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/^[A-Za-zÀ-ỹ ]*$/, "Please enter valid name")
      .required(),
    phone: yup
      .string()
      .matches(phoneRegEx, "Phone number is not valid")
      .required(),
    address: yup.string().required(),
    username: yup.string().required(),
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Wrong email format"
      )
      .required("Email is required"),
    avatar: yup
      .array()
      .min(1, "Please select one file")
      .test(
        "fileType",
        "Invalid file type. Only image files (.png, .jpg, .jpeg) are allowed.",
        (files) => {
          if (!files) return false;

          const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

          for (const file of files) {
            if (!allowedTypes.includes(file.type)) {
              return false;
            }
          }

          return true;
        }
      )
      .test(
        "fileSize",
        "File size is too large. Maximum size is 1MB.",
        (files) => {
          if (!files) return true;

          const maxSize = 1024 * 1024; // 2MB

          for (const file of files) {
            if (file.size > maxSize) {
              return false;
            }
          }

          return true;
        }
      ),
    dob: yup
      .date()
      .max(new Date(), "Date of Birth cannot be in the future")
      .required(),
  });
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    let newUser = Object.fromEntries(
      Object.entries(data).filter((entry) => entry[0] !== "avatar")
    );
    const parseDob = newUser.dob.toLocaleDateString();
    newUser = { ...newUser, dob: parseDob, id: user.id };
    const { avatar } = data;
    const formData = new FormData();
    const userDataJson = JSON.stringify(newUser);
    const blob = new Blob([userDataJson], { type: "application/json" });
    formData.append("file", avatar[0]);
    formData.append("userDto", blob);
    // For JSON, we create a new Blob with type 'application/json'
    // console.log([...formData]);
    privateAxios
      .put("user", formData)
      .then((res) => {
        console.log(res);
        alert(res.data.message.toUpperCase());
        dispatch(resetForm());
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
        // dispatch(resetForm());
        // reset(getInitialValue());
      });
  };
  React.useEffect(() => {
    fetchRole();
    (async () => {
      const file = await picService.getPicFile(user.id);
      setValue("avatar", file);
      console.log(file);
    })();
  }, []);
  return (
    <>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User Information</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {/* <TextField
              disabled
              {...register('username')}
              autoFocus
              margin='dense'
              label='User Name'
              type='text'
              fullWidth
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <Controller
              name='roleId'
              control={control}
              render={({ field }) => (
                <Select {...field} disabled>
                  {roleList?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.roleName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            /> */}
            <TextField
              {...register("fullName")}
              margin="dense"
              label="Full Name"
              type="text"
              fullWidth
              error={!!errors.fullName}
              helperText={errors?.fullName?.message}
            />
            <Controller
              name="gender" // Replace with your form field name
              control={control} // Pass the form control from react-hook-form
              render={({ field }) => (
                <>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup {...field} row sx={{ alignItems: "center" }}>
                    <FormControlLabel
                      value={"female"}
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value={"male"}
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </>
              )}
            />
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    {...field}
                    label="Date of Birth"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dob,
                        helperText: errors?.dob?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <TextField
              {...register("address")}
              margin="dense"
              label="Address"
              type="text"
              fullWidth
              error={!!errors.address}
              helperText={errors?.address?.message}
            />
            <TextField
              {...register("phone")}
              margin="dense"
              label="Phone"
              type="text"
              fullWidth
              error={!!errors.phone}
              helperText={errors?.phone?.message}
            />
            <TextField
              {...register("email")}
              margin="dense"
              label="Email"
              type="text"
              fullWidth
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <div>
              <Controller
                control={control}
                name="avatar"
                defaultValue={[]}
                render={({ field: { onBlur, onChange, name, value } }) => (
                  <>
                    <Dropzone onDrop={onChange} multiple={false}>
                      {({ getRootProps, getInputProps }) => (
                        <Paper
                          variant="outlined"
                          {...getRootProps()}
                          sx={{
                            backgroundColor: "#eee",
                            textAlign: "center",
                            cursor: "pointer",
                            color: "#333",
                            padding: "10px",
                            marginTop: "20px",
                            border: !!errors.avatar ? "1px solid red" : "",
                          }}
                        >
                          <CloudUpload
                            sx={{
                              marginTop: "16px",
                              color: "#333",
                              fontSize: "42px",
                            }}
                          />
                          <input
                            {...getInputProps()}
                            name={name}
                            onBlur={onBlur}
                          />
                          <p>Drag 'n' drop files here, or click select files</p>
                        </Paper>
                      )}
                    </Dropzone>
                    <List>
                      {value.map((f, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <InsertDriveFile />
                          </ListItemIcon>
                          <ListItemText primary={f.name} secondary={f.size} />
                          <IconButton
                            onClick={() => {
                              // Create a download link
                              const downloadLink = document.createElement("a");
                              downloadLink.href = URL.createObjectURL(f);
                              downloadLink.download = f.name;
                              downloadLink.click();
                            }}
                          >
                            <Download />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              resetField("avatar", { defaultValue: [] });
                            }}
                          >
                            <Close />
                          </IconButton>
                        </ListItem>
                      ))}
                      {errors.avatar && (
                        <ListItem>
                          <ListItemText
                            sx={{ color: "red" }}
                            primary={errors.avatar.message + "!"}
                          />
                        </ListItem>
                      )}
                    </List>
                  </>
                )}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
