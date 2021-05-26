const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee.controller");
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/users')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload =  multer({storage : storage});
router.get("/get-all-employee", employeeController.getAllEmployee);
router.post("/add-employee",upload.single("avatar") ,employeeController.addEmployee);
router.get("/get-employeeid/:employeeID", employeeController.getEmployeeID);
router.put("/update-employee/:employeeID", upload.single("avatar") , employeeController.updateEmployee);
router.delete("/delete-employee/:employeeID", employeeController.deleteEmployee);

module.exports = router;