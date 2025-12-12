import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({
      dep_name,
      description,
    });
    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const{id}  = req.params;
    const department = await Department.findById({_id : id});
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
}

// const updateDepartment =async (req,res) =>{
 
//    try {
//      const { id } = req.params;
//       const { dep_name, description } = req.body;
//      const updateDepartment = await Department.findByIdAndUpdate({ _id: id }, {
//       dep_name , description
//      });
//      return res.status(200).json({ success: true, UpdateDep });
//    } catch (error) {
//      return res
//        .status(500)
//        .json({ success: false, error: "edit department server error" });
//    }

// }
const updateDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { dep_name, description },
      { new: true }
    );
    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }
    res.status(200).json({ success: true, department });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// const deleteDepartment = async (req,res) => {
//   try {
//      const { id } = req.params;
//      const deletedep = await Department.findByIdAndDelete({ _id: id }, {
//       dep_name , description
//      });
//      return res.status(200).json({ success: true, deletedep });
//    } catch (error) {
//      return res
//        .status(500)
//        .json({ success: false, error: " delete department server error" });
//    }
// }

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedep = await Department.findByIdAndDelete(id);
    if (!deletedep) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }
    return res.status(200).json({ success: true, deletedep });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
