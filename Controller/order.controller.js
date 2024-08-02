const Order = require("../Model/Order");
const XLSX = require("xlsx");
const fs = require("fs");

function convertExcelDate(excelDate) {
    if (typeof excelDate !== 'number' || excelDate <= 0) {
        return null; 
    }
  
    return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
}

exports.uploadFile = async (req, res) => {
    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheetNameList = workbook.SheetNames;
        const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

        for (const data of xlData) {
            const orderData = {
                soNo: data['SO. No'],
                customerPO: data['Customer PO'],
                accountId: data['Account ID'],
                accountName: data['Account Name'],
                contactName: data['Contact Name'],
                phone: data['Phone'],
                email: data['Email'],
                stage: data['Stage'],
                status: data['Status'],
                orderDate: convertExcelDate(data['Order Date']),
                submittalsApprovedDate: convertExcelDate(data['Submittals Approved Date']),
                submittalApproved: convertExcelDate(data['Submittal Approved']),
                bomAndPartsUnderProcess: convertExcelDate(data['BOM & Parts under process']),
                mfgUnderProcess: convertExcelDate(data['MFG under process']),
                shipDate: convertExcelDate(data['Ship Date'])
            };

            await Order.updateOne(
                { soNo: orderData.soNo },
                { $set: orderData },
                { upsert: true }
            );
        }

        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: "File uploaded and data saved successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderBySoNo = async (req, res) => {
    try {
        const soNo = req.params.soNo;

        const order = await Order.findOne({ soNo: soNo });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
