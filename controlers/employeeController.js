//first i create route (name is employee.js) for post api of add.jsx-> then  make controller employeeController.js -> next import route in server index.js

import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import Department from '../models/Department.js';

// for uplaoding files or images of employee in server , destination, filename

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// for uploading using multer, we name diskstorage = storage
const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // for checking user is register or not
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({
          success: false,
          error: " user already resistered im emp",
          error: error.message,
        });
    }

    //if not resister then hash their password
    const hashPassword = await bcrypt.hash(password, 10);

    // and then resister it
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const saveuser = await newUser.save(); // its will save the user records

    const newEmployee = new Employee({
      userId: saveuser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "employee Created",
        employee: newEmployee,
      });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// for finding emoloyoess data from DB, fatching data in List.jsx
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department"); // populate is used for in DB find all, then populate to userId then populate department,i write this for not return password{password:0}, 1 for return pass findById(id)
    if (!employees) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found"});
    }
    return (
      res.status(200).json({ success: true, employees }), console.log(employees)
    );
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getEmployee = async (req, res) => {
  const{id} = req.params;
  try {
    const employee = await Employee.findById({_id:id})
      .populate("userId", { password: 0 })
      .populate("department"); // populate is used for in DB find all, then populate to userId then populate department,i write this for not return password{password:0}, 1 for return pass
    return (
      res.status(200).json({ success: true, employee }), console.log(employee)
    );
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const updateEmployee = async (req,res) =>{
 try {
  const {id} = req.params;
  const {name,maritalStatus,designation,department,salary} =  req.body;

  const employee = await Employee.findById({_id : id});
  if(!employee){
    return res
      .status(404)
      .json({ success: false, error: "emloyee not found " });
  }

  const user = await User.findById({_id:employee.userId})
  if (!user) {
    return res
      .status(404)
      .json({ success: false, error: "User not found " });
  }

  const updateUser = await User.findByIdAndUpdate({_id : employee.userId},{name})
  const updateEmployee = await Employee.findByIdAndUpdate({_id :id},{maritalStatus,designation,salary,department})

  if(!updateEmployee || !updateUser)
    return res.status(404).json({ success: false, error: "updateEmployee and UpdateUser not found in employeeController " });

  return res.status(200).json({success : true , message :"employee Updated Successfully"})
   
 } catch (error) {
   return res
     .status(500)
     .json({ success: false, error: " Update or edit employees server error" });
 }
}

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee };
