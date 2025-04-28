const backendDomain = "http://localhost:8080/api";

const summaryApi = {
  //common
  signUP: {
    url: `${backendDomain}/auth/register`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/auth/login`,
    method: "POST",
  },
  logout_user: {
    url: `${backendDomain}/api/user-logout`,
    method: "GET",
  },
  current_user: {
    url: `${backendDomain}/auth/user-details`,
    method: "GET",
  },
  forgotPassword: {
    url: `${backendDomain}/forgotPassword/verifyEmail/`,
    method: "POST",
  },
  verifyOtp: {
    url: `${backendDomain}/forgotPassword/verifyOtp/`,
    method: "POST",
  },
  updatePasswordWithOldPassword: {
    url: `${backendDomain}/auth/password`,
    method: "POST",
  },
  changePassword: {
    url: `${backendDomain}/forgotPassword/changePassword/`,
    method: "POST",
  },
  refreshToken: {
    url: `${backendDomain}/auth/refresh-token`,
    method: "POST",
  },

  uploadImage: {
    url: `${backendDomain}/image/upload`,
    method: "POST",
  },

  uploadDocument: {
    url: `${backendDomain}/document/upload`,
    method: "POST",
  },

  getDetailsById: {
    url: `${backendDomain}/details/by-id`,
    method: "GET",
  },

  //course
  allCategory: {
    url: `${backendDomain}/category/all`,
    method: "GET",
  },
  addCategory: {
    url: `${backendDomain}/category`,
    method: "POST",
  },

  allCourse: {
    url: `${backendDomain}/course/all`,
    method: "GET",
  },

  getCourseById: {
    url: `${backendDomain}/course/courseId`,
    method: "GET",
  },

  addCourse: {
    url: `${backendDomain}/course/add`,
    method: "POST",
  },
  deleteCourse: {
    url: `${backendDomain}/course/delete/`,
    method: "DELETE",
  },

  searchCourse: {
    url: `${backendDomain}/course/search`,
    method: "GET",
  },

  getCourseByCategory: {
    url: `${backendDomain}/course/category/`,
    method: "GET",
  },

  //Details
  getDetailsByCourse: {
    url: `${backendDomain}/details/by-course`,
    method: "GET",
  },

  getAlLDetails: {
    url: `${backendDomain}/details/all`,
    method: "GET",
  },

  deleteDetails: {
    url: `${backendDomain}/details/delete`,
    method: "DELETE",
  },

  addDetails: {
    url: `${backendDomain}/details/add`,
    method: "POST",
  },

  //content
  getAllContent: {
    url: `${backendDomain}/content/all`,
    method: "GET",
  },

  addContent: {
    url: `${backendDomain}/content/add`,
    method: "POST",
  },

  deleteContent: {
    url: `${backendDomain}/content/delete`,
    method: "DELETE",
  },

  getContentByDetailsId: {
    url: `${backendDomain}/content/by-details`,
    method: "GET",
  },

  getContentById: {
    url: `${backendDomain}/content`,
    method: "GET",
  },

  //user
  getAllUsers: {
    url: `${backendDomain}/user/all`,
    method: "GET",
  },
  processUser: {
    url: `${backendDomain}/user/`,
    method: "PUT",
  },

  updateProfile: {
    url: `${backendDomain}/profile`,
    method: "PUT",
  },

  getUsersStatistic: {
    url: `${backendDomain}/statistic/user`,
    method: "GET",
  },
};

export default summaryApi;
