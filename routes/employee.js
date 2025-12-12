import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
// import {
   
  // getDepartments,
  // getDepartment,
  // updateDepartment,
  // deleteDepartment,
// } from "../controlers/employeeController.js";

import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
} from "../controlers/employeeController.js";
//import EditDepartment from "../../frontend/src/components/department/EditDepartment";

const router = express.Router();

// const router = express.Router();
router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware,upload.single('image') ,addEmployee);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
// router.delete("/:id", authMiddleware, deleteDepartment);
export default router;
