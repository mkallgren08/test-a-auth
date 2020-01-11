import axios from "axios";

export default {
  //Gets a test case
  getTestData: function () {
    return axios.get("/api/testdata")
  },
  //Gets a test case
  getUserData: function (id) {
    return axios.get("/api/userdata/"+id)
  },
  // Gets all books
  getExamples: function () {
    return axios.get("/api/examples");
  },
  // Gets the book with the given id
  getExample: function (id) {
    return axios.get("/api/examples/" + id);
  },
  // Deletes the book with the given id
  deleteExample: function (id) {
    return axios.delete("/api/examples/" + id);
  },
  // Saves a book to the database
  saveExample: function (articleData) {
    return axios.post("/api/examples", articleData);
  }
};
