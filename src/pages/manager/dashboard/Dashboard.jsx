import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import { Avatar } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import avatarLong from "../../../assets/image/avatar.png";
import avatarTuan from "../../../assets/image/avatar-1.png";
import { privateAxios } from "../../../service/axios";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
export default function Dashboard() {
  const [news, setNews] = React.useState([]);
  const { picUrl } = useSelector((state) => state.pic);
  const fetchData = async () => {
    const res = await privateAxios.get("news?page=0");
    setNews(res.data.content);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} padding={1}>
        <Grid item xs={8}>
          <div
            style={{
              backgroundColor: "#034EA2",
              padding: "6px",
              borderRadius: "15px",
              marginBottom: "10px",
            }}
          >
            <h4
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff",
                textTransform: "uppercase",
                margin: "0",
              }}
            >
              News
            </h4>
          </div>
          <Item>
            <List>
              {news.map((item) => {
                return (
                  <div key={item.newsId}>
                    <ListItem>
                      <Link to={`../news/detail/${item.newsId}`}>
                        {item.title}
                      </Link>
                    </ListItem>
                    <p style={{ marginLeft: "16px" }}>{item.createdAt}</p>
                  </div>
                );
              })}
            </List>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <div
            style={{
              backgroundColor: "#034EA2",
              padding: "6px",
              borderRadius: "15px",
              marginBottom: "10px",
            }}
          >
            <h4
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff",
                textTransform: "uppercase",
                margin: "0",
              }}
            >
              Personal Information
            </h4>
          </div>
          <Item>
            <Grid container m={0}>
              <Grid item xs={4}>
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: "100%", height: 150 }}
                  variant="square"
                  src={picUrl}
                />
              </Grid>
              <Grid item xs={8} width={"100%"} paddingLeft={1}>
                <Typography m={2}>{user.fullName}</Typography>
                <Typography m={2}>{user.dob}</Typography>
                <Typography m={2}>{user.gender}</Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
