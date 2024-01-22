import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Searchbar from "../../../components/Searchbar";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Pagination,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { privateAxios } from "../../../service/axios";
import NewsForm from "./NewsForm";
import { Add, Delete } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;
const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
export default function News() {
  const muiConfirm = useConfirm();
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [reload, setReload] = useState(false);
  const fetchData = async () => {
    const res = await privateAxios.get(
      `news?title=${searchTitle}&page=${currentPage - 1}`
    );
    setNews(res.data.content);
    setTotalPages(res.data.totalPages);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, searchTitle, reload]);
  return (
    <Box p={2}>
      <div
        style={{
          backgroundColor: "#034EA2",
          padding: "6px",
          borderRadius: "15px",
          marginBottom: "10px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
            textTransform: "uppercase",
            margin: "0",
          }}
        >
          News
        </h2>
      </div>
      <Box flex justifyContent={"space-around"}>
        <Search sx={{ display: "inline-block" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={(e) => {
              setSearchTitle(e.target.value);
            }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{
              border: "5px solid orangered",
              borderRadius: "30px",
            }}
          />
        </Search>
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => setOpenAdd(true)}
          sx={{
            float: "right",
            backgroundColor: "#FF4500",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Add a news
        </Button>
      </Box>
      <Grid container p={"8px"} spacing={1}>
        {news.map((item) => {
          return (
            <Grid item xs={6} my={2} key={item.newsId}>
              <Card sx={{ width: "100%", height: "100%" }}>
                <StyledLink to={`detail/${item.newsId}`}>
                  <CardActionArea>
                    <CardContent>
                      <span
                        style={{
                          color: "red",
                          float: "right",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          muiConfirm({
                            title: "Delete News?",
                            content: `Are you sure you want to delete news ID ${item.newsId}`,
                          }).then((res) => {
                            privateAxios
                              .delete(`news/${item.newsId}`)
                              .then((res) => {
                                alert(res.data);
                                setReload(!reload);
                              });
                          });
                        }}
                      >
                        <Delete />
                      </span>
                      <Typography
                        gutterBottom
                        variant="h7"
                        component="div"
                        fontWeight={"bold"}
                        color={"gray"}
                      >
                        {item.createdAt}
                      </Typography>

                      <Divider sx={{ bgcolor: "black" }} />
                      <Typography variant="body2" color="primary" mt={1}>
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </StyledLink>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        color="primary"
        count={totalPages}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value);
        }}
        sx={{
          justifyContent: "center",
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
          "&& .Mui-selected": {
            bgcolor: "orangered",
          },
          "& .MuiPaginationItem-root:hover": {
            bgcolor: "rgba(255,69,0,0.8)",
          },
          "&& .Mui-selected:hover": {
            bgcolor: "rgba(255,69,0,0.8)",
          },
          my: 4,
        }}
      />
      {openAdd && (
        <NewsForm
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          reload={reload}
          setReload={setReload}
        />
      )}
    </Box>
  );
}
