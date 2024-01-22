import { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { privateAxios } from "../../../service/axios";
import picService from "../../../service/picService";
export default function NewsDetail() {
  const [file, setFile] = useState(null);
  const [newsDetail, setNewsDetail] = useState(null);
  let { id } = useParams();
  const fetchData = async () => {
    const res = await privateAxios.get(`news/detail/${id}`);
    setNewsDetail(res.data);
  };
  useEffect(() => {
    picService.getNewsPdfFile(id).then((file) => {
      setFile(file);
    });
    fetchData();
  }, []);
  return (
    <Box padding={1}>
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
          News Detail
        </h2>
      </div>
      <Box component={Paper}>
        <DocViewer
          documents={[{ uri: file, fileName: "News" }]}
          pluginRenderers={DocViewerRenderers}
        ></DocViewer>
      </Box>
    </Box>
  );
}
