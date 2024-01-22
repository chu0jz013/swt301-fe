import { privateAxios } from './axios';

const getUserPic = async (userId) => {
  try {
    const res = await privateAxios(`user/user-pic/${userId}`, {
      responseType: 'blob',
    });
    console.log(res);
    const url = URL.createObjectURL(res.data);
    return url;
  } catch (err) {
    return null;
  }
};
const getPicFile = async (userId) => {
  try {
    const res = await privateAxios(`user/user-pic/${userId}`, {
      responseType: 'blob',
    });
    const file = new File([res.data], `user${userId}.jpg`, {
      lastModified: new Date().getTime(),
      type: res.data.type,
    });
    return [file];
  } catch (error) {
    return [];
  }
};

const getNewsPdfFile = async (newsId) => {
  try {
    const res = await privateAxios(`news/file/${newsId}`, {
      responseType: 'blob',
    });
    console.log(res);
    const url = URL.createObjectURL(res.data);
    return url;
  } catch (err) {
    return null;
  }
};
const picService = {
  getUserPic,
  getPicFile,
  getNewsPdfFile,
};
export default picService;
